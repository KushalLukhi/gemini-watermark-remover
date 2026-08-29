import type { Metadata } from 'next';
import Header from '../components/Header';
import UnifiedRemover from '../components/UnifiedRemover';
import TrustStrip from '../components/TrustStrip';
import ComparisonSection from '../components/ComparisonSection';
import Footer from '../components/Footer';
import { Icon } from '@iconify/react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'Gemini Image Watermark Remover – Clean Google AI Photos',
  description:
    'Free Gemini image watermark remover. Clean 4-point sparkle logos from Google Gemini AI photos with zero blur, 100% original quality, and privacy.',
  alternates: {
    canonical: `${siteUrl}/gemini-image-watermark-remover`,
  },
  openGraph: {
    title: 'Gemini Image Watermark Remover – Clean Google AI Photos',
    description:
      'Free Gemini image watermark remover. Clean 4-point sparkle logos from Google Gemini AI photos with zero blur, 100% original quality, and privacy.',
    url: `${siteUrl}/gemini-image-watermark-remover`,
  },
};

export default function GeminiImageWatermarkRemoverPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
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
      'Remove 4-point sparkle watermark logos from Google Gemini and Imagen AI photos with mathematical precision and zero blur.',
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
            Restores 100% authentic background pixels in full resolution with complete client-side privacy.
          </p>
        </div>

        <TrustStrip />
        <UnifiedRemover />
        <ComparisonSection />

        {/* Why Mathematical Unblending Beats AI Inpainting */}
        <section className="how-it-works-section mt-12 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Why Mathematical Unblending Beats AI Inpainting
            </h2>
            <p className="text-sm text-slate-600">
              Traditional watermark removers use generative AI inpainting to guess and paint over the logo, causing smudges. Here is why our approach preserves 100% clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-red-50/60 p-6 rounded-2xl border border-red-100">
              <div className="flex items-center gap-2 text-red-700 font-bold mb-2">
                <Icon icon="ph:x-circle-fill" width={20} />
                <span>Traditional AI Inpainting</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• Treats watermark as an opaque obstacle</li>
                <li>• Blurs and smudges background textures</li>
                <li>• Hallucinates fake pixels, destroying fine details</li>
                <li>• Often degrades overall image resolution</li>
              </ul>
            </div>

            <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-700 font-bold mb-2">
                <Icon icon="ph:check-circle-fill" width={20} />
                <span>Our Reverse Alpha Unblending</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• Recognizes watermark transparency layers</li>
                <li>• Subtracts the alpha mask with sub-pixel precision</li>
                <li>• Recovers 100% authentic original pixels</li>
                <li>• Preserves full original 4K/HD resolution</li>
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
