import { Icon } from '@iconify/react';

export default function WhoUsesSection() {
  const personas = [
    {
      icon: 'ph:palette-bold',
      title: 'Designers & Freelancers',
      tag: 'Client Deliverables',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      desc: 'Deliver clean, watermark-free AI concept art, textures, stock visuals, and prototypes to clients without awkward third-party branding overlays.',
    },
    {
      icon: 'ph:video-camera-bold',
      title: 'Content Creators & YouTubers',
      tag: 'Social Media & B-Roll',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      desc: 'Clean Veo 3 AI video snippets and Imagen 3 graphics for YouTube thumbnails, TikTok reels, Instagram posts, and motion graphics packages.',
    },
    {
      icon: 'ph:megaphone-simple-bold',
      title: 'Digital Marketers & Agencies',
      tag: 'Ad Campaigns',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      desc: 'Create high-converting landing page hero banners, social media ad creatives, and promotional assets with pristine corporate presentation.',
    },
    {
      icon: 'ph:cpu-bold',
      title: 'AI Artists & Prompt Engineers',
      tag: 'Portfolio & Research',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      desc: 'Showcase raw AI model fidelity and photorealism in personal portfolios without distracting corner watermark artifacts.',
    },
  ];

  return (
    <section id="who-uses" className="info-section">
      <div className="section-header">
        <div className="section-badge">
          <Icon icon="ph:users-three-bold" width={14} />
          <span>Built for Creators</span>
        </div>
        <h2 className="section-title">Who Uses Gemini Watermark Remover?</h2>
        <p className="section-subtitle">
          Built for professionals who need clean, watermark-free AI visuals for commercial and creative projects.
        </p>
      </div>

      <div className="personas-grid">
        {personas.map((p, i) => (
          <div key={i} className="persona-card">
            <div className="persona-header">
              <div className={`persona-icon-box ${p.bg}`}>
                <Icon icon={p.icon} width={22} className={p.color} />
              </div>
              <span className="persona-tag">{p.tag}</span>
            </div>
            <h3 className="persona-title">{p.title}</h3>
            <p className="persona-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
