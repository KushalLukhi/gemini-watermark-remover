import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadataBase = new URL('https://ishara-madu.github.io/gemini-watermark-remover/');

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ishara-madu.github.io/gemini-watermark-remover/'),
  title: 'Gemini Watermark Remover | Remove Gemini Watermark & Logo Online Free',
  description:
    '100% free Gemini watermark remover. Easily remove Gemini watermark and Google AI logo sparkles from Imagen 3 photos and Veo 3 videos online with zero quality loss.',
  keywords:
    'gemini watermark remover, remove gemini watermark, gemini logo remover, remove google gemini logo, free gemini watermark remover online, gemini ai watermark remover, google imagen 3 watermark remover, veo 3 watermark remover',
  robots: { index: true, follow: true },
  authors: [{ name: 'Ishara M.' }],
  openGraph: {
    type: 'website',
    siteName: 'Gemini Watermark Remover',
    title: 'Gemini Watermark Remover | Remove Gemini Watermark & Logo Online Free',
    description:
      '100% free Gemini watermark remover. Easily remove Gemini watermark and Google AI logo sparkles from Imagen 3 photos and Veo 3 videos online with zero quality loss.',
    url: 'https://ishara-madu.github.io/gemini-watermark-remover/',
    images: [{ url: '/assets/logo.webp', width: 1200, height: 630, alt: 'Free Gemini Watermark Remover & Gemini Logo Remover Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemini Watermark Remover | Remove Gemini Watermark & Logo Online Free',
    description:
      '100% free Gemini watermark remover. Easily remove Gemini watermark and Google AI logo sparkles from Imagen 3 photos and Veo 3 videos online with zero quality loss.',
    images: [{ url: '/assets/logo.webp', alt: 'Free Gemini Watermark Remover & Gemini Logo Remover Online' }],
  },
  icons: {
    icon: [
      { url: '/assets/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/assets/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
  manifest: '/assets/site.webmanifest',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Gemini Watermark Remover',
      url: 'https://ishara-madu.github.io/gemini-watermark-remover/',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All, Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        '100% Client-Side Private Processing',
        'Mathematical Alpha Unblending (Zero Quality Loss & No Blur)',
        'Remove Gemini Watermark & Logo from Images (PNG, JPG, WebP)',
        'Remove Gemini Veo 3 AI Video Watermarks (MP4, WebM, MOV)',
        'Real-time Live Tuner with Dual Zoomed Previews',
        'Audio Track Preservation on Video Processing',
      ],
      author: { '@type': 'Person', name: 'Ishara M.', url: 'https://ishara-madu.github.io/' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How to remove Gemini watermark from images and videos?', acceptedAnswer: { '@type': 'Answer', text: 'Upload your Google Imagen 3 image or Veo 3 video into our free online tool. Our tool mathematically unblends the transparent Gemini logo pixel-by-pixel, restoring 100% of your original media clarity without any blurry AI smudge.' } },
        { '@type': 'Question', name: 'How does this Gemini logo remover work?', acceptedAnswer: { '@type': 'Answer', text: 'Google Gemini embeds a transparent logo mask using alpha blending. Our Gemini logo remover applies the exact reverse mathematical formula Original = (Watermarked - Logo * Alpha) / (1 - Alpha) to unblend the watermark pixel-by-pixel with zero quality loss.' } },
        { '@type': 'Question', name: 'Is this Gemini watermark remover completely free to use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, it is 100% free with no limits! No hidden subscription fees, no user registration required, no file count limits, and no secondary watermarks added to your exported files.' } },
        { '@type': 'Question', name: 'Are my images and videos kept private and secure?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. All image and video processing is executed 100% locally inside your web browser using HTML5 Canvas and WebCodecs APIs. Your files are never uploaded, stored, or transmitted to any external server.' } },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Remove Gemini Watermark and Logo Online',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Upload Media', text: 'Select or drag & drop your Google Gemini generated image (PNG, JPG, WebP) or Veo 3 video (MP4, WebM, MOV) into the Gemini watermark remover tool.' },
        { '@type': 'HowToStep', position: 2, name: 'Adjust & Align', text: 'Fine-tune the strength, size scale, and position sliders. Use the dual zoomed preview corners for pixel-perfect alignment over the Gemini logo.' },
        { '@type': 'HowToStep', position: 3, name: 'Export Clean Media', text: 'Click Remove & Export to generate your watermark-free file locally in your browser with zero quality loss.' },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://code.iconify.design" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
