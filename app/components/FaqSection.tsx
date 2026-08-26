import { Icon } from '@iconify/react';

export const faqsData = [
  {
    num: '01',
    q: 'How to remove the Gemini watermark from images and videos?',
    a: 'To remove the Gemini watermark, simply drag and drop your Google Imagen 3 image (PNG, JPG, WebP) or Veo 3 video (MP4, WebM, MOV) into the free online tool above. The application automatically detects the watermark location and mathematically unblends the transparent 4-point sparkle logo pixel-by-pixel, restoring 100% of your authentic background with zero blur or quality degradation.',
  },
  {
    num: '02',
    q: 'How does this Gemini logo remover work mathematically?',
    a: (
      <span>
        Google Gemini composites its transparent watermark onto images and videos using linear alpha blending: <code>Watermarked = Background × (1 - α) + Logo × α</code>. Rather than hallucinating pixels with AI inpainting, our tool performs exact inverse arithmetic: <code>Background = (Watermarked - Logo × α) / (1 - α)</code>. This subtracts the white logo layer with bit-for-bit mathematical precision.
      </span>
    ),
  },
  {
    num: '03',
    q: 'Is removing the Google Gemini watermark legal?',
    a: 'Yes, removing watermarks from AI-generated media for personal, educational, research, or commercial creative workflows is generally permissible under fair use principles, provided you own the rights to the underlying creative prompt and your usage complies with Google’s Terms of Service and applicable regional copyright laws.',
  },
  {
    num: '04',
    q: 'Can I disable watermarks directly inside Google Gemini account settings?',
    a: 'Yes, on the web version of Google Gemini (gemini.google.com), you can navigate to Settings > Media watermark and toggle the visible watermark setting to "Off" for future image generations. However, this setting only applies prospectively and cannot remove watermarks from previously saved images or Veo AI videos, which is why our tool is indispensable for cleaning existing media.',
  },
  {
    num: '05',
    q: 'Is there a Gemini watermark remover browser extension?',
    a: 'You do not need to install any Chrome extension, plugin, or third-party desktop software. Our tool is a zero-install Progressive Web Application (PWA) that runs instantly in any modern web browser on desktop, iOS, and Android devices while keeping all media 100% private and local.',
  },
  {
    num: '06',
    q: 'What is the difference between the visible Gemini sparkle logo and SynthID™?',
    a: 'The visible watermark is the semi-transparent 4-pointed white sparkle icon overlaid in the bottom-right corner of images and Veo videos—which our tool cleans completely. Google DeepMind SynthID™ is an imperceptible, cryptographic digital watermark embedded directly into pixel noise and frequency spectrums for AI identification that has zero effect on visual picture aesthetics.',
  },
  {
    num: '07',
    q: 'Why is mathematical unblending superior to AI generative inpainting?',
    a: 'Traditional AI inpainting and object eraser tools do not understand alpha compositing—they blur out the watermark area and guess what was behind it, leading to smudgy textures, distorted faces, and lost sharpness. Mathematical unblending reverses the exact transparency formula, revealing the genuine, crisp original pixels that were captured under the watermark.',
  },
  {
    num: '08',
    q: 'Are my images and videos kept private and secure?',
    a: 'Yes, 100%. All image and video processing is executed strictly inside your local web browser using client-side HTML5 Canvas and WebCodecs technologies. Your photos and videos are NEVER uploaded, stored, or transmitted to any external server or cloud service.',
  },
  {
    num: '09',
    q: 'What image and video file formats are supported?',
    a: 'Our tool supports all popular image formats (PNG, JPG/JPEG, WebP) up to 4K+ resolutions, as well as Google Veo AI video formats (MP4, WebM, MOV) with full audio track passthrough and hardware-accelerated rendering.',
  },
  {
    num: '10',
    q: 'Does this Gemini watermark remover work on mobile phones and tablets?',
    a: 'Yes! The interface is fully responsive and optimized for mobile touchscreens across iPhone/iPad (Safari) and Android smartphones/tablets (Chrome, Firefox, Edge).',
  },
  {
    num: '11',
    q: 'Will removing the watermark reduce my video or image quality?',
    a: 'Not at all. The processing is 100% lossless. Only the pixels directly covered by the semi-transparent watermark bounding box are mathematically restored; all surrounding pixels and video audio streams remain completely untouched and unaltered.',
  },
  {
    num: '12',
    q: 'Is this Gemini watermark remover completely free with no limits?',
    a: 'Yes, it is 100% free with unlimited usage. There are no paywalls, no monthly subscription fees, no credit card requirements, no account signups, and no secondary promotional watermarks added to your downloads.',
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="faq-section">
      <div className="faq-layout">
        <div className="faq-header-col">
          <div className="section-badge">
            <Icon icon="ph:question-bold" width={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about our free online Gemini watermark and logo removal tool, technology, privacy, and supported formats.
          </p>
        </div>
        <div className="faq-list-col">
          <div className="faq-container">
            {faqsData.map((faq) => (
              <details key={faq.num} className="faq-item">
                <summary className="faq-question">
                  <div className="faq-q-left">
                    <span className="faq-num">{faq.num}</span>
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
  );
}
