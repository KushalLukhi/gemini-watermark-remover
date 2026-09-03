'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 40) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 6) {
        // Scrolling Down -> Hide
        setVisible(false);
        setMobileOpen(false);
        setLangOpen(false);
      } else if (currentScrollY < lastScrollY.current - 6) {
        // Scrolling Up -> Show
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    }

    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header
      className={`sticky top-3.5 z-50 w-full px-4 transition-transform duration-300 pointer-events-none ${
        visible ? 'translate-y-0' : '-translate-y-[140%]'
      }`}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/45 px-6 py-2.5 shadow-[0_10px_40px_-20px_rgba(15,23,42,0.40)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/35 pointer-events-auto transition-all">
        {/* Ambient glass reflection gradient overlay matching SequalInfotech */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.2)_100%),radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_85%_10%,rgba(99,102,241,0.18),transparent_25%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/90"
          aria-hidden="true"
        />

        {/* Brand */}
        <a href="/" className="relative z-10 flex items-center gap-2.5 no-underline transition-opacity hover:opacity-90">
          <Image
            src="/assets/logo.webp"
            alt="Gemini Watermark Remover Logo"
            width={36}
            height={36}
            className="rounded-lg object-cover"
            priority
          />
          <div className="flex items-center whitespace-nowrap">
            <span className="text-base font-bold tracking-tight text-slate-900">
              Gemini Watermark Remover
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-menu relative z-10 flex items-center gap-1" aria-label="Main Navigation">
          <a href="#how-it-works" className="nav-link">
            How it Works
          </a>
          <a href="#guide" className="nav-link">
            Guide
          </a>
          <a href="#comparison" className="nav-link">
            Comparison
          </a>
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#faq" className="nav-link">
            FAQ
          </a>
          <a href="/blog" className="nav-link">
            Blog
          </a>

          {/* Language Selector Dropdown */}
          <div ref={langRef} className="relative ml-1">
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all shadow-sm ${
                langOpen
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                  : 'border-slate-300/80 bg-white/90 text-slate-700 hover:bg-white hover:border-slate-400'
              }`}
              aria-label="Select Language"
              aria-expanded={langOpen}
            >
              <Icon icon="ph:globe-bold" width={15} className="text-indigo-600" />
              <span>Languages</span>
              <Icon
                icon="ph:caret-down-bold"
                width={11}
                className={`text-slate-400 transition-transform duration-200 ${langOpen ? 'rotate-180 text-indigo-600' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {langOpen && (
              <div className="absolute right-0 top-full mt-2.5 z-50 min-w-[180px] rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-[0_20px_50px_rgba(15,23,42,0.22)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Select Language
                </div>
                <div className="flex flex-col gap-0.5">
                  <a
                    href="/"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setLangOpen(false)}
                  >
                    <span className="text-sm">🇺🇸</span>
                    <span>English</span>
                  </a>
                  <a
                    href="/es"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setLangOpen(false)}
                  >
                    <span className="text-sm">🇪🇸</span>
                    <span>Español</span>
                  </a>
                  <a
                    href="/ja"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setLangOpen(false)}
                  >
                    <span className="text-sm">🇯🇵</span>
                    <span>日本語</span>
                  </a>
                  <a
                    href="/zh"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setLangOpen(false)}
                  >
                    <span className="text-sm">🇨🇳</span>
                    <span>简体中文</span>
                  </a>
                  <a
                    href="/pt"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setLangOpen(false)}
                  >
                    <span className="text-sm">🇧🇷</span>
                    <span>Português</span>
                  </a>
                  <a
                    href="/de"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setLangOpen(false)}
                  >
                    <span className="text-sm">🇩🇪</span>
                    <span>Deutsch</span>
                  </a>
                  <a
                    href="/fr"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setLangOpen(false)}
                  >
                    <span className="text-sm">🇫🇷</span>
                    <span>Français</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA button */}
          <a
            href="#tool-dropzone"
            className="nav-cta-btn"
          >
            <span>Use Free Tool</span>
            <Icon icon="ph:arrow-right-bold" width={14} />
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/50 text-slate-800 backdrop-blur md:hidden"
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Icon icon={mobileOpen ? 'ph:x-bold' : 'ph:list-bold'} width={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="relative mx-auto mt-2 max-w-5xl rounded-2xl border border-white/60 bg-white/70 p-4 shadow-xl backdrop-blur-2xl pointer-events-auto md:hidden">
          <nav className="flex flex-col gap-2">
            <a href="#how-it-works" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/60" onClick={closeMobile}>
              How it Works
            </a>
            <a href="#guide" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/60" onClick={closeMobile}>
              Guide
            </a>
            <a href="#comparison" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/60" onClick={closeMobile}>
              Comparison
            </a>
            <a href="#features" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/60" onClick={closeMobile}>
              Features
            </a>
            <a href="#faq" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/60" onClick={closeMobile}>
              FAQ
            </a>
            <a href="/blog" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white/60" onClick={closeMobile}>
              Blog
            </a>

            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 block">Language</span>
              <div className="grid grid-cols-2 gap-1 px-1">
                <a href="/" className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white/80" onClick={closeMobile}>🇺🇸 English</a>
                <a href="/es" className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white/80" onClick={closeMobile}>🇪🇸 Español</a>
                <a href="/ja" className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white/80" onClick={closeMobile}>🇯🇵 日本語</a>
                <a href="/zh" className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white/80" onClick={closeMobile}>🇨🇳 简体中文</a>
                <a href="/pt" className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white/80" onClick={closeMobile}>🇧🇷 Português</a>
                <a href="/de" className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white/80" onClick={closeMobile}>🇩🇪 Deutsch</a>
                <a href="/fr" className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white/80" onClick={closeMobile}>🇫🇷 Français</a>
              </div>
            </div>

            <a
              href="#tool-dropzone"
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-semibold text-white"
              onClick={closeMobile}
            >
              <span>Use Free Tool</span>
              <Icon icon="ph:arrow-right-bold" width={14} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
