import type { Metadata } from 'next';
import Header from '../components/Header';
import UnifiedRemover from '../components/UnifiedRemover';
import TrustStrip from '../components/TrustStrip';
import ComparisonSection from '../components/ComparisonSection';
import Footer from '../components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'Gemini Image Watermark Remover – Clean Google AI Photos Free',
  description:
    'Remove the 4-point sparkle watermark from Google Gemini AI images (PNG, JPG, WebP) using mathematical inverse alpha unblending. Free, private, zero blur.',
  alternates: {
    canonical: `${siteUrl}/gemini-image-watermark-remover`,
  },
  openGraph: {
    title: 'Gemini Image Watermark Remover – Clean Google AI Photos Free',
    description:
      'Remove the 4-point sparkle watermark from Google Gemini AI images using mathematical inverse alpha unblending. Free, private, zero blur.',
    url: `${siteUrl}/gemini-image-watermark-remover`,
  },
};

export default function GeminiImageWatermarkRemoverPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Gemini Image Watermark Remover',
        url: `${siteUrl}/gemini-image-watermark-remover`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Remove 4-point sparkle watermark logos from Google Gemini and Imagen 3 AI photos with mathematical precision and zero blur.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gemini Image Watermark Remover',
            item: `${siteUrl}/gemini-image-watermark-remover`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What image formats does the Gemini image watermark remover support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool supports PNG, JPG/JPEG, and WebP image formats at any resolution up to 4K+. PNG is recommended for the highest quality output since it preserves lossless compression.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does this remove the watermark from Imagen 3 images?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Google Imagen 3 (the model behind Gemini image generation) applies the same semi-transparent 4-point sparkle watermark at approximately 60% opacity. The default settings are tuned specifically for Imagen 3 output.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does mathematical unblending produce better results than AI inpainting for images?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'AI inpainting treats the watermark as an opaque obstacle and generates new pixels to fill the area, often creating blurry or smudged textures. Mathematical unblending reverses the exact alpha compositing formula, recovering the actual original pixels that exist underneath the transparent watermark layer.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="container">
        <div className="hero-section">
          <h1 className="hero-title">
            Gemini <span className="hero-title-gradient">Image Watermark Remover</span>
          </h1>
          <p className="hero-description">
            Remove the 4-pointed Gemini sparkle logo from <strong>Google Gemini AI images</strong> with zero blur.
            Supports PNG, JPG, and WebP formats up to 4K resolution with 100% client-side privacy.
          </p>
        </div>

        <TrustStrip />
        <UnifiedRemover />
        <ComparisonSection />

        {/* Image-Specific Technical Explanation */}
        <section className="info-section">
          <div className="section-header">
            <h2 className="section-title">How Image Watermark Removal Works</h2>
            <p className="section-subtitle">
              Understanding the mathematical difference between inverse alpha unblending and AI inpainting for still images.
            </p>
          </div>

          <div className="info-cards-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="info-card">
              <h3 className="info-card-title">Transparent Overlay, Not Opaque Stamp</h3>
              <p className="info-card-text">
                The Gemini watermark is composited using alpha blending at approximately 60% opacity.
                This means the original background pixels are partially visible underneath the
                semi-transparent white sparkle icon, making mathematical recovery possible.
              </p>
            </div>

            <div className="info-card">
              <h3 className="info-card-title">Pixel-Level Reconstruction</h3>
              <p className="info-card-text">
                The inverse formula is applied individually to each pixel within the watermark
                bounding box. For PNG images, this preserves the full 32-bit RGBA color depth.
                For JPG images, the result is as accurate as the source compression allows.
              </p>
            </div>

            <div className="info-card">
              <h3 className="info-card-title">Format-Specific Recommendations</h3>
              <p className="info-card-text">
                For best results, use the original file downloaded directly from Google Gemini
                or Google AI Studio. Avoid screenshots or images shared through messaging apps
                (WhatsApp, Telegram), as compression artifacts reduce reconstruction accuracy.
              </p>
            </div>
          </div>
        </section>

        {/* Image FAQ */}
        <section className="faq-section">
          <div className="faq-layout">
            <div className="faq-header-col">
              <h2 className="faq-title">Image Watermark Remover FAQ</h2>
            </div>
            <div className="faq-list-col">
              <div className="faq-container">
                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">01</span>
                      <span>What image formats are supported?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    PNG, JPG/JPEG, and WebP at any resolution. PNG is recommended for lossless output quality.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">02</span>
                      <span>Does this work on Imagen 3 images?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    Yes. Google Imagen 3 applies the same 4-point sparkle watermark at ~60% opacity.
                    The default gain setting of 0.60x is calibrated for Imagen 3 output.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">03</span>
                      <span>Will my image quality be reduced?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    Only the pixels within the small watermark bounding box are modified. All other
                    pixels remain completely untouched. The output is saved as a lossless PNG file.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">04</span>
                      <span>Can I remove watermarks from screenshots of Gemini images?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    Screenshots introduce compression artifacts and resolution changes that reduce
                    reconstruction accuracy. For best results, always download the original file
                    directly from Google Gemini or AI Studio.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
