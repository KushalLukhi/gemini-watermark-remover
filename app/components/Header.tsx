'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [starCount, setStarCount] = useState<string>('--');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/ishara-madu/gemini-watermark-remover')
      .then((r) => r.json())
      .then((d) => {
        if (d.stargazers_count !== undefined) {
          const n = d.stargazers_count as number;
          setStarCount(n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand */}
        <a href="#" className="brand" title="Gemini Watermark Remover">
          <Image src="/assets/logo.webp" alt="Gemini Watermark Remover Logo" width={42} height={42} style={{ objectFit: 'cover' }} priority />
          <div className="brand-text">
            <span className="brand-title">Gemini Watermark Remover</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-menu" aria-label="Main Navigation">
          <a href="#how-it-works" className="nav-link">How it Works</a>
          <a href="#guide" className="nav-link">Settings vs Tool</a>
          <a href="#comparison" className="nav-link">Comparison</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#faq" className="nav-link">FAQ</a>

          {/* Tools Dropdown */}
          <div
            className={`nav-dropdown${dropdownOpen ? ' open' : ''}`}
            id="tools-dropdown"
            ref={dropdownRef}
          >
            <button
              type="button"
              className="nav-link nav-dropdown-btn"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onClick={() => setDropdownOpen((o) => !o)}
            >
              <span>Tools</span>
              <Icon icon="ph:caret-down-bold" className="dropdown-arrow" width={12} />
            </button>
            <div
              className="dropdown-menu"
              style={dropdownOpen ? { opacity: 1, visibility: 'visible', pointerEvents: 'auto', transform: 'translateX(-50%) translateY(0)' } : {}}
            >
              <a
                href="https://ishara-madu.github.io/online-image-converter/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item promo-item"
              >
                <div className="dropdown-item-icon promo-icon">
                  <img src="https://ishara-madu.github.io/online-image-converter/favicon.ico" alt="Online Image Converter Favicon" className="tool-favicon-img" width={22} height={22} loading="lazy" />
                </div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-title-row">
                    <span className="dropdown-item-title">Online Image Converter</span>
                    <span className="badge-featured">Free &amp; Fast</span>
                  </div>
                  <p className="dropdown-item-desc">Convert WebP, PNG, JPG, AVIF, GIF with zero quality loss.</p>
                </div>
                <Icon icon="ph:arrow-square-out-bold" width={16} className="dropdown-ext-icon" />
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item active-tool">
                <div className="dropdown-item-icon active-icon">
                  <img src="/assets/favicon-96x96.png" alt="Gemini Watermark Remover Favicon" className="tool-favicon-img" width={22} height={22} loading="lazy" />
                </div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-title-row">
                    <span className="dropdown-item-title">Gemini Watermark Remover</span>
                    <span className="badge-current">Current</span>
                  </div>
                  <p className="dropdown-item-desc">Remove Gemini &amp; Veo 3 watermarks mathematically.</p>
                </div>
              </a>
            </div>
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          type="button"
          id="mobile-menu-btn"
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Icon icon={mobileOpen ? 'ph:x-bold' : 'ph:list-bold'} width={22} />
        </button>

        {/* Header Actions (mobile nav + buttons) */}
        <div id="header-actions" className={`header-actions${mobileOpen ? ' mobile-open' : ''}`}>
          <div className="mobile-nav-links">
            <a href="#how-it-works" className="mobile-nav-link" onClick={closeMobile}><Icon icon="ph:info-bold" width={18} /><span>How it Works</span></a>
            <a href="#guide" className="mobile-nav-link" onClick={closeMobile}><Icon icon="ph:book-open-bold" width={18} /><span>Settings vs Tool</span></a>
            <a href="#comparison" className="mobile-nav-link" onClick={closeMobile}><Icon icon="ph:git-diff-bold" width={18} /><span>Comparison</span></a>
            <a href="#features" className="mobile-nav-link" onClick={closeMobile}><Icon icon="ph:shield-check-bold" width={18} /><span>Features</span></a>
            <a href="#faq" className="mobile-nav-link" onClick={closeMobile}><Icon icon="ph:question-bold" width={18} /><span>FAQ</span></a>
            <div className="mobile-promo-card">
              <div className="mobile-promo-header">
                <span className="mobile-promo-label">Recommended Tool</span>
                <span className="badge-featured">Free &amp; Fast</span>
              </div>
              <a href="https://ishara-madu.github.io/online-image-converter/" target="_blank" rel="noopener noreferrer" className="mobile-promo-link">
                <div className="dropdown-item-icon promo-icon">
                  <img src="https://ishara-madu.github.io/online-image-converter/favicon.ico" alt="Online Image Converter Favicon" className="tool-favicon-img" width={22} height={22} loading="lazy" />
                </div>
                <div className="mobile-promo-info">
                  <strong>Online Image Converter</strong>
                  <p>Convert WebP, PNG, JPG, AVIF in browser</p>
                </div>
                <Icon icon="ph:arrow-square-out-bold" width={16} className="mobile-promo-ext" />
              </a>
            </div>
          </div>

          <div className="header-action-buttons">
            <a href="https://github.com/ishara-madu/gemini-watermark-remover" target="_blank" rel="noopener noreferrer" className="btn-github" title="Star on GitHub">
              <Icon icon="ph:github-logo" width={18} />
              <Icon icon="ph:star-fill" width={14} style={{ color: '#eab308' }} />
              <span id="star-count-num">{starCount}</span>
              <span className="btn-github-label">Stars</span>
            </a>
            <a href="https://buymeacoffee.com/ishara.madu" target="_blank" rel="noopener noreferrer" className="btn-donate" title="Support the project">
              <Icon icon="ph:heart-fill" width={16} style={{ color: '#f43f5e' }} />
              <span>Donate</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
