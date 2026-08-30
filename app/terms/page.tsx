import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'Terms of Service – Gemini Watermark Remover',
  description:
    'Terms of service for Gemini Watermark Remover. Free utility for personal media editing with user responsibility for legal compliance.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="hero-section">
          <h1 className="hero-title">
            Terms of <span className="hero-title-gradient">Service</span>
          </h1>
        </div>

        <article className="info-section" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p className="text-xs text-slate-500 mb-6">Last updated: August 2026</p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Acceptance of Terms</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            By using Gemini Watermark Remover (&quot;the Service&quot;), you agree to these
            Terms of Service. If you do not agree, please do not use the Service.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Service Description</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Gemini Watermark Remover is a free, client-side web application that processes
            images and videos locally in your browser to remove visible watermark overlays.
            All processing occurs on your device; no files are uploaded to our servers.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">User Responsibilities</h2>
          <ul className="text-sm text-slate-600 leading-relaxed mb-6 space-y-2">
            <li>
              You are solely responsible for ensuring your use of this tool complies with
              Google&apos;s Terms of Service, applicable copyright laws, and any other
              relevant regulations in your jurisdiction.
            </li>
            <li>
              You should only use this tool on content you have created, own the rights to,
              or have explicit permission to edit.
            </li>
            <li>
              Do not use this tool to remove watermarks from third-party copyrighted content
              without authorization.
            </li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Disclaimer of Warranties</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            This software is provided &quot;as is&quot; without warranty of any kind, express
            or implied, including but not limited to the warranties of merchantability,
            fitness for a particular purpose, and noninfringement. The developers are not
            responsible for any consequences arising from the use of this tool.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Limitation of Liability</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            In no event shall the developers be liable for any direct, indirect, incidental,
            special, or consequential damages arising from the use of, or inability to use,
            this Service.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Modifications</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            We reserve the right to modify these terms at any time. Continued use of the
            Service after changes constitutes acceptance of the revised terms.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mb-3">Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            For questions about these terms, please reach out via our{' '}
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
