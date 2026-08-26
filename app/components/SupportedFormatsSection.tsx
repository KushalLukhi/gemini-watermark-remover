import { Icon } from '@iconify/react';

export default function SupportedFormatsSection() {
  const formats = [
    {
      type: 'PNG Image',
      ext: '.png',
      model: 'Google Imagen 3 / Gemini Pro',
      resolution: 'Up to 4K+ (e.g. 1536×1536, 2048×2048)',
      speed: '< 0.1s (Instant)',
      features: 'Lossless RGBA 24-bit/32-bit unblending',
      icon: 'ph:file-png-bold',
      badge: 'Most Popular',
    },
    {
      type: 'JPEG / JPG Image',
      ext: '.jpg, .jpeg',
      model: 'Google Gemini Web / Mobile',
      resolution: 'Standard HD & Custom Aspect Ratios',
      speed: '< 0.1s (Instant)',
      features: 'Preserves original color profile & metadata',
      icon: 'ph:file-jpg-bold',
      badge: 'Fully Supported',
    },
    {
      type: 'WebP Image',
      ext: '.webp',
      model: 'Imagen 3 Web Output',
      resolution: 'Standard & High Resolution',
      speed: '< 0.1s (Instant)',
      features: 'Full transparency & lossless compression',
      icon: 'ph:image-square-bold',
      badge: 'Fully Supported',
    },
    {
      type: 'MP4 Video',
      ext: '.mp4',
      model: 'Google Veo / Veo 3 Video AI',
      resolution: '720p HD, 1080p Full HD, 4K UHD',
      speed: 'Real-time GPU WebCodecs',
      features: 'Full AAC audio track preservation',
      icon: 'ph:video-camera-bold',
      badge: 'Veo Optimized',
    },
    {
      type: 'WebM Video',
      ext: '.webm',
      model: 'Google AI Studio Video Clips',
      resolution: 'Up to 60 FPS',
      speed: 'Hardware-Accelerated',
      features: 'VP8 / VP9 codec support with audio passthrough',
      icon: 'ph:film-slate-bold',
      badge: 'Fully Supported',
    },
    {
      type: 'MOV Video',
      ext: '.mov',
      model: 'Apple QuickTime / iOS AI Exports',
      resolution: 'All standard frame dimensions',
      speed: 'Hardware-Accelerated',
      features: 'Native browser demuxing & MP4 export',
      icon: 'ph:play-circle-bold',
      badge: 'Fully Supported',
    },
  ];

  return (
    <section id="supported-formats" className="info-section">
      <div className="section-header">
        <div className="section-badge">
          <Icon icon="ph:file-arrow-up-bold" width={14} />
          <span>Universal Compatibility</span>
        </div>
        <h2 className="section-title">Supported Image &amp; Video Formats</h2>
        <p className="section-subtitle">
          Engineered for full compatibility across all Google AI generation platforms, export resolutions, and media types.
        </p>
      </div>

      <div className="formats-table-wrapper">
        <table className="formats-table" aria-label="Supported Media Formats Table">
          <thead>
            <tr>
              <th scope="col">Format</th>
              <th scope="col">Source AI Model</th>
              <th scope="col">Max Resolution</th>
              <th scope="col">Processing Speed</th>
              <th scope="col">Key Capabilities</th>
            </tr>
          </thead>
          <tbody>
            {formats.map((f, i) => (
              <tr key={i}>
                <td className="format-name-cell">
                  <div className="format-item-wrap">
                    <Icon icon={f.icon} width={22} className="text-indigo-600 flex-shrink-0" />
                    <div>
                      <div className="format-title-row">
                        <strong className="format-title">{f.type}</strong>
                        <span className="format-ext-pill">{f.ext}</span>
                      </div>
                      <span className="format-badge-mini">{f.badge}</span>
                    </div>
                  </div>
                </td>
                <td className="format-cell-muted">{f.model}</td>
                <td className="format-cell-highlight">{f.resolution}</td>
                <td className="format-cell-speed">
                  <span className="speed-pill">
                    <Icon icon="ph:lightning-fill" width={12} className="text-amber-500" />
                    {f.speed}
                  </span>
                </td>
                <td className="format-cell-desc">{f.features}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
