import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'About – Gemini Watermark Remover',
  description:
    'Learn about Gemini Watermark Remover: who built it, how it works, and why mathematical inverse alpha unblending delivers better results than AI inpainting.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Gemini Watermark Remover',
    url: `${siteUrl}/about`,
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Gemini Watermark Remover',
      url: siteUrl,
    },
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
            About <span className="hero-title-gradient">Gemini Watermark Remover</span>
          </h1>
        </div>

        <article className="info-section" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Why This Tool Exists</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Google Gemini (powered by Imagen 3) and Google Veo add a semi-transparent 4-point sparkle watermark
            to every generated image and video. While Google now allows users to disable this watermark
            for future generations via Settings → Media watermark, there is no official way to clean
            watermarks from files you have already downloaded.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            This tool was built to solve that problem using <strong>mathematical inverse alpha unblending</strong> —
            a technique that reverses the exact transparency compositing formula rather than guessing
            what was behind the watermark with AI inpainting.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">How It Works</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Google composites the visible watermark onto images using standard linear alpha blending:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
            <code className="text-sm text-slate-800 font-mono">
              Watermarked = Background × (1 − α) + Logo × α
            </code>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            When we know the watermark image (Logo) and its transparency level (α), we can solve for the
            original background pixels:
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
            <code className="text-sm text-slate-800 font-mono">
              Background = (Watermarked − Logo × α) / (1 − α)
            </code>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            This formula is applied pixel-by-pixel only within the small bounding box of the watermark.
            All surrounding pixels remain completely untouched. For videos, each frame is decoded
            individually using WebCodecs, processed, and re-encoded with the original audio track
            passthrough intact.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Important Limitations</h2>
          <ul className="text-sm text-slate-600 leading-relaxed mb-6 space-y-2">
            <li>
              <strong>Visible watermark only:</strong> This tool removes the visible 4-point sparkle
              overlay. It does not remove or alter Google DeepMind SynthID™, C2PA metadata, or any
              invisible provenance markers embedded in the file.
            </li>
            <li>
              <strong>Mathematical reconstruction:</strong> While the inverse formula recovers the
              underlying pixels with high fidelity, the result depends on accurate watermark alignment.
              Heavily compressed or re-screenshotted images may produce slightly less precise results
              compared to direct Gemini downloads.
            </li>
            <li>
              <strong>User responsibility:</strong> Users are responsible for ensuring their use of
              this tool complies with Google&apos;s Terms of Service and applicable laws.
            </li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Privacy</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            All processing runs entirely inside your local web browser using HTML5 Canvas and WebCodecs.
            No images, videos, or personal data are uploaded, stored, or transmitted to any server.
            There is no account system, no analytics tracking of your media, and no server-side
            processing of any kind. See our full <a href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</a>.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Built By</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-2">
            Gemini Watermark Remover is developed and maintained by{' '}
            <a
              href="https://github.com/KushalLukhi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Kushal Lukhi
            </a>.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            For questions, feedback, or bug reports, please open an issue on GitHub.
          </p>
        </article>

        <Footer />
      </main>
    </>
  );
}
