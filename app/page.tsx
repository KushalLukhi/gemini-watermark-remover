'use client';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UnifiedRemover from './components/UnifiedRemover';
import HowItWorks from './components/HowItWorks';
import ComparisonSection from './components/ComparisonSection';
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
        <UnifiedRemover />
        <HowItWorks />
        <ComparisonSection />
        <GuideSection />
        <FeaturesSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  );
}
