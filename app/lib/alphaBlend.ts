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

/**
 * Fast separable sliding-window box blur for single-channel Float32Array.
 * O(1) operations per pixel.
 */
function boxBlur1D(
  src: Float32Array,
  width: number,
  height: number,
  radius: number,
  temp: Float32Array,
  dst: Float32Array
): void {
  const win = 2 * radius + 1;
  const invWin = 1.0 / win;

  // Horizontal pass
  for (let r = 0; r < height; r++) {
    const rowOffset = r * width;
    let val = 0.0;
    for (let c = -radius; c <= radius; c++) {
      const col = c < 0 ? 0 : c >= width ? width - 1 : c;
      val += src[rowOffset + col];
    }
    for (let c = 0; c < width; c++) {
      temp[rowOffset + c] = val * invWin;
      const cNext = c + radius + 1 < width ? c + radius + 1 : width - 1;
      const cPrev = c - radius > 0 ? c - radius : 0;
      val += src[rowOffset + cNext] - src[rowOffset + cPrev];
    }
  }

  // Vertical pass
  for (let c = 0; c < width; c++) {
    let val = 0.0;
    for (let r = -radius; r <= radius; r++) {
      const row = r < 0 ? 0 : r >= height ? height - 1 : r;
      val += temp[row * width + c];
    }
    for (let r = 0; r < height; r++) {
      dst[r * width + c] = val * invWin;
      const rNext = r + radius + 1 < height ? r + radius + 1 : height - 1;
      const rPrev = r - radius > 0 ? r - radius : 0;
      val += temp[rNext * width + c] - temp[rPrev * width + c];
    }
  }
}

/**
 * Specifically heals Gibbs undershoot ringing and etched edge outlines on upscaled videos (>720p).
 * This function is ONLY invoked for videos with min(width, height) > 720.
 * Standard 720p videos and all images are completely bypassed.
 */
export function healUpscaledVideoEdgeSeam(
  imageData: ImageData,
  alphaMap: Float32Array,
  position: { x: number; y: number; width: number; height: number },
  strength: number = 0.85
): void {
  if (strength <= 0.01) return;

  const { x, y, width, height } = position;
  const data = imageData.data;
  const imgWidth = imageData.width;
  const totalPixels = width * height;

  const edge = new Float32Array(totalPixels);
  const temp = new Float32Array(totalPixels);
  const blurredEdge = new Float32Array(totalPixels);

  // 1. Identify edge transition contour from alpha gradient
  for (let r = 1; r < height - 1; r++) {
    const rowOffset = r * width;
    for (let c = 1; c < width - 1; c++) {
      const idx = rowOffset + c;
      const a = alphaMap[idx];
      if (a < 0.002 || a > 0.40) continue;

      const gx = alphaMap[idx + 1] - alphaMap[idx - 1];
      const gy = alphaMap[idx + width] - alphaMap[idx - width];
      if (gx * gx + gy * gy > 0.0003) {
        edge[idx] = 1.0;
      }
    }
  }

  // 2. Dilate and smooth edge mask (radius 2)
  boxBlur1D(edge, width, height, 2, temp, blurredEdge);

  // 3. Smooth RGB channels and blend strictly over the dilated edge contour
  const chanSrc = new Float32Array(totalPixels);
  const chanBlurred = new Float32Array(totalPixels);

  for (let ch = 0; ch < 3; ch++) {
    for (let r = 0; r < height; r++) {
      const imgRowOffset = ((y + r) * imgWidth + x) * 4;
      const localRowOffset = r * width;
      for (let c = 0; c < width; c++) {
        chanSrc[localRowOffset + c] = data[imgRowOffset + c * 4 + ch];
      }
    }

    boxBlur1D(chanSrc, width, height, 3, temp, chanBlurred);

    for (let r = 0; r < height; r++) {
      const imgRowOffset = ((y + r) * imgWidth + x) * 4;
      const localRowOffset = r * width;
      for (let c = 0; c < width; c++) {
        const localIdx = localRowOffset + c;
        const w = Math.min(1.0, blurredEdge[localIdx] * 5.0) * strength;
        if (w > 0.01) {
          const pixelIdx = imgRowOffset + c * 4 + ch;
          const origVal = chanSrc[localIdx];
          const smoothVal = chanBlurred[localIdx];
          const finalVal = origVal * (1.0 - w) + smoothVal * w;
          data[pixelIdx] = finalVal < 0 ? 0 : finalVal > 255 ? 255 : (finalVal + 0.5) | 0;
        }
      }
    }
  }
}

