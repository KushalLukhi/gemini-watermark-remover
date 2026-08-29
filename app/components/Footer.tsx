'use client';

import { useRef } from 'react';

export default function Footer() {
  const privacyRef = useRef<HTMLDialogElement>(null);
  const termsRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <footer className="app-footer">
          <div className="footer-links flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium text-slate-500 mb-2">
            <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
            <span className="footer-dot">•</span>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <span className="footer-dot">•</span>
            <a href="#comparison" className="hover:text-indigo-600 transition-colors">Before &amp; After</a>
            <span className="footer-dot">•</span>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <span className="footer-dot">•</span>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
            <span className="footer-dot">•</span>
            <a
              href="#privacy"
              className="hover:text-indigo-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                privacyRef.current?.showModal();
              }}
            >
              Privacy Policy
            </a>
            <span className="footer-dot">•</span>
            <a
              href="#terms"
              className="hover:text-indigo-600 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                termsRef.current?.showModal();
              }}
            >
              Terms of Service
            </a>
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
