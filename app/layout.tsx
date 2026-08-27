import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  title: 'Gemini Watermark Remover - Remove Gemini Logo & Video Watermark Free',
  description:
    'Free online Gemini watermark remover to remove Gemini watermark & Google AI logo sparkles from Imagen photos and Veo videos. 100% private Gemini video watermark remover.',
  keywords:
    'gemini watermark remover, gemini logo remover, remove gemini watermark, gemini video watermark remover, gemini watermark remover video, remove google gemini logo, gemini ai watermark remover, google imagen 3 watermark remover, veo watermark remover, free gemini watermark remover online',
  robots: { index: true, follow: true },
  authors: [{ name: 'Kushal Lukhi', url: 'https://github.com/KushalLukhi' }],
  openGraph: {
    type: 'website',
    siteName: 'Gemini Watermark Remover',
    title: 'Gemini Watermark Remover - Remove Gemini Logo & Video Watermark Free',
    description:
      'Free online Gemini watermark remover to remove Gemini watermark & Google AI logo sparkles from Imagen photos and Veo videos. 100% private Gemini video watermark remover.',
    url: siteUrl,
    images: [
      {
        url: '/assets/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Gemini Watermark Remover & Gemini Video Watermark Remover Online',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemini Watermark Remover - Remove Gemini Logo & Video Watermark Free',
    description:
      'Free online Gemini watermark remover to remove Gemini watermark & Google AI logo sparkles from Imagen photos and Veo videos.',
    images: [{ url: '/assets/logo.webp', alt: 'Gemini Watermark Remover & Gemini Video Watermark Remover Online' }],
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
      '@type': 'WebApplication',
      name: 'Gemini Watermark Remover',
      alternateName: [
        'Gemini Logo Remover',
        'Gemini Video Watermark Remover',
        'Remove Gemini Watermark Online',
        'Gemini Watermark Remover Video',
      ],
      url: siteUrl,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any (Browser-based)',
      browserRequirements: 'Requires HTML5 Canvas and modern JavaScript support',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1420',
        bestRating: '5',
        worstRating: '1',
      },
      featureList: [
        '100% Client-Side Private Browser Processing',
        'Mathematical Inverse Alpha Unblending (Zero Quality Loss & No AI Blur)',
        'Automatic Watermark Position & Scale Detection',
        'Full Support for Google Imagen Photos (PNG, JPG, WebP)',
        'Gemini Video Watermark Remover for Google Veo AI Videos (MP4, WebM, MOV)',
        'Preserves Complete Original Audio Tracks on Video Exports',
        'Dual Zoomed Live Preview for Pixel-Perfect Alignment',
        'Unlimited File Processing with Zero Registration or Subscription Fees',
      ],
      author: {
        '@type': 'Person',
        name: 'Kushal Lukhi',
        url: 'https://github.com/KushalLukhi',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How to remove Gemini watermark from images and videos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To remove Gemini watermark, drag and drop your Google Imagen photo (PNG, JPG, WebP) or Veo video into the Gemini watermark remover. The tool automatically locates the watermark and mathematically inverts the alpha layer to erase the Gemini logo cleanly with zero quality loss.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the Gemini video watermark remover work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our Gemini video watermark remover processes every video frame directly inside your browser using hardware-accelerated WebCodecs. It inverts the exact mathematical alpha blending of the Gemini sparkle logo and recompresses with original audio preserved at 100% original quality.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this Gemini logo remover really free and private?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! This Gemini logo remover and video watermark remover is 100% free and unlimited. All processing happens entirely inside your local browser via client-side JavaScript, meaning your private photos and videos are never uploaded to external servers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is removing the Google Gemini watermark legal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, removing watermarks from AI-generated media for personal, educational, research, or commercial creative workflows is generally permissible under fair use principles, provided you own the rights to the underlying creative prompt and your usage complies with Google’s Terms of Service and applicable regional copyright laws.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I disable watermarks directly inside Google Gemini account settings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, on the web version of Google Gemini (gemini.google.com), you can navigate to Settings > Media watermark and toggle the visible watermark setting to "Off" for future image generations. However, this setting only applies prospectively and cannot remove watermarks from previously saved images or Veo AI videos.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a Gemini watermark remover browser extension?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You do not need to install any Chrome extension, plugin, or third-party desktop software. Our tool is a zero-install Progressive Web Application (PWA) that runs instantly in any modern web browser on desktop, iOS, and Android devices while keeping all media 100% private and local.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between the visible Gemini sparkle logo and SynthID™?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The visible watermark is the semi-transparent 4-pointed white sparkle icon overlaid in the bottom-right corner of images and Veo videos—which our tool cleans completely. Google DeepMind SynthID™ is an imperceptible, cryptographic digital watermark embedded directly into pixel noise and frequency spectrums for AI identification that has zero effect on visual picture aesthetics.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is mathematical unblending superior to AI generative inpainting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Traditional AI inpainting and object eraser tools do not understand alpha compositing—they blur out the watermark area and guess what was behind it, leading to smudgy textures, distorted faces, and lost sharpness. Mathematical unblending reverses the exact transparency formula, revealing the genuine, crisp original pixels that were captured under the watermark.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are my images and videos kept private and secure?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100%. All image and video processing is executed strictly inside your local web browser using client-side HTML5 Canvas and WebCodecs technologies. Your photos and videos are NEVER uploaded, stored, or transmitted to any external server or cloud service.',
          },
        },
        {
          '@type': 'Question',
          name: 'What image and video file formats are supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our tool supports all popular image formats (PNG, JPG/JPEG, WebP) up to 4K+ resolutions, as well as Google Veo AI video formats (MP4, WebM, MOV) with full audio track passthrough and hardware-accelerated rendering.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does this Gemini watermark remover work on mobile phones and tablets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The interface is fully responsive and optimized for mobile touchscreens across iPhone/iPad (Safari) and Android smartphones/tablets (Chrome, Firefox, Edge).',
          },
        },
        {
          '@type': 'Question',
          name: 'Will removing the watermark reduce my video or image quality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not at all. The processing is 100% lossless. Only the pixels directly covered by the semi-transparent watermark bounding box are mathematically restored; all surrounding pixels and video audio streams remain completely untouched and unaltered.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this Gemini watermark remover completely free with no limits?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, it is 100% free with unlimited usage. There are no paywalls, no monthly subscription fees, no credit card requirements, no account signups, and no secondary promotional watermarks added to your downloads.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Remove Gemini Watermark and Logo Online for Free',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Upload Your Image or Video',
          text: 'Select or drag & drop your Google Gemini generated image (PNG, JPG, WebP) or Veo 3 video (MP4, WebM, MOV) into the Gemini watermark remover dropzone.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Inspect & Fine-Tune Sliders',
          text: 'The watermark position and size scale are automatically detected. Inspect the live dual zoomed preview cards to verify pixel-perfect alignment over the 4-point sparkle logo.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Export Clean Watermark-Free File',
          text: 'Click the Export button to save your clean, lossless media file locally to your device with zero quality degradation and original audio preserved.',
        },
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
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://code.iconify.design" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
