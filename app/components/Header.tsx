'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <a href="#" className="brand" title="Gemini Watermark Remover">
          <Image
            src="/assets/logo.webp"
            alt="Gemini Watermark Remover Logo"
            width={40}
            height={40}
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="brand-text">
            <span className="brand-title">Gemini Watermark Remover</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-menu" aria-label="Main Navigation">
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#guide" className="nav-link">Guide</a>
          <a href="#comparison" className="nav-link">Comparison</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#faq" className="nav-link">FAQ</a>

          {/* Primary CTA button */}
          <a href="#tool-dropzone" className="nav-cta-btn">
            <span>Use Free Tool</span>
            <Icon icon="ph:arrow-right-bold" width={14} />
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Icon icon={mobileOpen ? 'ph:x-bold' : 'ph:list-bold'} width={22} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-nav-links">
          <a href="#how-it-works" className="mobile-nav-link" onClick={closeMobile}>
            <Icon icon="ph:gear-six-bold" width={18} />
            <span>How it Works</span>
          </a>
          <a href="#guide" className="mobile-nav-link" onClick={closeMobile}>
            <Icon icon="ph:book-open-text-bold" width={18} />
            <span>Guide</span>
          </a>
          <a href="#comparison" className="mobile-nav-link" onClick={closeMobile}>
            <Icon icon="ph:sliders-horizontal-bold" width={18} />
            <span>Comparison</span>
          </a>
          <a href="#features" className="mobile-nav-link" onClick={closeMobile}>
            <Icon icon="ph:sparkle-bold" width={18} />
            <span>Features</span>
          </a>
          <a href="#faq" className="mobile-nav-link" onClick={closeMobile}>
            <Icon icon="ph:question-bold" width={18} />
            <span>FAQ</span>
          </a>
        </div>

        <div className="mobile-nav-footer">
          <a href="#tool-dropzone" className="btn btn-primary w-full justify-center" onClick={closeMobile}>
            <span>Use Free Tool Now</span>
            <Icon icon="ph:arrow-up-bold" width={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
