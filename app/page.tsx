'use client';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TrustStrip from './components/TrustStrip';
import UnifiedRemover from './components/UnifiedRemover';
import HowItWorks from './components/HowItWorks';
import WhatIsGeminiWatermark from './components/WhatIsGeminiWatermark';
import ComparisonSection from './components/ComparisonSection';
import SynthIdComparison from './components/SynthIdComparison';
import WhoUsesSection from './components/WhoUsesSection';
import DoesVsDoesntSection from './components/DoesVsDoesntSection';
import SupportedFormatsSection from './components/SupportedFormatsSection';
import BestPracticesSection from './components/BestPracticesSection';
import GuideSection from './components/GuideSection';
import FeaturesSection from './components/FeaturesSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container">
        <HeroSection />
        <TrustStrip />
        <UnifiedRemover />
        <HowItWorks />
        <WhatIsGeminiWatermark />
        <ComparisonSection />
        <SynthIdComparison />
        <WhoUsesSection />
        <DoesVsDoesntSection />
        <SupportedFormatsSection />
        <BestPracticesSection />
        <GuideSection />
        <FeaturesSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  );
}
