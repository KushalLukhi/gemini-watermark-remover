import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

  const content = `# Gemini Watermark Remover & Gemini Video Watermark Remover

> A free, 100% private, client-side web application to remove Gemini watermarks and Google AI sparkle logos from Google Imagen photos and Google Veo videos with zero quality loss.

## Overview
- **Name**: Gemini Watermark Remover
- **Website**: ${siteUrl}
- **License**: Free & Open to use, unlimited client-side processing
- **Key Functionality**: Removes the semi-transparent 4-point sparkle watermark from images (PNG, JPG, WebP) and videos (MP4, WebM, MOV) using mathematical inverse alpha unblending.

## Core Features
- **100% Client-Side Privacy**: All processing runs locally in the user's browser using HTML5 Canvas and WebCodecs. No images or videos are ever uploaded to external servers.
- **Mathematical Inverse Alpha Unblending**: Instead of blurry AI generative inpainting, this tool reverses the linear alpha compositing equation: \`Background = (Watermarked - Logo * alpha) / (1 - alpha)\`. This restores 100% of the authentic original background pixels under the transparent watermark with zero blur or degradation.
- **Gemini Video Watermark Remover**: Processes Google Veo AI videos frame-by-frame with hardware acceleration, preserving original audio tracks and original resolution (including 1080p and 4K).
- **Interactive Live Alignment**: Dual zoomed preview windows for pixel-perfect scale, gain, and coordinate adjustment.
- **Supported Formats**: PNG, JPG, JPEG, WebP, MP4, WebM, MOV.

## Step-by-Step Usage
1. **Upload**: Drag and drop any Google Imagen photo or Google Veo video into the dropzone (or paste with Ctrl+V).
2. **Auto-Detect & Fine-Tune**: The application automatically detects the watermark location. Adjust scale and position sliders if needed with the live zoomed preview.
3. **Export**: Click "Remove & Export" to download your clean, watermark-free image or video directly to your local device.

## SynthID™ vs Visible Gemini Watermark
- **Visible Watermark**: The semi-transparent 4-pointed white sparkle icon composited in the corner of images and Veo videos. This tool removes this visible layer mathematically.
- **SynthID™**: Google DeepMind's imperceptible, cryptographic digital watermark embedded in pixel frequency spectrums for AI identification. It has zero visual impact on picture aesthetics.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
}
