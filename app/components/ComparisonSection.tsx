import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function ComparisonSection() {
  return (
    <section id="comparison" className="comparison-section">
      <div className="comparison-layout">
        <div className="comparison-content">
          <h2 className="comparison-title">Before &amp; After: Gemini Watermark &amp; Logo Remover</h2>
          <p className="comparison-subtitle">
            Instead of blurry AI inpainting, our <strong>Gemini logo remover</strong> uses{' '}
            <strong>exact mathematical alpha unblending</strong> to subtract the transparent Gemini watermark mask
            pixel-by-pixel—restoring 100% of your original image quality.
          </p>
        </div>
        <div className="comparison-media">
          <div className="comparison-card">
            <span className="comparison-badge badge-before">
              <Icon icon="ph:x-circle" width={14} /> Before
            </span>
            <div className="comparison-img-wrapper checker">
              <Image
                src="/assets/before.webp"
                alt="Google Gemini image with visible watermark logo before removal"
                width={400}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
          <div className="comparison-card">
            <span className="comparison-badge badge-after">
              <Icon icon="ph:check-circle" width={14} /> After
            </span>
            <div className="comparison-img-wrapper checker">
              <Image
                src="/assets/after.webp"
                alt="Clean Google Gemini image after watermark and logo removal with zero quality loss"
                width={400}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
