import { Icon } from '@iconify/react';

export default function TrustStrip() {
  const trustPoints = [
    { icon: 'ph:shield-check-bold', title: '100% Client-Side', desc: 'Runs locally in your browser' },
    { icon: 'ph:cloud-slash-bold', title: 'Zero Server Uploads', desc: 'Your files never leave your device' },
    { icon: 'ph:sparkle-bold', title: 'Mathematical Unblending', desc: 'No blurry AI inpainting smudges' },
    { icon: 'ph:infinity-bold', title: 'Completely Free', desc: 'No signup, no limits, no watermark' },
  ];

  return (
    <div className="trust-strip-container">
      <div className="trust-strip-grid">
        {trustPoints.map((pt, i) => (
          <div key={i} className="trust-item">
            <div className="trust-icon-box">
              <Icon icon={pt.icon} width={20} height={20} className="trust-icon" />
            </div>
            <div className="trust-text">
              <span className="trust-title">{pt.title}</span>
              <span className="trust-desc">{pt.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
