import type { Metadata } from 'next';
import Header from '../components/Header';
import UnifiedRemover from '../components/UnifiedRemover';
import TrustStrip from '../components/TrustStrip';
import Footer from '../components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'Gemini Video Watermark Remover – Free Veo & Omni Flash Tool',
  description:
    'Remove watermarks from Google Gemini, Veo 3, and Omni Flash AI videos frame-by-frame. Preserves original audio, zero blur, 100% client-side privacy.',
  alternates: {
    canonical: `${siteUrl}/gemini-video-watermark-remover`,
  },
  openGraph: {
    title: 'Gemini Video Watermark Remover – Free Veo & Omni Flash Tool',
    description:
      'Remove watermarks from Google Gemini, Veo 3, and Omni Flash AI videos frame-by-frame. Preserves original audio, zero blur, 100% client-side privacy.',
    url: `${siteUrl}/gemini-video-watermark-remover`,
  },
};

export default function GeminiVideoWatermarkRemoverPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Gemini Video Watermark Remover',
        url: `${siteUrl}/gemini-video-watermark-remover`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Remove Gemini, Veo, and Omni Flash video watermarks frame-by-frame directly in your browser with original audio preserved and zero quality loss.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Gemini Video Watermark Remover',
            item: `${siteUrl}/gemini-video-watermark-remover`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Does this video remover support Google Veo 3 and Omni Flash videos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. It supports all Google AI video outputs including Veo 3, Omni Flash, and Google Flow in MP4, WebM, and MOV formats up to 4K resolution.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will the video lose audio or quality during watermark removal?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The original audio track (AAC, Opus, or other codecs) is extracted and re-multiplexed into the final video without re-encoding. Only the small watermark overlay area is processed.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does frame-by-frame video processing work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The video is decoded locally using the WebCodecs API with hardware acceleration. Each frame is individually processed to remove the watermark overlay, then re-encoded into the output file. The audio track is passthrough without re-encoding.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there a file size or duration limit for videos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Since all processing happens locally in your browser, there are no server-imposed limits. We recommend videos under 500MB for optimal browser performance. Processing speed depends on your device hardware.',
            },
          },
        ],
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
        <div className="hero-section">
          <h1 className="hero-title">
            Gemini <span className="hero-title-gradient">Video Watermark Remover</span>
          </h1>
          <p className="hero-description">
            Remove watermarks from <strong>Google Veo, Omni Flash, and Gemini AI videos</strong> frame-by-frame
            in your browser. Preserves original audio tracks, color grading, and full resolution.
          </p>
        </div>

        <TrustStrip />
        <UnifiedRemover />

        {/* Video-Specific Technical Explanation */}
        <section className="info-section">
          <div className="section-header">
            <h2 className="section-title">How Video Watermark Removal Works</h2>
            <p className="section-subtitle">
              Frame-by-frame processing with hardware-accelerated WebCodecs and original audio passthrough.
            </p>
          </div>

          <div className="info-cards-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="info-card">
              <h3 className="info-card-title">Frame-by-Frame Demuxing</h3>
              <p className="info-card-text">
                Your video is decoded locally frame-by-frame using the browser&apos;s WebCodecs API
                with hardware acceleration. The watermark coordinates are tracked consistently
                across every individual frame for precise removal.
              </p>
            </div>

            <div className="info-card">
              <h3 className="info-card-title">Original Audio Passthrough</h3>
              <p className="info-card-text">
                The audio track (AAC, Opus, or other codecs) is extracted from the container and
                re-multiplexed into the output file without any re-encoding. This preserves 100%
                of the original audio quality, including voice-over, music, and sound effects.
              </p>
            </div>

            <div className="info-card">
              <h3 className="info-card-title">Supported AI Video Models</h3>
              <p className="info-card-text">
                Works with videos generated by Google Veo, Veo 3, Omni Flash, and Google Flow.
                All of these models apply the same semi-transparent Gemini sparkle watermark overlay,
                which this tool removes using inverse alpha unblending.
              </p>
            </div>
          </div>
        </section>

        {/* Video FAQ */}
        <section className="faq-section">
          <div className="faq-layout">
            <div className="faq-header-col">
              <h2 className="faq-title">Video Watermark Remover FAQ</h2>
            </div>
            <div className="faq-list-col">
              <div className="faq-container">
                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">01</span>
                      <span>What video formats are supported?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    MP4, WebM, and MOV formats at resolutions up to 4K UHD. MP4 (H.264/H.265) is the
                    most common format for Veo and Omni Flash outputs.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">02</span>
                      <span>Does this support Google Veo 3 and Omni Flash?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    Yes. Google Veo, Veo 3, Omni Flash, and Google Flow all apply the same Gemini sparkle
                    watermark overlay. This tool removes it from all of these video sources.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">03</span>
                      <span>Will my video lose audio quality?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    No. The original audio track is extracted and re-multiplexed without re-encoding.
                    There is zero audio quality loss.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">04</span>
                      <span>Is there a video file size limit?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    There are no server-imposed limits since processing happens entirely in your browser.
                    We recommend videos under 500MB for optimal browser performance. Processing speed
                    depends on your device&apos;s CPU and GPU capabilities.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <div className="faq-q-left">
                      <span className="faq-num">05</span>
                      <span>How long does video processing take?</span>
                    </div>
                  </summary>
                  <div className="faq-answer">
                    Processing speed depends on the video length, resolution, and your device hardware.
                    A 10-second 1080p video typically processes in 5-15 seconds on a modern device
                    with hardware-accelerated WebCodecs support.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
