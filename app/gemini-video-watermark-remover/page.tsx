import type { Metadata } from 'next';
import Header from '../components/Header';
import UnifiedRemover from '../components/UnifiedRemover';
import TrustStrip from '../components/TrustStrip';
import Footer from '../components/Footer';
import { Icon } from '@iconify/react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'Gemini Video Watermark Remover – Free Veo AI Video Tool',
  description:
    'Free online Gemini video watermark remover. Remove watermarks from Google Gemini & Veo AI videos with zero blur, original audio, and 100% privacy.',
  alternates: {
    canonical: `${siteUrl}/gemini-video-watermark-remover`,
  },
  openGraph: {
    title: 'Gemini Video Watermark Remover – Free Veo AI Video Tool',
    description:
      'Free online Gemini video watermark remover. Remove watermarks from Google Gemini & Veo AI videos with zero blur, original audio, and 100% privacy.',
    url: `${siteUrl}/gemini-video-watermark-remover`,
  },
};

export default function GeminiVideoWatermarkRemoverPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Gemini Video Watermark Remover',
    url: `${siteUrl}/gemini-video-watermark-remover`,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Remove Gemini and Google Veo video watermarks frame-by-frame directly in your browser with original audio preserved and zero quality loss.',
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
            Gemini <span className="hero-title-gradient">Video Watermark Remover</span>
          </h1>
          <p className="hero-description">
            Clean <strong>Google Gemini &amp; Veo AI video watermarks</strong> frame-by-frame in your browser.
            Preserves 100% of your original audio tracks, color grading, and video clarity with zero server uploads.
          </p>
        </div>

        <TrustStrip />
        <UnifiedRemover />

        {/* Video Technical Deep Dive */}
        <section className="how-it-works-section mt-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              How Video Watermark Removal Works
            </h2>
            <p className="text-sm text-slate-600">
              Unlike traditional video tools that blur large rectangular patches, our engine uses hardware-accelerated WebCodecs to process each frame with mathematical precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Icon icon="ph:film-strip-bold" width={22} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Frame-by-Frame Demuxing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your video is decoded locally frame-by-frame using hardware acceleration. The watermark coordinate is tracked across every individual frame.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Icon icon="ph:speaker-high-bold" width={22} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Original Audio Passthrough</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The AAC/Opus audio track is extracted and re-multiplexed into the final MP4/WebM video without re-encoding, preserving 100% audio fidelity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Icon icon="ph:shield-check-bold" width={22} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">100% Private Client-Side</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your high-resolution video clips are never sent over the network. Processing happens entirely inside your browser GPU/CPU.
              </p>
            </div>
          </div>
        </section>

        {/* Video FAQ */}
        <section className="faq-section mt-16 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Gemini Video Watermark Remover FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-1">
                Does this video remover support Google Veo 3 videos?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes! It supports all Google Veo and Gemini AI video formats (MP4, WebM, MOV) up to 4K resolution.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-1">
                Will the video lose audio or quality?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No. The original audio track is preserved completely, and only the small watermark overlay in the corner is cleaned.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 text-sm mb-1">
                Is there any video file size or duration limit?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Because processing happens locally in your browser, there are no artificial server limits. We recommend videos under 500MB for optimal performance.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
