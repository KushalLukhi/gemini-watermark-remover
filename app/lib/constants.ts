// ── Alpha Blend Constants ──
export const ALPHA_THRESHOLD = 0.002;
export const MAX_ALPHA = 0.99;
export const LOGO_VALUE = 255;

// ── Presets ──
export const IMG_PRESETS: Record<string, { gain: number; offsetX: number; offsetY: number; sizeScale: number }> = {
  new: { gain: 0.6, offsetX: -128, offsetY: -128, sizeScale: 1 },
  classic: { gain: 1, offsetX: 0, offsetY: 0, sizeScale: 1 },
};

export const VIDEO_DEFAULTS = { gain: 1.0, offsetX: -24, offsetY: -24, sizeScale: 1 };

export const VIDEO_PRESETS: Record<string, { gain: number; offsetX: number; offsetY: number; sizeScale: number }> = {
  veo: { gain: 0.6, offsetX: -24, offsetY: -24, sizeScale: 1 },
  corner: { gain: 0.6, offsetX: 0, offsetY: 0, sizeScale: 1 },
};

// ── Inline Base64 Reference Images ──
// Loaded from /assets/bg_48.png and /assets/bg_96.png in the browser
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const BG_48_PATH = `${basePath}/assets/bg_48.png`;
export const BG_96_PATH = `${basePath}/assets/bg_96.png`;
