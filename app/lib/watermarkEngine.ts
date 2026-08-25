import { BG_48_PATH, BG_96_PATH } from './constants';
import { calculateAlphaMap, getWatermarkInfo, removeWatermark } from './alphaBlend';

export class WatermarkEngine {
  bg48: HTMLImageElement;
  bg96: HTMLImageElement;
  alphaMaps: Record<number, Float32Array>;

  constructor(bg48: HTMLImageElement, bg96: HTMLImageElement) {
    this.bg48 = bg48;
    this.bg96 = bg96;
    this.alphaMaps = {};
  }

  static async create(): Promise<WatermarkEngine> {
    const loadImage = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = src;
      });

    const [bg48, bg96] = await Promise.all([
      loadImage(BG_48_PATH),
      loadImage(BG_96_PATH),
    ]);
    return new WatermarkEngine(bg48, bg96);
  }

  getWatermarkInfo(width: number, height: number) {
    return getWatermarkInfo(width, height);
  }

  async getAlphaMap(size: number): Promise<Float32Array> {
    if (this.alphaMaps[size]) return this.alphaMaps[size];
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(size <= 48 ? this.bg48 : this.bg96, 0, 0, size, size);
    const map = calculateAlphaMap(ctx.getImageData(0, 0, size, size));
    this.alphaMaps[size] = map;
    return map;
  }

  buildScaledAlphaMap(size: number): Float32Array {
    if (this.alphaMaps[size]) return this.alphaMaps[size];
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    ctx.clearRect(0, 0, size, size);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(this.bg96, 0, 0, size, size);
    const map = calculateAlphaMap(ctx.getImageData(0, 0, size, size));
    this.alphaMaps[size] = map;
    return map;
  }

  async process(imageFile: File): Promise<{ blob: Blob; originalSrc: string; width: number; height: number }> {
    const objectUrl = URL.createObjectURL(imageFile);
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = objectUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const config = this.getWatermarkInfo(canvas.width, canvas.height);
    const alphaMap = await this.getAlphaMap(config.size);
    removeWatermark(imageData, alphaMap, config);
    ctx.putImageData(imageData, 0, 0);

    return {
      blob: await new Promise<Blob>((r) => canvas.toBlob((b) => r(b!), 'image/png')),
      originalSrc: objectUrl,
      width: img.width,
      height: img.height,
    };
  }

  async prepareForSize(width: number, height: number) {
    const config = this.getWatermarkInfo(width, height);
    const alphaMap = await this.getAlphaMap(config.size);
    return { config, alphaMap };
  }

  removeFromImageData(imageData: ImageData, prepared?: { config: ReturnType<typeof getWatermarkInfo>; alphaMap: Float32Array }) {
    const { config, alphaMap } = prepared || this._sync(imageData.width, imageData.height);
    removeWatermark(imageData, alphaMap, config);
    return imageData;
  }

  _sync(width: number, height: number) {
    const config = this.getWatermarkInfo(width, height);
    return { config, alphaMap: this.alphaMaps[config.size] };
  }
}
