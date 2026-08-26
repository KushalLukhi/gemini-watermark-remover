import { Icon } from '@iconify/react';

export default function GuideSection() {
  return (
    <section id="guide" className="guide-section">
      <div className="guide-header">
        <h2 className="section-title">How to Remove Google Gemini Watermark &amp; Logo</h2>
        <p className="guide-subtitle">
          Learn how to remove Gemini watermarks from existing media using our instant online tool or turn off watermarks for future AI creations.
        </p>
      </div>

      <div className="methods-grid">
        {/* Method 1: Tool */}
        <div className="method-card featured-method">
          <div className="method-badge tool-badge">
            <Icon icon="ph:eraser-bold" width={14} />
            Method 1: Instant Online Tool (Recommended)
          </div>
          <h3 className="method-title">Remove Gemini Watermark from Existing Images &amp; Veo Videos</h3>
          <p className="method-desc">
            For existing Google Gemini (Imagen 3) photos or Veo 3 AI videos, use this free client-side tool
            to remove Gemini watermark and logo sparkles mathematically with zero blur.
          </p>
          <ol className="method-steps">
            <li className="method-step-item">
              <span className="step-num-pill">1</span>
              <div className="step-text"><strong>Upload Media:</strong> Drag &amp; drop your Gemini image (PNG, JPG, WebP) or Veo 3 video (MP4, MOV) into the remover above.</div>
            </li>
            <li className="method-step-item">
              <span className="step-num-pill">2</span>
              <div className="step-text"><strong>Mathematical Unblending:</strong> Our engine applies the reverse formula to unblend watermark alpha without blurry AI inpainting.</div>
            </li>
            <li className="method-step-item">
              <span className="step-num-pill">3</span>
              <div className="step-text"><strong>Export Clean File:</strong> Click Remove &amp; Export for a 100% original quality download processed entirely in your browser.</div>
            </li>
          </ol>
          <div className="method-action">
            <a href="#tool-dropzone" className="btn btn-primary method-btn">
              <Icon icon="ph:arrow-up-bold" width={16} />
              <span>Use Free Gemini Watermark Remover</span>
            </a>
          </div>
        </div>

        {/* Method 2: Gemini Settings */}
        <div className="method-card">
          <div className="method-badge official-badge">
            <Icon icon="ph:gear-six-bold" width={14} />
            Method 2: Gemini Account Settings
          </div>
          <h3 className="method-title">Turn Off Watermarks for Future AI Generations</h3>
          <p className="method-desc">
            If you generate new images inside Google Gemini on the web, you can disable the visible
            watermark toggle in your Google account settings.
          </p>
          <ol className="method-steps">
            <li className="method-step-item">
              <span className="step-num-pill">1</span>
              <div className="step-text"><strong>Go to Gemini Web:</strong> Open <a href="https://gemini.google.com" target="_blank" rel="nofollow noopener noreferrer" className="text-link">gemini.google.com</a> and sign in.</div>
            </li>
            <li className="method-step-item">
              <span className="step-num-pill">2</span>
              <div className="step-text"><strong>Open Settings:</strong> Click on the <strong>Settings</strong> gear icon in the menu or sidebar.</div>
            </li>
            <li className="method-step-item">
              <span className="step-num-pill">3</span>
              <div className="step-text"><strong>Toggle Off:</strong> Under <strong>Media watermark</strong>, switch the visible watermark option to <strong>Off</strong>.</div>
            </li>
          </ol>
          <div className="method-note">
            <Icon icon="ph:info-bold" width={16} className="note-icon" />
            <span><strong>Note:</strong> This only prevents watermarks on future image creations. It cannot remove watermarks from already saved files or Veo videos.</span>
          </div>
        </div>
      </div>

      {/* SynthID Callout */}
      <div className="synthid-card">
        <div className="synthid-header">
          <div>
            <h4 className="synthid-title">Visible Gemini Logo vs SynthID Digital Watermark</h4>
            <p className="synthid-sub">Understanding Google&apos;s two-layer AI protection mechanism</p>
          </div>
        </div>
        <div className="synthid-grid">
          <div className="synthid-col">
            <strong className="synthid-col-title"><Icon icon="ph:eye-bold" width={16} /> 1. Visible Gemini Logo</strong>
            <p>The semi-transparent white 4-point sparkle logo rendered in the corner of images and Veo videos. This is what our Gemini watermark remover cleans mathematically with zero quality loss.</p>
          </div>
          <div className="synthid-col">
            <strong className="synthid-col-title"><Icon icon="ph:fingerprint-bold" width={16} /> 2. SynthID (Imperceptible Metadata)</strong>
            <p>An invisible cryptographic watermark developed by Google DeepMind embedded directly into image pixel noise and audio tracks for AI detection. It does not affect visible image aesthetics.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
