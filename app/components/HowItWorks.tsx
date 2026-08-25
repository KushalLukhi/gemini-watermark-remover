import { Icon } from '@iconify/react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <h2 className="section-title">How to Remove Gemini Watermark</h2>
      <div className="steps-grid">
        <div className="step-card">
          <div className="step-badge">1</div>
          <div className="step-icon"><Icon icon="ph:upload-simple" width={26} /></div>
          <h3 className="step-title">Upload Media</h3>
          <p className="step-desc">Select or drag &amp; drop your Google Gemini generated image or Veo 3 video into the remover.</p>
        </div>
        <div className="step-card">
          <div className="step-badge">2</div>
          <div className="step-icon"><Icon icon="ph:sliders-horizontal" width={26} /></div>
          <h3 className="step-title">Adjust &amp; Align</h3>
          <p className="step-desc">Fine-tune the size and position sliders. Use the dual zoomed preview corners for pixel-perfect logo alignment.</p>
        </div>
        <div className="step-card">
          <div className="step-badge">3</div>
          <div className="step-icon"><Icon icon="ph:download-simple" width={26} /></div>
          <h3 className="step-title">Export Clean Media</h3>
          <p className="step-desc">Click Remove &amp; Export to download your clean, watermark-free file locally with zero quality loss.</p>
        </div>
      </div>
    </section>
  );
}
