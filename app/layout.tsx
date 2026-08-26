import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadataBase = new URL('https://ishara-madu.github.io/gemini-watermark-remover/');

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ishara-madu.github.io/gemini-watermark-remover/'),
  title: 'Free Gemini Watermark Remover Online | Remove Gemini Watermark & Logo 100% Free',
  description:
    'Free online Gemini watermark remover. Easily remove Gemini watermark and Google AI logo sparkles from Imagen 3 photos and Veo 3 videos online with zero quality loss. 100% private, client-side, and unlimited.',
  keywords:
    'gemini watermark remover, remove gemini watermark, gemini logo remover, remove google gemini logo, free gemini watermark remover online, gemini ai watermark remover, google imagen 3 watermark remover, veo 3 watermark remover, remove veo watermark, synthid vs gemini watermark',
  robots: { index: true, follow: true },
  authors: [{ name: 'Ishara M.', url: 'https://ishara-madu.github.io/' }],
  openGraph: {
    type: 'website',
    siteName: 'Gemini Watermark Remover',
    title: 'Free Gemini Watermark Remover Online | Remove Gemini Watermark & Logo 100% Free',
    description:
      'Free online Gemini watermark remover. Easily remove Gemini watermark and Google AI logo sparkles from Imagen 3 photos and Veo 3 videos online with zero quality loss. 100% private & client-side.',
    url: 'https://ishara-madu.github.io/gemini-watermark-remover/',
    images: [
      {
        url: '/assets/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Free Gemini Watermark Remover & Google AI Logo Remover Online',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Gemini Watermark Remover Online | Remove Gemini Watermark & Logo 100% Free',
    description:
      'Free online Gemini watermark remover. Easily remove Gemini watermark and Google AI logo sparkles from Imagen 3 photos and Veo 3 videos online with zero quality loss.',
    images: [{ url: '/assets/logo.webp', alt: 'Free Gemini Watermark Remover & Google AI Logo Remover Online' }],
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
      url: 'https://ishara-madu.github.io/gemini-watermark-remover/',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any (Browser-based)',
      browserRequirements: 'Requires HTML5 Canvas and modern JavaScript support',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList: [
        '100% Client-Side Private Browser Processing',
        'Mathematical Inverse Alpha Unblending (Zero Quality Loss & No AI Blur)',
        'Automatic Watermark Position & Scale Detection',
        'Full Support for Google Imagen 3 Photos (PNG, JPG, WebP)',
        'Full Support for Google Veo 3 AI Videos (MP4, WebM, MOV)',
        'Preserves Complete Original Audio Tracks on Video Exports',
        'Dual Zoomed Live Preview for Pixel-Perfect Alignment',
        'Unlimited File Processing with Zero Registration or Subscription Fees',
      ],
      author: {
        '@type': 'Person',
        name: 'Ishara M.',
        url: 'https://ishara-madu.github.io/',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How to remove the Gemini watermark from images and videos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To remove the Gemini watermark, simply drag and drop your Google Imagen 3 image (PNG, JPG, WebP) or Veo 3 video (MP4, WebM, MOV) into the free online tool. The application automatically detects the watermark location and mathematically unblends the transparent 4-point sparkle logo pixel-by-pixel, restoring 100% of your authentic background with zero blur or quality degradation.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does this Gemini logo remover work mathematically?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Google Gemini composites its transparent watermark onto images and videos using linear alpha blending: Watermarked = Background × (1 - α) + Logo × α. Rather than hallucinating pixels with AI inpainting, our tool performs exact inverse arithmetic: Background = (Watermarked - Logo × α) / (1 - α). This subtracts the white logo layer with bit-for-bit mathematical precision.',
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
