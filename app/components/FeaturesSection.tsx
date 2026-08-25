import { Icon } from '@iconify/react';

const features = [
  { icon: 'ph:shield-check', title: '100% Private & Local', desc: 'All media is processed completely inside your browser using HTML5 Canvas and WebCodecs. Your photos and videos never get uploaded to any external server.' },
  { icon: 'ph:cube-transparent', title: 'Zero Blur Mathematical Precision', desc: "Reverses Google Gemini's exact transparent alpha blending formula instead of blurry AI inpainting, restoring 100% of your original pixel clarity." },
  { icon: 'ph:video', title: 'Gemini Veo 3 Video Remover', desc: 'Easily remove Gemini watermark from Veo 3 MP4 videos with fast frame-by-frame processing and original audio track preservation.' },
  { icon: 'ph:sliders-horizontal', title: 'Live Tuner & Dual Preview', desc: 'Adjust strength, scale, and offset in real-time. Use the side-by-side zoomed original and cleaned preview windows for exact logo alignment.' },
  { icon: 'ph:file-image', title: 'Multi-Format Support', desc: 'Works effortlessly with PNG, JPG, WebP images, as well as MP4, WebM, and MOV video formats with instant browser downloads.' },
  { icon: 'ph:lightning', title: 'Free & Unlimited', desc: 'No signup required, no subscription fees, no file count limits, and no secondary watermarks added to your cleaned output files.' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features-section">
      <h2 className="section-title">Why Choose Our Gemini Logo &amp; Watermark Remover?</h2>
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
