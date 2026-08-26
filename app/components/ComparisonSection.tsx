'use client';

import { useRef, useEffect, useState } from 'react';

export default function ComparisonSection() {
  const [sliderX, setSliderX] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function getPercent(clientX: number) {
    if (!containerRef.current) return 50;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    return (x / width) * 100;
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragging) return;
    setSliderX(getPercent(e.clientX));
  }

  function onTouchMove(e: TouchEvent) {
    if (!dragging) return;
    setSliderX(getPercent(e.touches[0].clientX));
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', () => setDragging(false));
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', () => setDragging(false));
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', () => setDragging(false));
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', () => setDragging(false));
    };
  });

  return (
    <section id="comparison" className="comparison-section">
      <div className="comparison-layout">
        <div className="comparison-content">
          <h2 className="comparison-title">Before &amp; After: Gemini Watermark &amp; Logo Remover</h2>
          <p className="comparison-subtitle">
            Instead of blurry AI inpainting, our <strong>Gemini logo remover</strong> uses{' '}
            <strong>exact mathematical alpha unblending</strong> to subtract the transparent Gemini watermark mask
            pixel-by-pixel—restoring 100% of your original image quality.
          </p>
        </div>

        {/* Animated drag-to-reveal comparison */}
        <div className="animated-compare-wrap">
          <div
            ref={containerRef}
            className="animated-compare"
            onMouseDown={() => setDragging(true)}
            onTouchStart={() => setDragging(true)}
          >
            {/* AFTER (clean) — full canvas background */}
            <div className="compare-panel compare-after">
              <div className="compare-demo-img compare-demo-after">
                <DemoCanvas type="clean" />
              </div>
            </div>

            {/* BEFORE — clipped to left of slider */}
            <div
              className="compare-panel compare-before"
              style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
            >
              <div className="compare-demo-img compare-demo-before">
                <DemoCanvas type="watermark" />
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="compare-handle"
              style={{ left: `${sliderX}%` }}
              onMouseDown={() => setDragging(true)}
              onTouchStart={() => setDragging(true)}
            >
              <div className="compare-handle-line" />
              <div className="compare-handle-knob">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 10L2 7v6l4-3zM14 10l4-3v6l-4-3z" fill="#4f46e5" />
                </svg>
              </div>
              <div className="compare-handle-line" />
            </div>

            {/* Labels */}
            <span className="compare-label compare-label-before">Before</span>
            <span className="compare-label compare-label-after">After</span>
          </div>
          <p className="compare-hint">← Drag slider to compare →</p>
        </div>
      </div>
    </section>
  );
}

/* Inline SVG canvas showing watermark vs clean */
function DemoCanvas({ type }: { type: 'watermark' | 'clean' }) {
  return (
    <svg
      viewBox="0 0 480 320"
      xmlns="http://www.w3.org/2000/svg"
      className="compare-svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Gradient background resembling AI art */}
      <defs>
        <radialGradient id={`g1-${type}`} cx="30%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="40%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </radialGradient>
        <radialGradient id={`g2-${type}`} cx="80%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#f0abfc" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
        <filter id={`blur-${type}`}>
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      {/* Base gradient */}
      <rect width="480" height="320" fill={`url(#g1-${type})`} />
      <ellipse cx="360" cy="220" rx="200" ry="160" fill={`url(#g2-${type})`} />

      {/* Decorative blobs */}
      <circle cx="120" cy="80" r="60" fill="#c4b5fd" opacity="0.25" filter={`url(#blur-${type})`} />
      <circle cx="380" cy="60" r="40" fill="#f9a8d4" opacity="0.3" filter={`url(#blur-${type})`} />

      {/* Simulated content lines */}
      {[60, 100, 140, 180, 220].map((y) => (
        <rect key={y} x="40" y={y} width={160 + (y % 60)} height="10" rx="5" fill="white" opacity="0.12" />
      ))}

      {/* Gemini sparkle watermark — only shown for "before" */}
      {type === 'watermark' && (
        <g transform="translate(400,270)" opacity="0.85">
          {/* 4-point sparkle */}
          <path d="M0,-18 L2,-2 L18,0 L2,2 L0,18 L-2,2 L-18,0 L-2,-2 Z" fill="white" />
          <path d="M0,-10 L1,-1 L10,0 L1,1 L0,10 L-1,1 L-10,0 L-1,-1 Z" fill="white" opacity="0.5" />
          {/* Label */}
          <text x="24" y="5" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="600" opacity="0.9">
            Gemini
          </text>
        </g>
      )}

      {/* Clean badge for "after" */}
      {type === 'clean' && (
        <g transform="translate(390,268)">
          <circle r="14" fill="#10b981" />
          <path d="M-6,0 L-2,4 L7,-5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}
