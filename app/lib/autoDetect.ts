import { calculateAlphaMap, getWatermarkInfo, getAdaptiveImagePreset, WatermarkBox } from './alphaBlend';

interface CandidateBox {
  x: number;
  y: number;
  size: number;
}

interface TemplateData {
  alphas: Float32Array;
  gradMag: Float32Array;
  size: number;
}

interface DetectionResult {
  matchFound: boolean;
  score: number;
  presetKey: string;
  name: string;
  offsetX: number;
  offsetY: number;
  sizeScale: number;
  gain: number;
}

const alphaTemplateCache = new Map<number, TemplateData>();

export function getAlphaTemplateData(bgImg: HTMLImageElement, size: number): TemplateData {
  if (alphaTemplateCache.has(size)) return alphaTemplateCache.get(size)!;

  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const cx = c.getContext('2d', { willReadFrequently: true })!;
  cx.imageSmoothingEnabled = true;
  cx.imageSmoothingQuality = 'high';
  cx.drawImage(bgImg, 0, 0, size, size);
  const raw = cx.getImageData(0, 0, size, size).data;

  const alphas = new Float32Array(size * size);
  for (let i = 0; i < alphas.length; i++) {
    const o = i * 4;
    alphas[i] = Math.max(raw[o], raw[o + 1], raw[o + 2]) / 255.0;
  }

  const gradMag = new Float32Array(size * size);
  for (let r = 1; r < size - 1; r++) {
    for (let col = 1; col < size - 1; col++) {
      const idx = r * size + col;
      const gx = alphas[idx + 1] - alphas[idx - 1];
      const gy = alphas[(r + 1) * size + col] - alphas[(r - 1) * size + col];
      gradMag[idx] = Math.sqrt(gx * gx + gy * gy);
    }
  }

  const template: TemplateData = { alphas, gradMag, size };
  alphaTemplateCache.set(size, template);
  return template;
}

export function evaluateCandidateMatch(
  imageData: ImageData,
  width: number,
  height: number,
  bgImg: HTMLImageElement,
  box: CandidateBox
): { score: number; variance: number } {
  const { x, y, size } = box;
  if (x < 0 || y < 0 || x + size > width || y + size > height || size <= 0) {
    return { score: -1, variance: 0 };
  }

  const { alphas, gradMag } = getAlphaTemplateData(bgImg, size);

  let sumL = 0, sumA = 0, sumL2 = 0, sumA2 = 0, sumLA = 0;
  let sumInvL = 0, sumInvL2 = 0, sumInvLA = 0;
  let sumG = 0, sumGA = 0, sumG2 = 0, sumGA2 = 0, sumGGA = 0;
  let n = 0, nGrad = 0;

  const step = size > 48 ? 2 : 1;

  for (let r = 0; r < size; r += step) {
    const imgRow = y + r;
    for (let col = 0; col < size; col += step) {
      const imgCol = x + col;
      const imgIdx = (imgRow * width + imgCol) * 4;
      const alphaIdx = r * size + col;

      const rVal = imageData.data[imgIdx];
      const gVal = imageData.data[imgIdx + 1];
      const bVal = imageData.data[imgIdx + 2];
      const lum = 0.299 * rVal + 0.587 * gVal + 0.114 * bVal;
      const invLum = 255.0 - lum;
      const alpha = alphas[alphaIdx];

      sumL += lum; sumA += alpha; sumL2 += lum * lum;
      sumA2 += alpha * alpha; sumLA += lum * alpha;
      sumInvL += invLum; sumInvL2 += invLum * invLum; sumInvLA += invLum * alpha;
      n++;

      if (r > 0 && r < size - 1 && col > 0 && col < size - 1 &&
        imgRow > 0 && imgRow < height - 1 && imgCol > 0 && imgCol < width - 1) {
        const leftIdx = (imgRow * width + (imgCol - 1)) * 4;
        const rightIdx = (imgRow * width + (imgCol + 1)) * 4;
        const upIdx = ((imgRow - 1) * width + imgCol) * 4;
        const downIdx = ((imgRow + 1) * width + imgCol) * 4;

        const lumLeft = 0.299 * imageData.data[leftIdx] + 0.587 * imageData.data[leftIdx + 1] + 0.114 * imageData.data[leftIdx + 2];
        const lumRight = 0.299 * imageData.data[rightIdx] + 0.587 * imageData.data[rightIdx + 1] + 0.114 * imageData.data[rightIdx + 2];
        const lumUp = 0.299 * imageData.data[upIdx] + 0.587 * imageData.data[upIdx + 1] + 0.114 * imageData.data[upIdx + 2];
        const lumDown = 0.299 * imageData.data[downIdx] + 0.587 * imageData.data[downIdx + 1] + 0.114 * imageData.data[downIdx + 2];

        const gx2 = lumRight - lumLeft;
        const gy2 = lumDown - lumUp;
        const imgGrad = Math.sqrt(gx2 * gx2 + gy2 * gy2);
        const aGrad = gradMag[alphaIdx];

        sumG += imgGrad; sumGA += aGrad;
        sumG2 += imgGrad * imgGrad; sumGA2 += aGrad * aGrad;
        sumGGA += imgGrad * aGrad;
        nGrad++;
      }
    }
  }

  if (n === 0) return { score: -1, variance: 0 };

  const meanL = sumL / n;
  const meanA = sumA / n;
  const varL = Math.max(0, sumL2 / n - meanL * meanL);
  const varA = Math.max(0, sumA2 / n - meanA * meanA);

  if (varA <= 0.0001) return { score: 0, variance: varL };

  let nccWhite = 0;
  if (varL > 0.5) {
    const covLA = sumLA / n - meanL * meanA;
    nccWhite = covLA / Math.sqrt(varL * varA);
  }

  let nccDark = 0;
  const meanInvL = sumInvL / n;
  const varInvL = Math.max(0, sumInvL2 / n - meanInvL * meanInvL);
  if (varInvL > 0.5 && meanL > 160) {
    const covInvLA = sumInvLA / n - meanInvL * meanA;
    nccDark = covInvLA / Math.sqrt(varInvL * varA);
  }

  const nccLum = Math.max(nccWhite, nccDark);

  let nccGrad = 0;
  if (nGrad > 10) {
    const meanG = sumG / nGrad;
    const meanGA = sumGA / nGrad;
    const varG = Math.max(0, sumG2 / nGrad - meanG * meanG);
    const varGA = Math.max(0, sumGA2 / nGrad - meanGA * meanGA);
    if (varG > 0.5 && varGA > 0.0001) {
      const covGGA = sumGGA / nGrad - meanG * meanGA;
      nccGrad = Math.max(0, covGGA / Math.sqrt(varG * varGA));
    }
  }

  let fusedScore = nccLum * 0.65 + nccGrad * 0.35;
  if (varL < 20) fusedScore = Math.max(fusedScore, nccLum * 0.40 + nccGrad * 0.60);

  return { score: Math.max(0, fusedScore), variance: varL };
}

export function detectWatermarkCandidate(
  imageData: ImageData,
  width: number,
  height: number,
  bgImg: HTMLImageElement
): DetectionResult {
  const minDim = Math.min(width, height);
  const base = getWatermarkInfo(width, height);
  const calibrated = getAdaptiveImagePreset('new', width, height);

  const layoutFamilies = [
    {
      presetKey: 'new',
      name: 'Gemini Imagen 3',
      baseSize: Math.round(base.size * calibrated.sizeScale),
      calcPos: (s: number) => {
        const targetCenterX = base.x + base.size / 2 + calibrated.offsetX;
        const targetCenterY = base.y + base.size / 2 + calibrated.offsetY;
        return {
          x: Math.max(0, Math.min(width - s, Math.round(targetCenterX - s / 2))),
          y: Math.max(0, Math.min(height - s, Math.round(targetCenterY - s / 2))),
        };
      },
      gain: 0.6,
      prior: 1.35,
    },
    {
      presetKey: 'classic',
      name: 'Classic Corner (Adaptive)',
      baseSize: base.size,
      calcPos: (s: number) => {
        const m = Math.max(8, Math.round(48 * (minDim / 1024)));
        return { x: Math.max(0, width - m - s), y: Math.max(0, height - m - s) };
      },
      gain: 0.6,
      prior: 0.95,
    },
  ];

  const scalePyramid = [0.85, 0.92, 1.00, 1.08, 1.15];
  const scalePriors: Record<number, number> = {
    1.00: 1.30,
    0.92: 1.10,
    1.08: 1.10,
    0.85: 0.90,
    1.15: 0.90,
  };

  let bestMatch: { layout: typeof layoutFamilies[0]; size: number; scale: number; x: number; y: number; score: number } | null = null;
  let bestScore = -1;

  for (const layout of layoutFamilies) {
    for (const scale of scalePyramid) {
      const s = Math.max(16, Math.min(Math.round(layout.baseSize * scale), minDim - 8));
      const pos = layout.calcPos(s);
      const { score } = evaluateCandidateMatch(imageData, width, height, bgImg, { x: pos.x, y: pos.y, size: s });
      const scalePrior = scalePriors[scale] || 1.0;
      const weightedScore = score * (layout.prior || 1.0) * scalePrior;
      if (weightedScore > bestScore) {
        bestScore = weightedScore;
        bestMatch = { layout, size: s, scale, x: pos.x, y: pos.y, score: weightedScore };
      }
    }
  }

  if (bestMatch && bestMatch.score > 0.12) {
    let refinedX = bestMatch.x, refinedY = bestMatch.y;
    let refinedSize = bestMatch.size, refinedScore = bestMatch.score;

    const fineSizes = [
      Math.max(16, Math.round(bestMatch.size * 0.95)),
      bestMatch.size,
      Math.min(minDim - 8, Math.round(bestMatch.size * 1.05)),
    ];
    const uniqueSizes = [...new Set(fineSizes)];

    for (const testSize of uniqueSizes) {
      for (let dy = -8; dy <= 8; dy += 2) {
        for (let dx = -8; dx <= 8; dx += 2) {
          const testX = Math.max(0, Math.min(width - testSize, bestMatch.x + dx));
          const testY = Math.max(0, Math.min(height - testSize, bestMatch.y + dy));
          const { score } = evaluateCandidateMatch(imageData, width, height, bgImg, { x: testX, y: testY, size: testSize });
          const weightedScore = score * (bestMatch.layout.prior || 1.0);
          if (weightedScore > refinedScore) {
            refinedScore = weightedScore;
            refinedX = testX; refinedY = testY; refinedSize = testSize;
          }
        }
      }
    }

    const calculatedScale = Math.round((refinedSize / base.size) * 100) / 100;
    const computedOffsetX = Math.round(refinedX + refinedSize / 2 - (base.x + base.size / 2));
    const computedOffsetY = Math.round(refinedY + refinedSize / 2 - (base.y + base.size / 2));

    return {
      matchFound: refinedScore >= 0.15,
      score: Math.min(1.0, refinedScore),
      presetKey: bestMatch.layout.presetKey,
      name: `${bestMatch.layout.name} (${refinedSize}px)`,
      offsetX: computedOffsetX,
      offsetY: computedOffsetY,
      sizeScale: Math.max(0.5, Math.min(2.5, calculatedScale)),
      gain: 0.6,
    };
  }

  return {
    matchFound: true,
    score: 1.0,
    presetKey: 'new',
    name: 'Gemini Imagen 3 (Calibrated)',
    offsetX: calibrated.offsetX,
    offsetY: calibrated.offsetY,
    sizeScale: calibrated.sizeScale,
    gain: 0.6,
  };
}

export function detectVideoWatermarkCandidate(
  imageData: ImageData,
  width: number,
  height: number,
  bgImg: HTMLImageElement
): DetectionResult {
  const baseDim = Math.min(width, height);
  const veoBase = {
    size: Math.max(24, Math.min(Math.round(baseDim / 15), baseDim)),
    margin: Math.round(baseDim / 10),
  };

  const layoutFamilies = [
    {
      name: 'Gemini Veo (Adaptive Inset)', baseSize: veoBase.size,
      calcPos: (s: number) => {
        const adaptiveOffset = Math.round(-24 * (baseDim / 720));
        const baseX = Math.max(0, width - veoBase.margin - veoBase.size);
        const baseY = Math.max(0, height - veoBase.margin - veoBase.size);
        return {
          x: Math.max(0, Math.min(width - s, baseX + adaptiveOffset)),
          y: Math.max(0, Math.min(height - s, baseY + adaptiveOffset)),
        };
      },
      gain: 0.6, prior: 1.06,
    },
    {
      name: 'Gemini Veo (Corner)', baseSize: veoBase.size,
      calcPos: (s: number) => {
        const baseX = Math.max(0, width - veoBase.margin - veoBase.size);
        const baseY = Math.max(0, height - veoBase.margin - veoBase.size);
        return { x: Math.max(0, Math.min(width - s, baseX)), y: Math.max(0, Math.min(height - s, baseY)) };
      },
      gain: 0.6, prior: 1.02,
    },
  ];

  const scalePyramid = [0.65, 0.85, 1.00, 1.20, 1.45];
  const scalePriors: Record<number, number> = {
    1.00: 1.25,
    0.85: 1.00,
    1.20: 1.00,
    0.65: 0.80,
    1.45: 0.80,
  };

  let bestMatch: { layout: typeof layoutFamilies[0]; size: number; x: number; y: number; score: number } | null = null;
  let bestScore = -1;

  for (const layout of layoutFamilies) {
    for (const scale of scalePyramid) {
      const s = Math.max(16, Math.min(Math.round(layout.baseSize * scale), baseDim - 8));
      const pos = layout.calcPos(s);
      const { score } = evaluateCandidateMatch(imageData, width, height, bgImg, { x: pos.x, y: pos.y, size: s });
      const scalePrior = scalePriors[scale] || 1.0;
      const weightedScore = score * (layout.prior || 1.0) * scalePrior;
      if (weightedScore > bestScore) {
        bestScore = weightedScore;
        bestMatch = { layout, size: s, x: pos.x, y: pos.y, score: weightedScore };
      }
    }
  }

  const baseX = Math.max(0, width - veoBase.margin - veoBase.size);
  const baseY = Math.max(0, height - veoBase.margin - veoBase.size);

  if (bestMatch && bestMatch.score > 0.05) {
    let refinedX = bestMatch.x, refinedY = bestMatch.y;
    let refinedSize = bestMatch.size, refinedScore = bestMatch.score;

    const fineSizes = [
      Math.max(16, Math.round(bestMatch.size * 0.92)),
      bestMatch.size,
      Math.min(baseDim - 8, Math.round(bestMatch.size * 1.08)),
    ];
    for (const testSize of [...new Set(fineSizes)]) {
      for (let dy = -16; dy <= 16; dy += 4) {
        for (let dx = -16; dx <= 16; dx += 4) {
          const testX = Math.max(0, Math.min(width - testSize, bestMatch.x + dx));
          const testY = Math.max(0, Math.min(height - testSize, bestMatch.y + dy));
          const { score } = evaluateCandidateMatch(imageData, width, height, bgImg, { x: testX, y: testY, size: testSize });
          const weightedScore = score * (bestMatch.layout.prior || 1.0);
          if (weightedScore > refinedScore) {
            refinedScore = weightedScore; refinedX = testX; refinedY = testY; refinedSize = testSize;
          }
        }
      }
    }
    const calculatedScale = Math.round((refinedSize / veoBase.size) * 100) / 100;
    return {
      matchFound: refinedScore >= 0.08, score: Math.min(1.0, refinedScore),
      presetKey: 'veo', name: `${bestMatch.layout.name} (${refinedSize}px)`,
      offsetX: refinedX - baseX, offsetY: refinedY - baseY,
      sizeScale: Math.max(0.5, Math.min(2.5, calculatedScale)),
      gain: bestMatch.layout.gain || 0.6,
    };
  }

  const fallbackOffset = Math.round(-24 * (baseDim / 720));
  return {
    matchFound: false, score: bestScore > 0 ? bestScore : 0,
    presetKey: 'veo', name: 'Gemini Veo (Adaptive Inset)',
    offsetX: fallbackOffset, offsetY: fallbackOffset, sizeScale: 1.01, gain: 0.6,
  };
}
