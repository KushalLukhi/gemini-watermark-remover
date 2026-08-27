export default function HeroSection() {
  return (
    <>
      <div className="hero-section">
        <h1 className="hero-title">
          Free <span className="hero-title-gradient">Gemini Watermark Remover</span> Online
        </h1>
        <p className="hero-description">
          Drop a Gemini or Veo video or image and the sparkle logo is gone in seconds —{' '}
          every frame, original quality, ready to post.
        </p>
      </div>

      {/* Animated floating blobs — no images */}
      <div className="hero-blob-left" aria-hidden="true" />
      <div className="hero-blob-right" aria-hidden="true" />
    </>
  );
}
