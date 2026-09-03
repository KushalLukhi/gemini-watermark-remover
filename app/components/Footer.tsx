'use client';

import { useRef } from 'react';

export default function Footer() {
  const privacyRef = useRef<HTMLDialogElement>(null);
  const termsRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-links flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500 mb-2">
            <a href="/" className="hover:text-indigo-600 transition-colors font-semibold">Home</a>
            <span className="footer-dot">•</span>
            <a href="/gemini-image-watermark-remover" className="hover:text-indigo-600 transition-colors">Gemini Image Remover</a>
            <span className="footer-dot">•</span>
            <a href="/gemini-video-watermark-remover" className="hover:text-indigo-600 transition-colors">Gemini Video Remover</a>
            <span className="footer-dot">•</span>
            <a href="/how-to-remove-gemini-watermark" className="hover:text-indigo-600 transition-colors">How-To Guide</a>
            <span className="footer-dot">•</span>
            <a href="/blog" className="hover:text-indigo-600 transition-colors font-semibold">Blog</a>
            <span className="footer-dot">•</span>
            <a href="/about" className="hover:text-indigo-600 transition-colors">About</a>
            <span className="footer-dot">•</span>
            <a href="/#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
            <span className="footer-dot">•</span>
            <a href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <span className="footer-dot">•</span>
            <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold text-slate-400 mb-3">
            <span className="text-slate-500 font-bold">Languages:</span>
            <a href="/" className="hover:text-indigo-600 transition-colors">🇺🇸 English</a>
            <span>•</span>
            <a href="/es" className="hover:text-indigo-600 transition-colors">🇪🇸 Español</a>
            <span>•</span>
            <a href="/ja" className="hover:text-indigo-600 transition-colors">🇯🇵 日本語</a>
            <span>•</span>
            <a href="/zh" className="hover:text-indigo-600 transition-colors">🇨🇳 简体中文</a>
            <span>•</span>
            <a href="/pt" className="hover:text-indigo-600 transition-colors">🇧🇷 Português</a>
            <span>•</span>
            <a href="/de" className="hover:text-indigo-600 transition-colors">🇩🇪 Deutsch</a>
            <span>•</span>
            <a href="/fr" className="hover:text-indigo-600 transition-colors">🇫🇷 Français</a>
          </div>
          <p className="footer-sub">
            100% Free, Private &amp; Open-Architecture • All media processed locally in your browser with zero server uploads
          </p>
        </div>
      </footer>

      {/* Privacy Modal */}
      <dialog ref={privacyRef} className="app-modal">
        <div className="modal-box">
          <h3 className="modal-title">Privacy Policy</h3>
          <p className="modal-text mb-2">
            Gemini Watermark Remover values your privacy above all else. This application runs{' '}
            <strong>100% locally</strong> in your web browser using client-side HTML5 Canvas and WebCodecs technologies.
          </p>
          <p className="modal-text mb-4">
            • <strong>Zero Server Uploads:</strong> None of your uploaded images or videos are transmitted to external servers.<br />
            • <strong>No Data Collection:</strong> We do not track personal data, store tracking cookies, or monitor media processing.<br />
            • <strong>Local Session Memory:</strong> Sliders and active preferences are stored locally in your browser only for the current session.
          </p>
          <button type="button" className="btn btn-secondary text-xs" onClick={() => privacyRef.current?.close()}>
            Close
          </button>
        </div>
      </dialog>

      {/* Terms Modal */}
      <dialog ref={termsRef} className="app-modal">
        <div className="modal-box">
          <h3 className="modal-title">Terms of Service</h3>
          <p className="modal-text mb-2">
            Gemini Watermark Remover is provided as a free utility for personal media editing, research, and creative workflows.
          </p>
          <p className="modal-text mb-4">
            • <strong>User Responsibility:</strong> Users are solely responsible for ensuring their media editing complies with Google&apos;s Terms of Service and applicable copyright laws.<br />
            • <strong>No Warranty:</strong> This software is provided &quot;as is&quot; without warranty of any kind, express or implied.
          </p>
          <button type="button" className="btn btn-secondary text-xs" onClick={() => termsRef.current?.close()}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
