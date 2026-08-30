import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'Privacy Policy – Gemini Watermark Remover',
  description:
    'Privacy policy for Gemini Watermark Remover. 100% client-side processing — no uploads, no data collection, no cookies, no tracking.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="hero-section">
          <h1 className="hero-title">
            Privacy <span className="hero-title-gradient">Policy</span>
          </h1>
        </div>

        <article className="info-section" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p className="text-xs text-slate-500 mb-6">Last updated: August 2026</p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Summary</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Gemini Watermark Remover runs <strong>100% locally</strong> in your web browser.
            We do not upload, store, or transmit any of your images, videos, or personal data
            to any server.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Data Collection</h2>
          <ul className="text-sm text-slate-600 leading-relaxed mb-6 space-y-2">
            <li>
              <strong>Media files:</strong> All image and video processing is executed inside your
              browser using client-side HTML5 Canvas and WebCodecs APIs. Your files never leave
              your device.
            </li>
            <li>
              <strong>Personal information:</strong> We do not require accounts, logins, email
              addresses, or any personal information to use this tool.
            </li>
            <li>
              <strong>Cookies:</strong> We do not set tracking cookies. No advertising cookies
              or third-party tracking pixels are loaded.
            </li>
            <li>
              <strong>Analytics:</strong> We use Vercel Analytics and Speed Insights to collect
              anonymous, aggregated page view and performance metrics. These services do not
              track individual users, do not use cookies, and do not collect personal data.
            </li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Local Storage</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Slider positions and UI preferences may be stored temporarily in your browser&apos;s
            session memory for the duration of your visit. This data is not persisted between
            sessions and is never transmitted externally.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Third-Party Services</h2>
          <ul className="text-sm text-slate-600 leading-relaxed mb-6 space-y-2">
            <li><strong>Vercel:</strong> Hosting and CDN delivery (privacy policy: vercel.com/legal/privacy-policy)</li>
            <li><strong>Google Fonts:</strong> Font delivery (privacy policy: policies.google.com/privacy)</li>
            <li><strong>Iconify:</strong> Icon delivery CDN</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Children&apos;s Privacy</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            This service is not directed at children under 13. We do not knowingly collect
            personal information from children.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            For privacy-related inquiries, please open an issue on our{' '}
            <a
              href="https://github.com/KushalLukhi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              GitHub profile
            </a>.
          </p>
        </article>

        <Footer />
      </main>
    </>
  );
}
