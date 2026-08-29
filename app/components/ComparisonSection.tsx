'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

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

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging) return;
      setSliderX(getPercent(e.clientX));
    }
    function onMouseUp() { setDragging(false); }
    function onTouchMove(e: TouchEvent) {
      if (!dragging) return;
      setSliderX(getPercent(e.touches[0].clientX));
    }
    function onTouchEnd() { setDragging(false); }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [dragging]);

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

        {/* Drag-to-reveal comparison slider */}
        <div className="animated-compare-wrap">
          <div
            ref={containerRef}
            className="animated-compare"
            onMouseDown={() => setDragging(true)}
            onTouchStart={() => setDragging(true)}
          >
            {/* AFTER (clean) — full background */}
            <div className="compare-panel compare-after">
              <Image
                src="/assets/after_pup.jpg?v=2"
                alt="Golden retriever photo after Gemini watermark removal — clean with zero blur"
                fill
                style={{ objectFit: 'cover' }}
                priority
                draggable={false}
              />
            </div>

            {/* BEFORE — clipped to left of slider */}
            <div
              className="compare-panel compare-before"
              style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
            >
              <Image
                src="/assets/before_pup.jpg?v=2"
                alt="Golden retriever photo before watermark removal — visible Gemini sparkle logo in corner"
                fill
                style={{ objectFit: 'cover' }}
                priority
                draggable={false}
              />
            </div>

            {/* Slider handle */}
            <div
              className="compare-handle"
              style={{ left: `${sliderX}%` }}
              onMouseDown={(e) => { e.stopPropagation(); setDragging(true); }}
              onTouchStart={(e) => { e.stopPropagation(); setDragging(true); }}
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
