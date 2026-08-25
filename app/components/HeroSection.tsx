import Image from 'next/image';

export default function HeroSection() {
  return (
    <>
      <div className="hero-section">
        <h1 className="hero-title">Free Gemini Watermark Remover Online</h1>
        <p className="hero-description">
          The fastest way to <strong>remove Gemini watermark</strong> and erase Google AI logo sparkles from your{' '}
          <strong style={{ color: '#64748b' }}>images and Veo 3 videos</strong>. 100% free, secure, and processed completely inside
          your browser with <strong style={{ color: '#64748b' }}>zero quality loss</strong>.
        </p>
      </div>

      {/* Left Decorative Background Frame */}
      <div className="hero-bg-frame-container left" aria-hidden="true">
        <div className="hero-bg-frame">
          <Image
            src="/assets/bg1.webp"
            alt="Gemini watermark removal preview illustration"
            className="hero-bg-img"
            width={250}
            height={250}
            loading="lazy"
          />
        </div>
      </div>

      {/* Right Decorative Background Frame */}
      <div className="hero-bg-frame-container right" aria-hidden="true">
        <div className="hero-bg-frame">
          <Image
            src="/assets/bg2.webp"
            alt="Veo 3 AI video watermark removal preview illustration"
            className="hero-bg-img"
            width={350}
            height={350}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
