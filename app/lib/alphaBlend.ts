import { ALPHA_THRESHOLD, MAX_ALPHA, LOGO_VALUE } from './constants';

// ── Types ──
export interface WatermarkBox {
  size: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ResolveOptions {
  sizeScale?: number;
  offsetX?: number;
  offsetY?: number;
  gain?: number;
}

// ── Alpha Map Calculation ──
export function calculateAlphaMap(imageData: ImageData): Float32Array {
  const { width, height, data } = imageData;
  const alphaMap = new Float32Array(width * height);
  for (let i = 0; i < alphaMap.length; i++) {
    const idx = i * 4;
    alphaMap[i] = Math.max(data[idx], data[idx + 1], data[idx + 2]) / 255.0;
  }
  return alphaMap;
}

// ── High-Performance Watermark Removal ──
export function removeWatermark(
  imageData: ImageData,
  alphaMap: Float32Array,
  position: { x: number; y: number; width: number; height: number },
  options: { alphaGain?: number } = {}
): void {
  const { x, y, width, height } = position;
  const gain =
    Number.isFinite(options.alphaGain) && options.alphaGain! > 0 ? options.alphaGain! : 1;

  const data = imageData.data;
  const imgWidth = imageData.width;

  for (let row = 0; row < height; row++) {
    let imgIdx = ((y + row) * imgWidth + x) * 4;
    let alphaIdx = row * width;

    for (let col = 0; col < width; col++, imgIdx += 4, alphaIdx++) {
      let alpha = alphaMap[alphaIdx] * gain;
      if (alpha < ALPHA_THRESHOLD) continue;
      if (alpha > MAX_ALPHA) alpha = MAX_ALPHA;

      // Smooth cubic hermite transition on the boundary (alpha < 0.20)
      // to eliminate dark boundary lines caused by template edge over-subtraction
      let effectiveAlpha = alpha;
      if (alpha < 0.20) {
        const t = alpha / 0.20;
        // Cubic smoothstep curve: 3t^2 - 2t^3
        const smooth = t * t * (3 - 2 * t);
        effectiveAlpha = alpha * smooth;
      }

      const inv = 1.0 / (1.0 - effectiveAlpha);
      const sub = effectiveAlpha * LOGO_VALUE;

      const r = (data[imgIdx] - sub) * inv;
      const g = (data[imgIdx + 1] - sub) * inv;
      const b = (data[imgIdx + 2] - sub) * inv;

      data[imgIdx] = r < 0 ? 0 : r > 255 ? 255 : (r + 0.5) | 0;
      data[imgIdx + 1] = g < 0 ? 0 : g > 255 ? 255 : (g + 0.5) | 0;
      data[imgIdx + 2] = b < 0 ? 0 : b > 255 ? 255 : (b + 0.5) | 0;
    }
  }
}

// ── Geometry Helpers ──
export function getWatermarkInfo(width: number, height: number): WatermarkBox {
  const minDim = Math.min(width, height);
  const ratio = minDim / 1536;
  const size = Math.max(16, Math.round(96 * ratio));
  const margin = Math.max(8, Math.round(64 * ratio));
  return {
    size,
    x: Math.max(0, width - margin - size),
    y: Math.max(0, height - margin - size),
    width: size,
    height: size,
  };
}

export function getRoi(width: number, height: number, wm: WatermarkBox) {
  const pad = Math.round(wm.size * 0.6);
  const rx = Math.max(0, Math.min(width - 1, wm.x - pad));
  const ry = Math.max(0, Math.min(height - 1, wm.y - pad));
  const rw = Math.max(1, Math.min(width - rx, wm.width + pad * 2));
  const rh = Math.max(1, Math.min(height - ry, wm.height + pad * 2));
  return { x: rx, y: ry, width: rw, height: rh };
}

export function resolveBox(
  base: WatermarkBox,
  width: number,
  height: number,
  opts: ResolveOptions = {}
): WatermarkBox {
  const sizeScale = opts.sizeScale || 1;
  const size = Math.max(8, Math.min(Math.round(base.size * sizeScale), Math.min(width, height)));

  // Center point of base box + offset
  const centerX = base.x + base.size / 2 + Math.round(opts.offsetX || 0);
  const centerY = base.y + base.size / 2 + Math.round(opts.offsetY || 0);

  // Position top-left so the center remains perfectly anchored
  const x = Math.max(0, Math.min(Math.round(centerX - size / 2), width - size));
  const y = Math.max(0, Math.min(Math.round(centerY - size / 2), height - size));
  return { size, x, y, width: size, height: size };
}

// ── Continuous Centered Alpha Generation ──
export function buildAlpha(
  bgImg: HTMLImageElement,
  roi: { x: number; y: number; width: number; height: number },
  wm: WatermarkBox,
  gain: number
): Float32Array {
  const count = roi.width * roi.height;
  const alphaMap = new Float32Array(count);

  const c = document.createElement('canvas');
  c.width = roi.width;
  c.height = roi.height;
  const cx = c.getContext('2d', { willReadFrequently: true })!;
  cx.imageSmoothingEnabled = true;
  cx.imageSmoothingQuality = 'high';

  // Draw scaled watermark centered onto the ROI coordinate plane
  const dx = wm.x - roi.x;
  const dy = wm.y - roi.y;
  cx.drawImage(bgImg, dx, dy, wm.size, wm.size);

  const rawData = cx.getImageData(0, 0, roi.width, roi.height).data;

  for (let i = 0; i < count; i++) {
    const o = i * 4;
    const a = (Math.max(rawData[o], rawData[o + 1], rawData[o + 2]) / 255.0) * gain;
    alphaMap[i] = a > 0 ? (a < 0.99 ? a : 0.99) : 0;
  }

  return alphaMap;
}

export function cleanFrame(
  bgImg: HTMLImageElement,
  imageData: ImageData,
  width: number,
  height: number,
  base: WatermarkBox,
  opts: ResolveOptions = {}
): { wm: WatermarkBox; roi: ReturnType<typeof getRoi> } {
  const wm = resolveBox(base, width, height, opts);
  const roi = getRoi(width, height, wm);
  const alpha = buildAlpha(bgImg, roi, wm, opts.gain ?? 1);
  removeWatermark(imageData, alpha, {
    x: roi.x,
    y: roi.y,
    width: roi.width,
    height: roi.height,
  });
  return { wm, roi };
}

// ── Exact Calibrated Gemini Aspect Ratio Presets ──
export function getAdaptiveImagePreset(
  presetKey: string,
  width: number,
  height: number
): { gain: number; offsetX: number; offsetY: number; sizeScale: number } {
  if (presetKey === 'classic') {
    return {
      gain: 0.6,
      offsetX: 0,
      offsetY: 0,
      sizeScale: 1.0,
    };
  }

  const minDim = Math.min(width, height);
  const maxDim = Math.max(width, height);
  const aspectFactor = maxDim / Math.max(1, minDim);

  const is2x = minDim >= 1800 || maxDim >= 2400;

  // ── 2x Upscaled / High-Resolution Tested Presets ──
  if (is2x) {
    let scale2x = 0.38;
    let offset2x = 25;

    if (aspectFactor >= 1.65) {
      // 16:9 / 9:16 2x (e.g. 3584x2048 / 2048x3584)
      scale2x = 0.50;
      offset2x = -1;
    } else if (aspectFactor >= 1.42) {
      // 3:2 / 2:3 2x (e.g. 3072x2048 / 2048x3072)
      scale2x = 0.46;
      offset2x = 6;
    } else if (aspectFactor >= 1.18) {
      // 4:3 / 3:4 2x (e.g. 2688x2016 / 2016x2688)
      scale2x = 0.43;
      offset2x = 13;
    } else {
      // 1:1 Square 2x (e.g. 2048x2048)
      scale2x = 0.38;
      offset2x = 25;
    }

    return {
      gain: 0.6,
      offsetX: offset2x,
      offsetY: offset2x,
      sizeScale: scale2x,
    };
  }

  // ── 1x Standard Tested Presets ──
  let scale1x = 0.75;
  let offset1x = -27;

  if (aspectFactor >= 1.65) {
    // 16:9 / 9:16 (1792x1024 / 1024x1792)
    scale1x = 1.01;
    offset1x = -41;
  } else if (aspectFactor >= 1.42) {
    // 3:2 / 2:3 (1536x1024 / 1024x1536)
    scale1x = 0.92;
    offset1x = -38;
  } else if (aspectFactor >= 1.18) {
    // 4:3 / 3:4 (1408x1056 / 1344x1008 / 1008x1344)
    scale1x = 0.86;
    offset1x = -35;
  } else {
    // 1:1 Square (1024x1024)
    scale1x = 0.75;
    offset1x = -27;
  }

  return {
    gain: 0.6,
    offsetX: offset1x,
    offsetY: offset1x,
    sizeScale: scale1x,
  };
}
