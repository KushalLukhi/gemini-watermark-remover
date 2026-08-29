import type { Metadata } from 'next';
import Header from '../components/Header';
import UnifiedRemover from '../components/UnifiedRemover';
import TrustStrip from '../components/TrustStrip';
import Footer from '../components/Footer';
import { Icon } from '@iconify/react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'How to Remove Gemini Watermark: Step-by-Step 2026 Guide',
  description:
    'Learn how to remove Gemini watermarks from images & videos in 3 easy steps. Free, 100% client-side tutorial with zero blur and instant download.',
  alternates: {
    canonical: `${siteUrl}/how-to-remove-gemini-watermark`,
  },
  openGraph: {
    title: 'How to Remove Gemini Watermark: Step-by-Step 2026 Guide',
    description:
      'Learn how to remove Gemini watermarks from images & videos in 3 easy steps. Free, 100% client-side tutorial with zero blur and instant download.',
    url: `${siteUrl}/how-to-remove-gemini-watermark`,
  },
};

export default function HowToRemoveGeminiWatermarkPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Remove Gemini Watermark from Images and Videos',
    description:
      'Step-by-step tutorial on removing the visible Google Gemini 4-point sparkle watermark from AI images and Veo videos for free.',
    totalTime: 'PT1M',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Upload Your Gemini Image or Video',
        text: 'Drag and drop or select your Gemini Imagen photo (PNG, JPG, WebP) or Veo video (MP4, WebM, MOV) into the remover tool.',
        url: `${siteUrl}/how-to-remove-gemini-watermark#step1`,
      },
      {
        '@type': 'HowToStep',
        name: 'Auto-Detect and Fine-Tune',
        text: 'The engine automatically detects the exact watermark position and size. You can use the dual 4x zoom preview to fine-tune alignment.',
        url: `${siteUrl}/how-to-remove-gemini-watermark#step2`,
      },
      {
        '@type': 'HowToStep',
        name: 'Download Cleaned Media',
        text: 'Click Download Cleaned PNG or Video to instantly save your media with zero watermark, zero blur, and 100% original quality.',
        url: `${siteUrl}/how-to-remove-gemini-watermark#step3`,
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
            How to <span className="hero-title-gradient">Remove Gemini Watermarks</span>
          </h1>
          <p className="hero-description">
            A simple, step-by-step guide to removing visible 4-point sparkle logos from <strong>Google Gemini images and Veo videos</strong> for free in seconds.
          </p>
        </div>

        <TrustStrip />

        {/* Step-by-step Tutorial Box */}
        <section className="how-it-works-section mt-8 mb-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div id="step1" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-lg">
                1
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Step 1: Upload Your Image or Video</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Drag and drop your AI-generated file into the dropzone below or click anywhere to select. You can also press <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300 font-mono text-[10px]">Ctrl+V</kbd> to paste an image directly from your clipboard.
                </p>
              </div>
            </div>

            <div id="step2" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-lg">
                2
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Step 2: Instant Auto-Detection &amp; Preview</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The client-side engine automatically locates the exact 4-point sparkle logo in the bottom-right corner. Use the <strong>Zoomed Original</strong> and <strong>Zoomed Cleaned</strong> side-by-side preview cards to verify that the logo is completely removed.
                </p>
              </div>
            </div>

            <div id="step3" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-lg">
                3
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Step 3: Download Cleaned File in 1-Click</h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Click <strong>Download Cleaned PNG</strong> (for images) or <strong>Download Cleaned Video</strong> (for MP4/WebM videos). Your file is processed locally and saved directly to your downloads folder with 100% original quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Interactive Tool */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Try the Free Remover Tool Below</h2>
          <p className="text-xs text-slate-500">No account required • Instant client-side processing</p>
        </div>

        <UnifiedRemover />
        <Footer />
      </main>
    </>
  );
}
