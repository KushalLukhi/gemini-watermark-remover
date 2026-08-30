import type { Metadata } from 'next';
import LocalizedLandingPage from '../components/LocalizedLandingPage';
import { translations } from '../lib/translations';

const t = translations.pt;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  keywords: t.meta.keywords,
  alternates: {
    canonical: `${siteUrl}/pt`,
    languages: {
      'en': '/',
      'es': '/es',
      'ja': '/ja',
      'zh': '/zh',
      'pt': '/pt',
      'de': '/de',
      'fr': '/fr',
      'x-default': '/',
    },
  },
  openGraph: {
    title: t.meta.ogTitle,
    description: t.meta.ogDescription,
    url: `${siteUrl}/pt`,
  },
};

export default function PortugueseHomePage() {
  return <LocalizedLandingPage locale="pt" />;
}
