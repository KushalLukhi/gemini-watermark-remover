import { Icon } from '@iconify/react';

const faqs = [
  { num: '01', q: 'How to remove Gemini watermark from images and videos?', a: 'To remove Gemini watermark, simply upload your Google Imagen 3 image or Veo 3 video into our free online tool above. Our tool mathematically unblends the transparent Gemini logo pixel-by-pixel, restoring 100% of your original media clarity without any blurry AI smudge.' },
  { num: '02', q: 'How does this Gemini logo remover work?', a: <span>Google Gemini embeds a transparent logo mask into generated images and Veo videos using alpha blending. Instead of guessing pixels like AI object removers, our Gemini logo remover applies the exact reverse mathematical formula <code>Original = (Watermarked - Logo * Alpha) / (1 - Alpha)</code> to unblend the watermark pixel-by-pixel with zero quality loss.</span> },
  { num: '03', q: 'Is this Gemini watermark remover completely free to use?', a: 'Yes, it is 100% free with no limits! There are no hidden subscription fees, no user registration required, no file count limits, and no secondary watermarks added to your exported files.' },
  { num: '04', q: 'Can I remove Gemini watermark from Veo 3 videos and Imagen 3 photos?', a: 'Yes! Our tool fully supports Google Gemini Imagen 3 images (PNG, JPG, WebP) and Gemini Veo 3 AI videos (MP4, WebM, MOV) with full audio preservation and GPU-accelerated WebCodecs.' },
  { num: '05', q: 'Can I turn off watermarks directly in Google Gemini settings?', a: 'Yes! On Gemini web (gemini.google.com), you can go to Settings > Media watermark and turn visible watermarks Off. However, this only applies to future image generations and cannot remove watermarks from previously saved images or Veo videos, which is why you can use our free tool.' },
  { num: '06', q: 'What is the difference between visual Gemini logo and SynthID?', a: 'Visual watermarks are the transparent 4-point sparkle logos seen in the corner of images and videos, which our tool removes cleanly. SynthID is an imperceptible cryptographic watermark embedded directly into pixel noise by Google DeepMind for AI detection that does not affect visual appearance.' },
  { num: '07', q: 'Why is mathematical watermark removal better than AI inpainting?', a: 'AI inpainting tools guess what lies beneath the watermark by blurring or smudging pixels, causing loss of detail. Mathematical alpha unblending subtracts the exact transparency values of the Gemini logo, revealing the actual sharp original pixels underneath.' },
  { num: '08', q: 'Are my images and videos kept private and secure?', a: 'Absolutely. All image and video processing is executed 100% locally inside your web browser using HTML5 Canvas and WebCodecs APIs. Your files are never uploaded, stored, or transmitted to any external server.' },
  { num: '09', q: 'What image and video file formats are supported?', a: 'We support all major formats: Images (PNG, JPG, WebP) and Videos (MP4, WebM, MOV) with instant browser downloads.' },
  { num: '10', q: 'Can I use this Gemini watermark remover on mobile phones and tablets?', a: 'Yes! The website is fully mobile-responsive and works seamlessly on smartphones and tablets across iOS (Safari) and Android (Chrome/Edge/Firefox).' },
];

export default function FaqSection() {
  return (
    <section id="faq" className="faq-section">
      <div className="faq-layout">
        <div className="faq-header-col">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Everything you need to know about our free online Gemini watermark and logo removal tool.</p>
        </div>
        <div className="faq-list-col">
          <div className="faq-container">
            {faqs.map((faq) => (
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
