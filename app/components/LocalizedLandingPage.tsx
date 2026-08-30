import Header from './Header';
import TrustStrip from './TrustStrip';
import UnifiedRemover from './UnifiedRemover';
import ComparisonSection from './ComparisonSection';
import SynthIdComparison from './SynthIdComparison';
import WhoUsesSection from './WhoUsesSection';
import DoesVsDoesntSection from './DoesVsDoesntSection';
import SupportedFormatsSection from './SupportedFormatsSection';
import BestPracticesSection from './BestPracticesSection';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import { translations, Locale } from '../lib/translations';
import { Icon } from '@iconify/react';

interface LocalizedLandingPageProps {
  locale: Locale;
}

export default function LocalizedLandingPage({ locale }: LocalizedLandingPageProps) {
  const t = translations[locale] || translations.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: t.meta.title,
        url: `https://geminiremove.com/${locale === 'en' ? '' : locale}`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any (Browser-based)',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          '100% Client-Side Private Browser Processing',
          'Mathematical Inverse Alpha Unblending',
          'Veo Video & Imagen 3 Image Support',
          'Original Audio Preserved',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="container">
        {/* Localized Hero */}
        <div className="hero-section">
          <h1 className="hero-title">
            {t.hero.titlePrefix}
            <span className="hero-title-gradient">{t.hero.titleHighlight}</span>
            {t.hero.titleSuffix}
          </h1>
          <p className="hero-description">{t.hero.description}</p>

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
              Nano Banana
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-3 py-1 text-xs font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Lossless Unblending
            </span>
          </div>
        </div>
        <div className="hero-blob-left" aria-hidden="true" />
        <div className="hero-blob-right" aria-hidden="true" />

        {/* Localized Trust Strip */}
        <div className="trust-strip-container">
          <div className="trust-strip-grid">
            {t.trust.points.map((pt, i) => {
              const icons = [
                'ph:shield-check-bold',
                'ph:cloud-slash-bold',
                'ph:sparkle-bold',
                'ph:infinity-bold',
              ];
              return (
                <div key={i} className="trust-item">
                  <div className="trust-icon-box">
                    <Icon icon={icons[i % icons.length]} width={20} height={20} className="trust-icon" />
                  </div>
                  <div className="trust-text">
                    <span className="trust-title">{pt.title}</span>
                    <span className="trust-desc">{pt.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Tool */}
        <UnifiedRemover />

        {/* Localized How It Works */}
        <section id="how-it-works" className="how-it-works-section">
          <h2 className="section-title">{t.howItWorks.title}</h2>
          <div className="steps-grid">
            {t.howItWorks.steps.map((step, i) => {
              const icons = ['ph:upload-simple', 'ph:sliders-horizontal', 'ph:download-simple'];
              return (
                <div key={i} className="step-card">
                  <div className="step-badge">{i + 1}</div>
                  <div className="step-icon">
                    <Icon icon={icons[i % icons.length]} width={26} />
                  </div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <ComparisonSection />
        <SynthIdComparison />
        <WhoUsesSection />
        <DoesVsDoesntSection />
        <SupportedFormatsSection />
        <BestPracticesSection />
        <FeaturesSection />

        {/* Localized FAQ */}
        <section id="faq" className="faq-section">
          <div className="faq-layout">
            <div className="faq-header-col">
              <div className="section-badge">
                <Icon icon="ph:question-bold" width={14} />
                <span>FAQ</span>
              </div>
              <h2 className="faq-title">{t.faq.title}</h2>
              <p className="faq-subtitle">{t.faq.subtitle}</p>
            </div>
            <div className="faq-list-col">
              <div className="faq-container">
                {t.faq.items.map((faq, index) => (
                  <details key={index} className="faq-item">
                    <summary className="faq-question">
                      <div className="faq-q-left">
                        <span className="faq-num">0{index + 1}</span>
                        <span>{faq.q}</span>
                      </div>
                      <Icon icon="ph:caret-down-bold" className="faq-icon" width={16} />
                    </summary>
                    <div className="faq-answer">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
