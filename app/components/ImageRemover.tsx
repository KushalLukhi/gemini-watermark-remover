'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { WatermarkEngine } from '../lib/watermarkEngine';
import { detectWatermarkCandidate } from '../lib/autoDetect';
import { getAdaptiveImagePreset, resolveBox, getRoi, buildAlpha, removeWatermark, cleanFrame } from '../lib/alphaBlend';

interface Sliders {
  gain: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

const DEFAULT_SLIDERS: Sliders = { gain: 0.6, scale: 1.01, offsetX: -128, offsetY: -128 };

export default function ImageRemover() {
  const [engine, setEngine] = useState<WatermarkEngine | null>(null);
  const [sliders, setSliders] = useState<Sliders>(DEFAULT_SLIDERS);
  const [hasFile, setHasFile] = useState(false);
  const [detectBadge, setDetectBadge] = useState<string>('');
  const [dragging, setDragging] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fileRef = useRef<HTMLImageElement | null>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const zoomOrigRef = useRef<HTMLCanvasElement>(null);
  const zoomCleanRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalImageDataRef = useRef<ImageData | null>(null);
  const engineReadyRef = useRef(false);

  // Lazy-init engine on first file drop to keep SSR fast
  async function getEngine(): Promise<WatermarkEngine> {
    if (engine) return engine;
    const eng = await WatermarkEngine.create();
    setEngine(eng);
    return eng;
  }

  const drawPreviews = useCallback(
    (img: HTMLImageElement, opts: Sliders, eng: WatermarkEngine) => {
      const main = mainCanvasRef.current;
      const zoomOrig = zoomOrigRef.current;
      const zoomClean = zoomCleanRef.current;
      if (!main || !zoomOrig || !zoomClean) return;

      const W = img.naturalWidth;
      const H = img.naturalHeight;

      // Set canvas sizes
      const MAX_DISPLAY = 600;
      const scale = Math.min(1, MAX_DISPLAY / Math.max(W, H));
      main.width = Math.round(W * scale);
      main.height = Math.round(H * scale);

      const ctx = main.getContext('2d', { willReadFrequently: true })!;
      ctx.drawImage(img, 0, 0, main.width, main.height);

      const imageData = ctx.getImageData(0, 0, main.width, main.height);
      const base = eng.getWatermarkInfo(main.width, main.height);

      const wm = resolveBox(base, main.width, main.height, {
        sizeScale: opts.scale,
        offsetX: opts.offsetX * scale,
        offsetY: opts.offsetY * scale,
      });
      const roi = getRoi(main.width, main.height, wm);
      const alpha = buildAlpha(eng.bg96, roi, wm, opts.gain);
      removeWatermark(imageData, alpha, { x: roi.x, y: roi.y, width: roi.width, height: roi.height });
      ctx.putImageData(imageData, 0, 0);

      // Draw zoom boxes centered on watermark
      const ZOOM_SIZE = 200;
      const ZOOM_FACTOR = 4;
      const cx2 = wm.x + wm.size / 2;
      const cy2 = wm.y + wm.size / 2;
      const srcSide = ZOOM_SIZE / ZOOM_FACTOR;
      const sx = Math.max(0, cx2 - srcSide / 2);
      const sy = Math.max(0, cy2 - srcSide / 2);

      // Original zoom
      const origCtx = zoomOrig.getContext('2d')!;
      zoomOrig.width = ZOOM_SIZE;
      zoomOrig.height = ZOOM_SIZE;
      origCtx.clearRect(0, 0, ZOOM_SIZE, ZOOM_SIZE);
      origCtx.imageSmoothingEnabled = false;
      origCtx.drawImage(img,
        sx / scale, sy / scale, srcSide / scale, srcSide / scale,
        0, 0, ZOOM_SIZE, ZOOM_SIZE
      );

      // Cleaned zoom
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
  const [imageDims, setImageDims] = useState<{ width: number; height: number }>({ width: 1536, height: 1536 });

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;

    const eng = await getEngine();
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
      fileRef.current = img;
      setImageDims({ width: img.naturalWidth, height: img.naturalHeight });
      setHasFile(true);

      const W = img.naturalWidth;
      const H = img.naturalHeight;
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = W;
      tmpCanvas.height = H;
      const tmpCtx = tmpCanvas.getContext('2d', { willReadFrequently: true })!;
      tmpCtx.drawImage(img, 0, 0, W, H);
      const imageData = tmpCtx.getImageData(0, 0, W, H);

      const detection = detectWatermarkCandidate(imageData, W, H, eng.bg96);
      const preset = getAdaptiveImagePreset(detection.presetKey, W, H);
      const newSliders: Sliders = {
        gain: preset.gain,
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

      drawPreviews(img, newSliders, eng);
    };
    img.src = objectUrl;
  }

  // Redraw when sliders change
  useEffect(() => {
    if (fileRef.current && engine && hasFile) {
      drawPreviews(fileRef.current, sliders, engine);
    }
  }, [sliders, engine, hasFile, drawPreviews]);

  function updateSlider(key: keyof Sliders, value: number) {
    setSliders((s) => ({ ...s, [key]: value }));
  }

  async function handleExport() {
    if (!fileRef.current) return;
    setExporting(true);
    try {
      const eng = await getEngine();
      const img = fileRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const base = eng.getWatermarkInfo(canvas.width, canvas.height);
      const wm = resolveBox(base, canvas.width, canvas.height, {
        sizeScale: sliders.scale,
        offsetX: sliders.offsetX,
        offsetY: sliders.offsetY,
      });
      const roi = getRoi(canvas.width, canvas.height, wm);
      const alpha = buildAlpha(eng.bg96, roi, wm, sliders.gain);
      removeWatermark(imageData, alpha, { x: roi.x, y: roi.y, width: roi.width, height: roi.height });
      ctx.putImageData(imageData, 0, 0);

      const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), 'image/png'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gemini-cleaned.png';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }

  return (
    <section id="panel-image" className="card">
      {/* Dropzone */}
      {!hasFile && (
        <div
          id="img-dropzone"
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
          <div className="dropzone-icon"><Icon icon="ph:upload-simple-bold" /></div>
          <p className="dropzone-title">Upload or drag your Gemini Image</p>
          <p className="dropzone-sub">Supports PNG, JPG, WebP</p>
          <input
            ref={fileInputRef}
            id="img-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
          />
        </div>
      )}

      {/* Tuner */}
      {hasFile && (
        <div id="img-tuner-container" className="tuner-container">
          {detectBadge && (
            <div id="img-detect-badge" className="detect-badge">{detectBadge}</div>
          )}

          <div className="tuner-preview-row">
            {/* Main Canvas */}
            <div className="tuner-canvas-box main-box">
              <span className="canvas-title">
                <Icon icon="ph:frame-corners" width={14} /> Preview (Full Frame)
              </span>
              <div className="canvas-wrapper">
                <canvas ref={mainCanvasRef} id="img-main-canvas" />
              </div>
            </div>

            {/* Zoom Pair */}
            <div className="tuner-canvas-box zoom-box">
              <div className="zoom-card">
                <span className="canvas-title text-blue-600">
                  <Icon icon="ph:magnifying-glass-plus" width={14} /> Zoomed Original
                </span>
                <div className="canvas-wrapper">
                  <canvas ref={zoomOrigRef} id="img-zoom-canvas" width={160} height={160} />
                </div>
              </div>
              <div className="zoom-card">
                <span className="canvas-title text-green-600">
                  <Icon icon="ph:check-circle" width={14} /> Zoomed Cleaned
                </span>
                <div className="canvas-wrapper">
                  <canvas ref={zoomCleanRef} id="img-zoom-cleaned-canvas" width={160} height={160} />
                </div>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="tuner-sliders mt-4">
            {[
              { label: 'Strength (Gain)', key: 'gain' as const, min: 0.1, max: 2.0, step: 0.05, fmt: (v: number) => `${v.toFixed(2)}x` },
              { label: 'Size Scale', key: 'scale' as const, min: 0.5, max: 2.5, step: 0.01, fmt: (v: number) => `${v.toFixed(2)}x` },
              { label: 'Position X', key: 'offsetX' as const, min: -Math.round(imageDims.width * 0.45), max: Math.round(imageDims.width * 0.2), step: 1, fmt: (v: number) => `${v}px` },
              { label: 'Position Y', key: 'offsetY' as const, min: -Math.round(imageDims.height * 0.45), max: Math.round(imageDims.height * 0.2), step: 1, fmt: (v: number) => `${v}px` },
            ].map(({ label, key, min, max, step, fmt }) => (
              <div key={key} className="slider-group">
                <div className="tuner-slider-label">
                  <span>{label}</span>
                  <span>{fmt(sliders[key])}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={sliders[key]}
                  onChange={(e) => updateSlider(key, parseFloat(e.target.value))}
                />
              </div>
            ))}
          </div>

          <div className="tuner-actions">
            <button
              id="btn-img-reset-sliders"
              className="btn btn-secondary text-xs"
              onClick={() => setSliders(detectedRef.current)}
            >
              <Icon icon="ph:arrow-counter-clockwise" /> Reset Sliders
            </button>
            <button
              id="btn-img-export"
              className="btn btn-primary"
              onClick={handleExport}
              disabled={exporting}
            >
              <Icon icon="ph:eraser" />
              {exporting ? 'Processing…' : 'Remove & Export Image'}
            </button>
          </div>

          {/* Upload another */}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              className="btn btn-secondary text-xs"
              onClick={() => {
                setHasFile(false);
                setDetectBadge('');
                fileRef.current = null;
              }}
            >
              <Icon icon="ph:upload-simple" /> Upload Another Image
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
