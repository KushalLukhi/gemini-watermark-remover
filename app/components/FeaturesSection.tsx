import { Icon } from '@iconify/react';

const features = [
  { icon: 'ph:shield-check', title: '100% Private & Client-Side', desc: 'Our Gemini watermark remover processes all photos and videos directly in your browser. No files are ever sent to external cloud servers.' },
  { icon: 'ph:cube-transparent', title: 'Mathematical Gemini Logo Remover', desc: "Reverses Google Gemini's exact transparent alpha blending formula instead of blurry AI inpainting, restoring 100% of your original pixel clarity." },
  { icon: 'ph:video', title: 'Gemini Video Watermark Remover', desc: 'Remove Gemini watermark from Veo MP4 videos frame-by-frame with high-speed rendering and original audio track preservation.' },
  { icon: 'ph:sliders-horizontal', title: 'Live Alignment & Dual Preview', desc: 'Fine-tune scale and coordinates with real-time feedback. Side-by-side zoomed previews ensure flawless Gemini watermark remover video alignment.' },
  { icon: 'ph:file-image', title: 'Universal Format Support', desc: 'Easily remove Gemini watermark from PNG, JPG, WebP images, as well as MP4, WebM, and MOV video formats without compression artifacts.' },
  { icon: 'ph:lightning', title: '100% Free & Unlimited Usage', desc: 'Unlimited conversions with zero subscriptions, no sign-ups, and no secondary watermarks added to your cleaned output files.' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <h2 className="section-title">Why Choose Our Gemini Video Watermark Remover &amp; Logo Eraser?</h2>
      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <Icon icon={f.icon} className="feature-icon" width={24} />
            <div className="feature-card-body">
              <h3 className="feature-card-title">{f.title}</h3>
              <p className="feature-card-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
