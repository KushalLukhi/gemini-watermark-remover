'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { WatermarkEngine } from '../lib/watermarkEngine';
import { VideoWatermarkEngine } from '../lib/videoEngine';
import { detectWatermarkCandidate, detectVideoWatermarkCandidate } from '../lib/autoDetect';
import { getAdaptiveImagePreset, getWatermarkInfo, cleanFrame } from '../lib/alphaBlend';

interface Sliders {
  gain: number;
  scale: number;
  offsetX: number;
  offsetY: number;
}

interface FrameData {
  width: number;
  height: number;
  imageData: ImageData;
}

const DEFAULT_IMAGE_SLIDERS: Sliders = { gain: 0.6, scale: 1.01, offsetX: -128, offsetY: -128 };
const DEFAULT_VIDEO_SLIDERS: Sliders = { gain: 0.6, scale: 1.01, offsetX: -24, offsetY: -24 };

export default function UnifiedRemover() {
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectBadge, setDetectBadge] = useState<string>('');
  const [sliders, setSliders] = useState<Sliders>(DEFAULT_IMAGE_SLIDERS);
  const [mediaDims, setMediaDims] = useState<{ width: number; height: number }>({ width: 1536, height: 1536 });
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [showSliders, setShowSliders] = useState(false);
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');

  // Engines
  const [imgEngine, setImgEngine] = useState<WatermarkEngine | null>(null);
  const [vidEngine, setVidEngine] = useState<VideoWatermarkEngine | null>(null);

  // Refs
  const previewFrameRef = useRef<FrameData | null>(null);
  const detectedRef = useRef<Sliders>(DEFAULT_IMAGE_SLIDERS);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const zoomOrigRef = useRef<HTMLCanvasElement>(null);
  const zoomCleanRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);

  async function getImgEngine(): Promise<WatermarkEngine> {
    if (imgEngine) return imgEngine;
    const eng = await WatermarkEngine.create();
    setImgEngine(eng);
    return eng;
  }

  async function getVidEngine(): Promise<VideoWatermarkEngine> {
    if (vidEngine) return vidEngine;
    const eng = await VideoWatermarkEngine.create();
    setVidEngine(eng);
    return eng;
  }

  // ── Exact Full-Res Tuner Renderer (from source repo) ──
  const renderTuner = useCallback(
    (currentFrame: FrameData, currentSliders: Sliders, type: 'image' | 'video', bgImg: HTMLImageElement, mode: 'after' | 'before' = viewMode) => {
      const mainCanvas = mainCanvasRef.current;
      const zoomCanvas = zoomOrigRef.current;
      const zoomCleanedCanvas = zoomCleanRef.current;
      if (!mainCanvas || !currentFrame || !bgImg) return;

      const { width, height, imageData } = currentFrame;

      // Full-resolution offscreen canvas
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;

      const copy = new ImageData(new Uint8ClampedArray(imageData.data), width, height);
      const base = type === 'image'
        ? getWatermarkInfo(width, height)
        : {
            size: Math.max(24, Math.min(Math.round(Math.min(width, height) / 15), Math.min(width, height))),
            x: Math.max(0, width - Math.round(Math.min(width, height) / 10) - Math.max(24, Math.min(Math.round(Math.min(width, height) / 15), Math.min(width, height)))),
            y: Math.max(0, height - Math.round(Math.min(width, height) / 10) - Math.max(24, Math.min(Math.round(Math.min(width, height) / 15), Math.min(width, height)))),
            width: Math.max(24, Math.min(Math.round(Math.min(width, height) / 15), Math.min(width, height))),
            height: Math.max(24, Math.min(Math.round(Math.min(width, height) / 15), Math.min(width, height))),
          };

      const { wm, roi } = cleanFrame(bgImg, copy, width, height, base, {
        gain: currentSliders.gain,
        sizeScale: currentSliders.scale,
        offsetX: currentSliders.offsetX,
        offsetY: currentSliders.offsetY,
      });

      const offCtx = offscreen.getContext('2d')!;
      offCtx.putImageData(copy, 0, 0);

      // Main Canvas (scaled full-frame preview)
      const maxW = mainCanvas.parentElement?.clientWidth || 900;
      const scale = Math.min(1, maxW / width);
      mainCanvas.width = Math.round(width * scale);
      mainCanvas.height = Math.round(height * scale);
      mainCanvas.style.width = '100%';
      mainCanvas.style.height = 'auto';
      const mctx = mainCanvas.getContext('2d')!;
      if (mode === 'before' && originalCanvasRef.current) {
        mctx.drawImage(originalCanvasRef.current, 0, 0, mainCanvas.width, mainCanvas.height);
      } else {
        mctx.drawImage(offscreen, 0, 0, mainCanvas.width, mainCanvas.height);
        mctx.strokeStyle = '#6366f1';
        mctx.lineWidth = 2;
        mctx.strokeRect(wm.x * scale, wm.y * scale, wm.width * scale, wm.height * scale);
      }

      // Zoomed Original (directly from full-res source)
      if (zoomCanvas && originalCanvasRef.current) {
        const zctx = zoomCanvas.getContext('2d')!;
        zctx.imageSmoothingEnabled = false;
        zctx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
        zctx.drawImage(
          originalCanvasRef.current,
          roi.x, roi.y, roi.width, roi.height,
          0, 0, zoomCanvas.width, zoomCanvas.height
        );
        const sx = zoomCanvas.width / roi.width;
        const sy = zoomCanvas.height / roi.height;
        zctx.strokeStyle = '#2563eb';
        zctx.lineWidth = 2;
        zctx.strokeRect((wm.x - roi.x) * sx, (wm.y - roi.y) * sy, wm.width * sx, wm.height * sy);
      }

      // Zoomed Cleaned (directly from full-res cleaned offscreen)
      if (zoomCleanedCanvas) {
        const zctx = zoomCleanedCanvas.getContext('2d')!;
        zctx.imageSmoothingEnabled = false;
        zctx.clearRect(0, 0, zoomCleanedCanvas.width, zoomCleanedCanvas.height);
        zctx.drawImage(
          offscreen,
          roi.x, roi.y, roi.width, roi.height,
          0, 0, zoomCleanedCanvas.width, zoomCleanedCanvas.height
        );
        const sx = zoomCleanedCanvas.width / roi.width;
        const sy = zoomCleanedCanvas.height / roi.height;
        zctx.strokeStyle = '#16a34a';
        zctx.lineWidth = 2;
        zctx.strokeRect((wm.x - roi.x) * sx, (wm.y - roi.y) * sy, wm.width * sx, wm.height * sy);
      }
    },
    []
  );

  // ── Sample Image Loader ──
  async function handleLoadSample(e: React.MouseEvent) {
    e.stopPropagation();
    if (isProcessing) return;
    try {
      setIsProcessing(true);
      const res = await fetch('/assets/before_pup.jpg');
      const blob = await res.blob();
      const sampleFile = new File([blob], 'sample_gemini_dog.jpg', { type: 'image/jpeg' });
      await handleFileUpload(sampleFile);
    } catch (err) {
      setIsProcessing(false);
      console.error('Failed to load sample image:', err);
    }
  }

  // ── Unified Auto-Detect Upload Handler ──
  async function handleFileUpload(uploadedFile: File) {
    if (isProcessing) return;
    setIsProcessing(true);
    setFile(uploadedFile);

    const isVideo = uploadedFile.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|avi)$/i.test(uploadedFile.name);
    const type = isVideo ? 'video' : 'image';
    setFileType(type);

    try {
      if (type === 'image') {
        const eng = await getImgEngine();
        const url = URL.createObjectURL(uploadedFile);
        const img = new Image();
        img.onload = () => {
          const W = img.naturalWidth || img.width;
          const H = img.naturalHeight || img.height;
          setMediaDims({ width: W, height: H });

          const origCanvas = document.createElement('canvas');
          origCanvas.width = W;
          origCanvas.height = H;
          const octx = origCanvas.getContext('2d', { willReadFrequently: true })!;
          octx.drawImage(img, 0, 0, W, H);
          const imageData = octx.getImageData(0, 0, W, H);
          originalCanvasRef.current = origCanvas;

          const frame: FrameData = { width: W, height: H, imageData };
          previewFrameRef.current = frame;

          const preset = getAdaptiveImagePreset('new', W, H);

          const newSliders: Sliders = {
            gain: 0.6,
            scale: preset.sizeScale,
            offsetX: preset.offsetX,
            offsetY: preset.offsetY,
          };
          detectedRef.current = newSliders;
          setSliders(newSliders);

          const is2x = Math.min(W, H) >= 1800 || Math.max(W, H) >= 2400;
          const aspectName = W === H ? '1:1 Square' : W > H ? `${Math.round((W / H) * 100) / 100}:1 Landscape` : `1:${Math.round((H / W) * 100) / 100} Portrait`;
          setDetectBadge(`Gemini Imagen 3 Calibrated (${aspectName}${is2x ? ' • 2x High-Res' : ''} • ${W}×${H})`);

          setIsProcessing(false);
          renderTuner(frame, newSliders, 'image', eng.bg96);
          URL.revokeObjectURL(url);
        };
        img.onerror = () => {
          setIsProcessing(false);
          URL.revokeObjectURL(url);
          alert('Could not load image file.');
        };
        img.src = url;
      } else {
        const eng = await getVidEngine();
        const url = URL.createObjectURL(uploadedFile);
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.src = url;

        video.onloadeddata = () => {
          video.currentTime = Math.min(0.5, (video.duration || 1) * 0.1);
        };

        video.onseeked = () => {
          const W = video.videoWidth;
          const H = video.videoHeight;
          setMediaDims({ width: W, height: H });

          const origCanvas = document.createElement('canvas');
          origCanvas.width = W;
          origCanvas.height = H;
          const octx = origCanvas.getContext('2d', { willReadFrequently: true })!;
          octx.drawImage(video, 0, 0, W, H);
          const imageData = octx.getImageData(0, 0, W, H);
          originalCanvasRef.current = origCanvas;

          const frame: FrameData = { width: W, height: H, imageData };
          previewFrameRef.current = frame;

          const detection = detectVideoWatermarkCandidate(imageData, W, H, eng.engine.bg96);

          const newSliders: Sliders = {
            gain: 0.6,
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

          setIsProcessing(false);
          renderTuner(frame, newSliders, 'video', eng.engine.bg96);
          URL.revokeObjectURL(url);
        };

        video.onerror = () => {
          setIsProcessing(false);
          URL.revokeObjectURL(url);
          alert('Could not read video file.');
        };
      }
    } catch (e) {
      setIsProcessing(false);
      console.error(e);
      alert('Failed to process file.');
    }
  }

  // Live preview update on slider change (RAF throttled for 60/120 FPS smoothness)
  useEffect(() => {
    if (!previewFrameRef.current || !fileType) return;
    const bgImg = fileType === 'image' ? imgEngine?.bg96 : vidEngine?.engine.bg96;
    if (!bgImg) return;

    const animId = requestAnimationFrame(() => {
      if (previewFrameRef.current) {
        renderTuner(previewFrameRef.current, sliders, fileType, bgImg);
      }
    });

    return () => cancelAnimationFrame(animId);
  }, [sliders, fileType, imgEngine, vidEngine, renderTuner]);

  function updateSlider(key: keyof Sliders, value: number) {
    setSliders((s) => ({ ...s, [key]: value }));
  }

  async function handleExport() {
    if (!fileType || !file) return;

    if (fileType === 'image') {
      if (!previewFrameRef.current) return;
      setExporting(true);
      try {
        const eng = await getImgEngine();
        const { width, height, imageData } = previewFrameRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const copy = new ImageData(new Uint8ClampedArray(imageData.data), width, height);
        const base = getWatermarkInfo(width, height);
        cleanFrame(eng.bg96, copy, width, height, base, {
          gain: sliders.gain,
          sizeScale: sliders.scale,
          offsetX: sliders.offsetX,
          offsetY: sliders.offsetY,
        });

        const ctx = canvas.getContext('2d')!;
        ctx.putImageData(copy, 0, 0);

        const blob = await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), 'image/png'));
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `clean_${file.name.replace(/\.[^/.]+$/, '')}.png`;
        a.click();
        URL.revokeObjectURL(url);
      } finally {
        setExporting(false);
      }
    } else {
      if (!vidEngine) return;
      setProgress(0);
      try {
        const result = await vidEngine.process(file, {
          ...sliders,
          onProgress: ({ progress: p }) => setProgress(Math.round(p * 100)),
        });
        const a = document.createElement('a');
        a.href = result.url;
        a.download = `clean_${file.name}`;
        a.click();
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Export failed');
      } finally {
        setProgress(null);
      }
    }
  }

  // Global paste handler (Ctrl+V directly on page to replace/upload image)
  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      if (isProcessing) return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const pastedFile = items[i].getAsFile();
          if (pastedFile) {
            handleFileUpload(pastedFile);
            break;
          }
        }
      }
    }
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isProcessing]);

  function handleReset() {
    fileInputRef.current?.click();
  }

  return (
    <section
      id="tool-dropzone"
      className={`card relative${dragging ? ' drag-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        if (!isProcessing) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (isProcessing) return;
        const dropped = e.dataTransfer.files[0];
        if (dropped) handleFileUpload(dropped);
      }}
    >
      {/* Hidden Global File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleFileUpload(e.target.files[0]);
            // Reset input so re-selecting same filename works
            e.target.value = '';
          }
        }}
      />

      {/* Floating Drag-over Overlay when image is already loaded */}
      {fileType && dragging && (
        <div className="tuner-drag-overlay">
          <Icon icon="ph:upload-simple-bold" width={48} className="text-indigo-600 animate-bounce" />
          <p className="font-bold text-slate-800 text-lg">Drop to Replace Current Media</p>
          <p className="text-sm text-slate-500">Supports PNG, JPG, WebP, MP4, WebM</p>
        </div>
      )}

      {/* Unified Single Dropzone (Empty State) */}
      {!fileType && (
        <div
          className={`dropzone${dragging ? ' drag-over' : ''}${isProcessing ? ' loading' : ''}`}
          onClick={() => { if (!isProcessing) fileInputRef.current?.click(); }}
        >
          {isProcessing ? (
            <div className="dropzone-loader">
              <div className="dropzone-spinner" />
              <p className="dropzone-title text-indigo-600">Analyzing Media &amp; Watermark...</p>
              <p className="dropzone-sub">Please wait a moment...</p>
            </div>
          ) : (
            <>
              <div className="dropzone-icon">
                <Icon icon="ph:upload-simple-bold" width={32} />
              </div>
              <p className="dropzone-title">Upload or drag your Gemini Image or Veo Video</p>
              <p className="dropzone-sub">Free Gemini watermark remover &amp; Gemini video watermark remover • Supports PNG, JPG, WebP, MP4, WebM, MOV • Paste with Ctrl+V</p>

              {/* Sample Demo Image Button */}
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm transition-all hover:border-indigo-400 hover:bg-indigo-100 hover:shadow-md hover:scale-[1.02] active:scale-95"
                >
                  <Icon icon="ph:image-square-bold" width={16} className="text-indigo-600" />
                  <span>Try Sample Image (Golden Retriever)</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Tuner Dashboard (Auto-shows for Image or Video) */}
      {fileType && (
        <div className="tuner-container">
          {detectBadge && <div className="detect-badge">{detectBadge}</div>}

          {/* Side-by-side: main preview + zoom pair column */}
          <div className="tuner-preview-row">
            {/* Main Canvas */}
            <div className="tuner-canvas-box main-box">
              <div className="flex items-center justify-between gap-2 mb-2 w-full">
                <span className="canvas-title">
                  <Icon icon="ph:frame-corners" width={14} /> Preview (Full Frame)
                </span>

                {/* Before / After Toggle for Image */}
                {fileType === 'image' && (
                  <div className="inline-flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200 shadow-inner">
                    <button
                      type="button"
                      className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                        viewMode === 'after'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewMode('after');
                        if (previewFrameRef.current && imgEngine) {
                          renderTuner(previewFrameRef.current, sliders, 'image', imgEngine.bg96, 'after');
                        }
                      }}
                    >
                      <Icon icon="ph:sparkle-fill" width={12} /> Cleaned (After)
                    </button>
                    <button
                      type="button"
                      className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                        viewMode === 'before'
                          ? 'bg-slate-800 text-white shadow'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewMode('before');
                        if (previewFrameRef.current && imgEngine) {
                          renderTuner(previewFrameRef.current, sliders, 'image', imgEngine.bg96, 'before');
                        }
                      }}
                    >
                      <Icon icon="ph:image" width={12} /> Original (Before)
                    </button>
                  </div>
                )}
              </div>
              <div
                className="main-canvas-wrapper"
                title="Click or drop a new image to replace"
                onClick={() => fileInputRef.current?.click()}
                style={{ cursor: 'pointer' }}
              >
                <canvas ref={mainCanvasRef} />
              </div>
            </div>

            {/* Zoom Pair stacked on right */}
            <div className="tuner-zoom-col">
              <div className="zoom-card">
                <span className="canvas-title text-blue-600">
                  <Icon icon="ph:magnifying-glass-plus" width={14} /> Zoomed Original
                </span>
                <div className="canvas-wrapper">
                  <canvas ref={zoomOrigRef} width={160} height={160} />
                </div>
              </div>
              <div className="zoom-card">
                <span className="canvas-title text-green-600">
                  <Icon icon="ph:check-circle" width={14} /> Zoomed Cleaned
                </span>
                <div className="canvas-wrapper">
                  <canvas ref={zoomCleanRef} width={160} height={160} />
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Adjust Sliders */}
          <div className="adjust-toggle-row">
            <button
              className="btn btn-secondary adjust-toggle-btn"
              onClick={() => setShowSliders((s) => !s)}
            >
              <Icon icon={showSliders ? 'ph:caret-up-bold' : 'ph:sliders-horizontal-bold'} width={16} />
              {showSliders ? 'Hide Adjustments' : 'Adjust'}
            </button>
            <button
              className="btn btn-secondary text-xs"
              onClick={() => setSliders(detectedRef.current)}
            >
              <Icon icon="ph:arrow-counter-clockwise" width={14} /> Reset
            </button>
          </div>

          {showSliders && (
            <div className="tuner-sliders">
              {[
                { label: 'Strength (Gain)', key: 'gain' as const, min: 0.1, max: 2.0, step: 0.05, fmt: (v: number) => `${v.toFixed(2)}x` },
                { label: 'Size Scale', key: 'scale' as const, min: 0.1, max: 3.0, step: 0.01, fmt: (v: number) => `${v.toFixed(2)}x` },
                { label: 'Position X', key: 'offsetX' as const, min: -Math.round(mediaDims.width * 0.45), max: Math.round(mediaDims.width * 0.2), step: 1, fmt: (v: number) => `${v}px` },
                { label: 'Position Y', key: 'offsetY' as const, min: -Math.round(mediaDims.height * 0.45), max: Math.round(mediaDims.height * 0.2), step: 1, fmt: (v: number) => `${v}px` },
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
          )}

          {/* Progress Bar (For Video) */}
          {fileType === 'video' && progress !== null && (
            <div className="mt-4 text-center">
              <p className="mb-2 text-sm font-medium text-slate-700">Cleaning &amp; Encoding Video...</p>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="progress-text">{progress}%</p>
            </div>
          )}

          {/* Actions */}
          <div className="tuner-actions">
            <button className="btn btn-secondary text-xs" onClick={() => fileInputRef.current?.click()}>
              <Icon icon="ph:upload-simple" width={14} /> Upload Another
            </button>
            <button
              className="btn btn-primary"
              onClick={handleExport}
              disabled={exporting || progress !== null}
            >
              <Icon icon="ph:eraser" />
              {exporting
                ? 'Processing…'
                : progress !== null
                ? `Processing ${progress}%…`
                : fileType === 'image'
                ? 'Download Cleaned PNG'
                : 'Download Cleaned Video MP4'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
