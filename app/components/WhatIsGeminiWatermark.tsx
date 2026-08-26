import { Icon } from '@iconify/react';

export default function WhatIsGeminiWatermark() {
  return (
    <section id="what-is-gemini-watermark" className="info-section">
      <div className="section-header">
        <div className="section-badge">
          <Icon icon="ph:info-bold" width={14} />
          <span>Understanding Google AI Watermarks</span>
        </div>
        <h2 className="section-title">What is the Gemini Watermark?</h2>
        <p className="section-subtitle">
          Learn how Google embeds logos on Imagen 3 images and Veo 3 AI videos, and how mathematical reverse blending restores the clean underlying pixels.
        </p>
      </div>

      <div className="info-cards-grid">
        <div className="info-card">
          <div className="info-card-icon-wrap">
            <Icon icon="ph:sparkle-fill" width={24} className="info-card-icon text-indigo-600" />
          </div>
          <h3 className="info-card-title">Visible 4-Point Sparkle Overlay</h3>
          <p className="info-card-text">
            When you generate artwork with Google Gemini (powered by Imagen 3) or create AI clips with Google Veo, a semi-transparent 4-pointed white sparkle icon is composited into the bottom-right corner. This visible mark serves as Google&apos;s default attribution.
          </p>
        </div>

        <div className="info-card">
          <div className="info-card-icon-wrap">
            <Icon icon="ph:paint-brush-broad-bold" width={24} className="info-card-icon text-blue-600" />
          </div>
          <h3 className="info-card-title">How Alpha Blending Works</h3>
          <p className="info-card-text">
            The watermark is not an opaque stamp — it is blended into the image using transparent alpha compositing.
            Because the original background pixels are preserved underneath the transparency layer, they can be
            precisely reconstructed without any visual loss or smudging.
          </p>
        </div>

        <div className="info-card">
          <div className="info-card-icon-wrap">
            <Icon icon="ph:shield-check-fill" width={24} className="info-card-icon text-emerald-600" />
          </div>
          <h3 className="info-card-title">Mathematical Inversion vs. AI Inpainting</h3>
          <p className="info-card-text">
            Generic AI eraser tools smudge or hallucinate pixels to cover watermarks, destroying sharp texture details. Our tool applies exact inverse algebraic math to remove the alpha layer, revealing 100% of the authentic original picture with zero blur.
          </p>
        </div>
      </div>
    </section>
  );
}
