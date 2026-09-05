import { WatermarkEngine } from './watermarkEngine';
import { getWatermarkInfo, getRoi, resolveBox, buildAlpha, cleanFrame, ResolveOptions } from './alphaBlend';
import { VIDEO_DEFAULTS } from './constants';

export class VideoWatermarkEngine {
  engine: WatermarkEngine;
  private _mb: unknown = null;

  constructor(engine: WatermarkEngine) {
    this.engine = engine;
  }

  static async create(): Promise<VideoWatermarkEngine> {
    const engine = await WatermarkEngine.create();
    return new VideoWatermarkEngine(engine);
  }

  static isSupported(): boolean {
    return (
      typeof VideoEncoder !== 'undefined' && typeof VideoDecoder !== 'undefined'
    );
  }

  private async _lib() {
    if (!this._mb) {
      const cdnUrl = 'https://cdn.jsdelivr.net/npm/mediabunny@1.52.3/+esm';
      // @ts-ignore
      this._mb = await import(/* webpackIgnore: true */ `${cdnUrl}`);
    }
    return this._mb as Record<string, unknown>;
  }

  get sparkleImage(): HTMLImageElement {
    return this.engine.bg96;
  }

  getVeoWatermark(width: number, height: number) {
    const base = Math.min(width, height);
    const size = Math.max(24, Math.min(Math.round(base / 15), base));
    const margin = Math.round(base / 10);
    return {
      size,
      x: Math.max(0, width - margin - size),
      y: Math.max(0, height - margin - size),
      width: size,
      height: size,
    };
  }

  previewClean(
    fullImageData: ImageData,
    width: number,
    height: number,
    opts: ResolveOptions & { gain?: number; edgeRefinement?: number } = {}
  ) {
    const base = this.getVeoWatermark(width, height);
    return cleanFrame(this.engine.bg96, fullImageData, width, height, base, {
      ...opts,
      gain: opts.gain ?? VIDEO_DEFAULTS.gain,
    });
  }

  async process(
    file: File,
    opts: ResolveOptions & {
      gain?: number;
      mode?: string;
      edgeRefinement?: number;
      onProgress?: (p: { progress: number }) => void;
    } = {}
  ) {
    const onProgress = opts.onProgress || (() => { });
    const gain = opts.gain ?? VIDEO_DEFAULTS.gain;

    const mb = await this._lib();
    const {
      ALL_FORMATS, BlobSource, BufferTarget, CanvasSource,
      EncodedAudioPacketSource, EncodedPacketSink, Input,
      Mp4OutputFormat, Output, QUALITY_HIGH, VideoSampleSink, canEncodeVideo,
    } = mb as Record<string, unknown>;

    if (canEncodeVideo && !await (canEncodeVideo as (c: string) => Promise<boolean>)('avc')) {
      throw new Error('Your browser cannot encode H.264 video locally. Please try Chrome or Edge desktop.');
    }

    const originalUrl = URL.createObjectURL(file);
    const input = new (Input as new (o: object) => Record<string, unknown>)({
      source: new (BlobSource as new (f: File) => unknown)(file),
      formats: ALL_FORMATS,
    });

    const videoTrack = await (input.getPrimaryVideoTrack as () => Promise<Record<string, unknown>>)();
    if (!videoTrack) {
      (input.dispose as () => void)?.();
      URL.revokeObjectURL(originalUrl);
      throw new Error('No decodable video track found.');
    }

    const width = (videoTrack.displayWidth ?? videoTrack.codedWidth) as number;
    const height = (videoTrack.displayHeight ?? videoTrack.codedHeight) as number;
    const duration = await (input.computeDuration as () => Promise<number>)().catch(() => 0);

    let frameRate = 30;
    try {
      const stats = await (videoTrack.computePacketStats as (n: number) => Promise<{ averagePacketRate?: number }>)(120);
      if (stats?.averagePacketRate) frameRate = Math.round(stats.averagePacketRate);
    } catch { }

    const base = opts.mode === 'gemini' ? getWatermarkInfo(width, height) : this.getVeoWatermark(width, height);
    const wm = resolveBox(base, width, height, opts);
    const roi = getRoi(width, height, wm);
    const alpha = buildAlpha(this.engine.bg96, roi, wm, gain);
    const region = { x: 0, y: 0, width: roi.width, height: roi.height };

    const canvas = Object.assign(document.createElement('canvas'), { width, height });
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

    const target = new (BufferTarget as new () => unknown)();
    const output = new (Output as new (o: object) => Record<string, unknown>)({
      format: new (Mp4OutputFormat as new () => unknown)(),
      target,
    });
    const videoSource = new (CanvasSource as new (c: HTMLCanvasElement, o: object) => Record<string, unknown>)(canvas, {
      codec: 'avc',
      bitrate: QUALITY_HIGH as number,
      keyFrameInterval: 2,
      sizeChangeBehavior: 'passThrough',
    });
    (output.addVideoTrack as (s: unknown, o: object) => void)(videoSource, { frameRate });

    let audioSource: unknown = null;
    let audioTrack: Record<string, unknown> | null = null;
    let audioDecoderConfig: unknown = null;
    try {
      audioTrack = await (input.getPrimaryAudioTrack as () => Promise<Record<string, unknown> | null>)();
      if (audioTrack) {
        const audioCodec = await (audioTrack.getCodec as () => Promise<string>)();
        audioDecoderConfig = await (audioTrack.getDecoderConfig as () => Promise<unknown>)().catch(() => null);
        if (audioCodec && audioDecoderConfig) {
          audioSource = new (EncodedAudioPacketSource as new (c: string) => unknown)(audioCodec);
          (output.addAudioTrack as (s: unknown) => void)(audioSource);
        }
      }
    } catch {
      audioSource = null;
    }

    await (output.start as () => Promise<void>)();

    const minDim = Math.min(width, height);
    const isAbove720p = minDim > 720;
    const deRingStrength = isAbove720p ? (opts.edgeRefinement ?? 0.85) : 0;
    const { removeWatermark, healUpscaledVideoEdgeSeam } = await import('./alphaBlend');

    const fallbackDur = frameRate > 0 ? 1 / frameRate : 1 / 30;
    const sink = new (VideoSampleSink as new (t: unknown) => Record<string, unknown>)(videoTrack);
    let firstTimestamp: number | null = null;
    let lastTimestamp = -1;

    for await (const sample of (sink.samples as () => AsyncIterable<Record<string, unknown>>)()) {
      if (firstTimestamp === null) firstTimestamp = sample.timestamp as number;
      let timestamp = (sample.timestamp as number) - firstTimestamp;
      if (!(timestamp >= 0)) timestamp = 0;
      if (timestamp <= lastTimestamp) timestamp = lastTimestamp + fallbackDur;
      const dur = Number.isFinite(sample.duration) && (sample.duration as number) > 0 ? sample.duration as number : fallbackDur;
      lastTimestamp = timestamp;

      (sample.draw as (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => void)(ctx, 0, 0, width, height);
      (sample.close as () => void)();

      const px = ctx.getImageData(roi.x, roi.y, roi.width, roi.height);
      removeWatermark(px, alpha, region);
      if (isAbove720p && deRingStrength > 0) {
        healUpscaledVideoEdgeSeam(px, alpha, region, deRingStrength);
      }

      const bmp = await createImageBitmap(px);
      ctx.drawImage(bmp, roi.x, roi.y);
      bmp.close();

      await (videoSource.add as (t: number, d: number) => Promise<void>)(timestamp, dur);
      if (duration) onProgress({ progress: Math.min(0.99, timestamp / duration) });
    }
    (videoSource.close as () => void)();

    if (audioSource && audioTrack) {
      try {
        const offset = firstTimestamp ?? 0;
        const aSink = new (EncodedPacketSink as new (t: unknown) => Record<string, unknown>)(audioTrack);
        let isFirstAudio = true;
        let lastAudioTs = -1;
        for await (const packet of (aSink.packets as () => AsyncIterable<Record<string, unknown>>)()) {
          let newTs = (packet.timestamp as number) - offset;
          if (newTs < 0) continue;
          if (newTs <= lastAudioTs) newTs = lastAudioTs + 1e-6;
          lastAudioTs = newTs;
          let outPacket: unknown = packet;
          if (newTs !== packet.timestamp && typeof packet.clone === 'function') {
            outPacket = (packet.clone as (o: object) => unknown)({ timestamp: newTs });
          }
          await (audioSource as { add: (p: unknown, o?: object) => Promise<void> }).add(
            outPacket,
            isFirstAudio && audioDecoderConfig ? { decoderConfig: audioDecoderConfig } : undefined
          );
          isFirstAudio = false;
        }
      } catch (e) {
        console.warn('Audio passthrough failed.', e);
      } finally {
        ((audioSource as Record<string, unknown>).close as () => void)();
      }
    }

    await (output.finalize as () => Promise<void>)();
    (input.dispose as (() => void) | undefined)?.();

    if (!(target as Record<string, unknown>).buffer) {
      URL.revokeObjectURL(originalUrl);
      throw new Error('Video export produced no output.');
    }

    const blob = new Blob([(target as { buffer: ArrayBuffer }).buffer], { type: 'video/mp4' });
    onProgress({ progress: 1 });

    return {
      blob,
      url: URL.createObjectURL(blob),
      originalUrl,
      ext: 'mp4',
      mime: 'video/mp4',
      width,
      height,
    };
  }
}
