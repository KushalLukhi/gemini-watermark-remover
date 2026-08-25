'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { VideoWatermarkEngine } from '../lib/videoEngine';
import { detectVideoWatermarkCandidate } from '../lib/autoDetect';
import { resolveBox, getRoi, buildAlpha, removeWatermark } from '../lib/alphaBlend';

interface Sliders {
  gain: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

const DEFAULT_SLIDERS: Sliders = { gain: 0.6, scale: 1.01, offsetX: -24, offsetY: -24 };

export default function VideoRemover() {
  const [engine, setEngine] = useState<VideoWatermarkEngine | null>(null);
  const [sliders, setSliders] = useState<Sliders>(DEFAULT_SLIDERS);
  const [hasFile, setHasFile] = useState(false);
  const [detectBadge, setDetectBadge] = useState<string>('');
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [supported, setSupported] = useState(true);

  const fileRef = useRef<File | null>(null);
  const videoElRef = useRef<HTMLVideoElement | null>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const zoomOrigRef = useRef<HTMLCanvasElement>(null);
  const zoomCleanRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSupported(VideoWatermarkEngine.isSupported());
  }, []);

  async function getEngine(): Promise<VideoWatermarkEngine> {
    if (engine) return engine;
    const eng = await VideoWatermarkEngine.create();
    setEngine(eng);
    return eng;
  }

  const drawVideoFrame = useCallback(
    (video: HTMLVideoElement, opts: Sliders, eng: VideoWatermarkEngine) => {
      const main = mainCanvasRef.current;
      const zoomOrig = zoomOrigRef.current;
      const zoomClean = zoomCleanRef.current;
      if (!main || !zoomOrig || !zoomClean || !video.videoWidth) return;

      const W = video.videoWidth;
      const H = video.videoHeight;
      const MAX_DISPLAY = 600;
      const scale = Math.min(1, MAX_DISPLAY / Math.max(W, H));
      main.width = Math.round(W * scale);
      main.height = Math.round(H * scale);

      const ctx = main.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(video, 0, 0, main.width, main.height);

      const imageData = ctx.getImageData(0, 0, main.width, main.height);
      const base = eng.getVeoWatermark(main.width, main.height);
      const wm = resolveBox(base, main.width, main.height, {
        sizeScale: opts.scale,
        offsetX: opts.offsetX * scale,
        offsetY: opts.offsetY * scale,
      });
      const roi = getRoi(main.width, main.height, wm);
      const alpha = buildAlpha(eng.engine.bg96, roi, wm, opts.gain);
      removeWatermark(imageData, alpha, { x: roi.x, y: roi.y, width: roi.width, height: roi.height });
      ctx.putImageData(imageData, 0, 0);

      // Zoom previews
      const ZOOM_SIZE = 200;
      const ZOOM_FACTOR = 4;
      const cx2 = wm.x + wm.size / 2;
      const cy2 = wm.y + wm.size / 2;
      const srcSide = ZOOM_SIZE / ZOOM_FACTOR;
      const sx = Math.max(0, cx2 - srcSide / 2);
      const sy = Math.max(0, cy2 - srcSide / 2);

      const origCtx = zoomOrig.getContext('2d')!;
      zoomOrig.width = ZOOM_SIZE;
      zoomOrig.height = ZOOM_SIZE;
      origCtx.clearRect(0, 0, ZOOM_SIZE, ZOOM_SIZE);
      origCtx.imageSmoothingEnabled = false;
      origCtx.drawImage(video, sx / scale, sy / scale, srcSide / scale, srcSide / scale, 0, 0, ZOOM_SIZE, ZOOM_SIZE);

      const cleanCtx = zoomClean.getContext('2d')!;
      zoomClean.width = ZOOM_SIZE;
      zoomClean.height = ZOOM_SIZE;
      cleanCtx.clearRect(0, 0, ZOOM_SIZE, ZOOM_SIZE);
      cleanCtx.imageSmoothingEnabled = false;
      cleanCtx.drawImage(main, sx, sy, srcSide, srcSide, 0, 0, ZOOM_SIZE, ZOOM_SIZE);
    },
    []
  );

  const detectedRef = useRef<Sliders>(DEFAULT_SLIDERS);
  const [videoDims, setVideoDims] = useState<{ width: number; height: number }>({ width: 720, height: 720 });

  async function handleFile(file: File) {
    if (!file.type.startsWith('video/')) return;
    fileRef.current = file;

    const eng = await getEngine();
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.src = url;
    video.muted = true;
    video.preload = 'metadata';
    videoElRef.current = video;

    video.onloadeddata = async () => {
      video.currentTime = Math.min(0.5, video.duration * 0.1);
    };

    video.onseeked = async () => {
      setHasFile(true);
      setVideoDims({ width: video.videoWidth, height: video.videoHeight });

      // Capture first frame for detection
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = video.videoWidth;
      tmpCanvas.height = video.videoHeight;
      const tmpCtx = tmpCanvas.getContext('2d', { willReadFrequently: true })!;
      tmpCtx.drawImage(video, 0, 0);
      const imageData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);

      const detection = detectVideoWatermarkCandidate(imageData, tmpCanvas.width, tmpCanvas.height, eng.engine.bg96);
      const newSliders: Sliders = {
        gain: detection.gain,
        scale: detection.sizeScale,
        offsetX: detection.offsetX,
        offsetY: detection.offsetY,
      };
      detectedRef.current = newSliders;
      setSliders(newSliders);

      if (detection.matchFound) {
        setDetectBadge(`Auto-Detected: ${detection.name} (${Math.round(detection.score * 100)}% match)`);
      } else {
        setDetectBadge(`Standard Preset Applied (${detection.name})`);
      }

      drawVideoFrame(video, newSliders, eng);
    };
  }

  useEffect(() => {
    if (videoElRef.current && engine && hasFile) {
      drawVideoFrame(videoElRef.current, sliders, engine);
    }
  }, [sliders, engine, hasFile, drawVideoFrame]);

  function updateSlider(key: keyof Sliders, value: number) {
    setSliders((s) => ({ ...s, [key]: value }));
  }

  async function handleExport() {
    if (!fileRef.current || !engine) return;
    setProgress(0);
    try {
      const result = await engine.process(fileRef.current, {
        ...sliders,
        onProgress: ({ progress: p }) => setProgress(Math.round(p * 100)),
      });
      const a = document.createElement('a');
      a.href = result.url;
      a.download = 'gemini-veo-cleaned.mp4';
      a.click();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setProgress(null);
    }
  }

  if (!supported) {
    return (
      <section id="panel-video" className="card">
        <div className="dropzone">
          <div className="dropzone-icon"><Icon icon="ph:warning" /></div>
          <p className="dropzone-title">WebCodecs Not Supported</p>
          <p className="dropzone-sub">Video processing requires Chrome or Edge on desktop. Please use a supported browser.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="panel-video" className="card">
      {!hasFile && (
        <div
          id="video-dropzone"
          className={`dropzone${dragging ? ' drag-over' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
        >
          <div className="dropzone-icon"><Icon icon="ph:video-bold" /></div>
          <p className="dropzone-title">Upload or drag a Gemini Veo 3 video</p>
          <p className="dropzone-sub">Supports MP4, WebM, MOV</p>
          <input
            ref={fileInputRef}
            id="video-input"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />
        </div>
      )}

      {hasFile && (
        <div id="video-tuner-container" className="tuner-container">
          {detectBadge && <div id="video-detect-badge" className="detect-badge">{detectBadge}</div>}

          <div className="tuner-preview-row">
            <div className="tuner-canvas-box main-box">
              <span className="canvas-title"><Icon icon="ph:frame-corners" width={14} /> Preview (Full Frame)</span>
              <div className="canvas-wrapper"><canvas ref={mainCanvasRef} id="video-main-canvas" /></div>
            </div>
            <div className="tuner-canvas-box zoom-box">
              <div className="zoom-card">
                <span className="canvas-title text-blue-600"><Icon icon="ph:magnifying-glass-plus" width={14} /> Zoomed Original</span>
                <div className="canvas-wrapper"><canvas ref={zoomOrigRef} id="video-zoom-canvas" width={200} height={200} /></div>
              </div>
              <div className="zoom-card">
                <span className="canvas-title text-green-600"><Icon icon="ph:check-circle" width={14} /> Zoomed Cleaned</span>
                <div className="canvas-wrapper"><canvas ref={zoomCleanRef} id="video-zoom-cleaned-canvas" width={200} height={200} /></div>
              </div>
            </div>
          </div>

          <div className="tuner-sliders mt-4">
            {[
              { label: 'Strength (Gain)', key: 'gain' as const, min: 0.1, max: 2.0, step: 0.05, fmt: (v: number) => `${v.toFixed(2)}x` },
              { label: 'Size Scale', key: 'scale' as const, min: 0.5, max: 2.5, step: 0.01, fmt: (v: number) => `${v.toFixed(2)}x` },
              { label: 'Position X', key: 'offsetX' as const, min: -Math.round(videoDims.width * 0.45), max: Math.round(videoDims.width * 0.2), step: 1, fmt: (v: number) => `${v}px` },
              { label: 'Position Y', key: 'offsetY' as const, min: -Math.round(videoDims.height * 0.45), max: Math.round(videoDims.height * 0.2), step: 1, fmt: (v: number) => `${v}px` },
            ].map(({ label, key, min, max, step, fmt }) => (
              <div key={key} className="slider-group">
                <div className="tuner-slider-label">
                  <span>{label}</span>
                  <span>{fmt(sliders[key])}</span>
                </div>
                <input
                  type="range" min={min} max={max} step={step} value={sliders[key]}
                  onChange={(e) => updateSlider(key, parseFloat(e.target.value))}
                />
              </div>
            ))}
          </div>

          {progress !== null && (
            <div id="video-status" className="mt-4 text-center">
              <p className="mb-2">Cleaning &amp; Encoding Video...</p>
              <div className="progress-bar-container">
                <div id="video-progress-bar" className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <p id="video-progress-text" className="progress-text">{progress}%</p>
            </div>
          )}

          <div className="tuner-actions">
            <button className="btn btn-secondary text-xs" onClick={() => setSliders(detectedRef.current)}>
              <Icon icon="ph:arrow-counter-clockwise" /> Reset Sliders
            </button>
            <button id="btn-video-export" className="btn btn-primary" onClick={handleExport} disabled={progress !== null}>
              <Icon icon="ph:eraser" />
              {progress !== null ? `Processing ${progress}%…` : 'Remove & Export Video MP4'}
            </button>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button className="btn btn-secondary text-xs" onClick={() => {
              setHasFile(false);
              setDetectBadge('');
              fileRef.current = null;
              videoElRef.current = null;
            }}>
              <Icon icon="ph:upload-simple" /> Upload Another Video
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
