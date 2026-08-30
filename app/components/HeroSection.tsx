export default function HeroSection() {
  return (
    <>
      <div className="hero-section">
        <h1 className="hero-title">
          Free <span className="hero-title-gradient">Gemini Watermark Remover</span> Online
        </h1>
        <p className="hero-description">
          Drop any <strong>Google Imagen 3</strong> or <strong>Veo</strong> video or image and the sparkle logo is gone in seconds.
          Full support for standard Gemini, <strong>Nano Banana</strong>, and star overlay watermarks with 100% original quality.
        </p>

        {/* Feature Tags / Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            Google Imagen 3
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-50/70 px-3 py-1 text-xs font-semibold text-purple-700">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
            Veo AI Video
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-amber-50/70 px-3 py-1 text-xs font-semibold text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Nano Banana Watermarks
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-3 py-1 text-xs font-semibold text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Mathematical Unblending
          </span>
        </div>
      </div>

      {/* Animated floating blobs — no images */}
      <div className="hero-blob-left" aria-hidden="true" />
      <div className="hero-blob-right" aria-hidden="true" />
    </>
  );
}
