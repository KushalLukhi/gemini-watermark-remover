import { Icon } from '@iconify/react';

export default function BestPracticesSection() {
  const tips = [
    {
      num: '01',
      title: 'Always Use Direct Source Downloads',
      icon: 'ph:download-simple-bold',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      desc: 'Download the full-resolution file directly from Google Gemini or Google AI Studio. Avoid using screenshots, messaging app compressions (WhatsApp/Telegram), or downscaled social media reposts.',
    },
    {
      num: '02',
      title: 'Keep Default 0.60x Gain for Imagen 3',
      icon: 'ph:sliders-horizontal-bold',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      desc: 'Standard Google Gemini Imagen 3 images composite the watermark at exactly 60% opacity. The default 0.60x Strength (Gain) setting is mathematically tuned for 99.8% of official Gemini exports.',
    },
    {
      num: '03',
      title: 'Verify Alignment in the Zoomed Cleaned Preview',
      icon: 'ph:magnifying-glass-plus-bold',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      desc: 'Use the real-time dual zoomed preview cards to inspect the watermark corner at 4x magnification. If you notice any slight shadow or halo, nudge Position X or Y by 1px for exact sub-pixel lock.',
    },
    {
      num: '04',
      title: 'Preserve Lossless PNG Format for Images',
      icon: 'ph:check-circle-bold',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      desc: 'When exporting cleaned graphics, save as PNG whenever possible. PNG guarantees lossless compression, ensuring 100% of your restored background pixels remain bit-for-bit pristine.',
    },
  ];

  return (
    <section id="best-practices" className="info-section">
      <div className="section-header">
        <div className="section-badge">
          <Icon icon="ph:lightbulb-filament-bold" width={14} />
          <span>Pro Tips</span>
        </div>
        <h2 className="section-title">Best Practices for Flawless Watermark Removal</h2>
        <p className="section-subtitle">
          Follow these simple recommendations to achieve pixel-perfect watermark removal on every single image and video.
        </p>
      </div>

      <div className="tips-grid">
        {tips.map((tip) => (
          <div key={tip.num} className="tip-card">
            <div className="tip-header">
              <div className={`tip-icon-box ${tip.bg}`}>
                <Icon icon={tip.icon} width={22} className={tip.color} />
              </div>
              <span className="tip-num-pill">{tip.num}</span>
            </div>
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-desc">{tip.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
