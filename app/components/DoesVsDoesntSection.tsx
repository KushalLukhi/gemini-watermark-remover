import { Icon } from '@iconify/react';

export default function DoesVsDoesntSection() {
  const doesList = [
    'Mathematically unblends transparent Gemini and Veo watermark overlays',
    'Restores 100% original background pixels with zero blur or smudging',
    'Processes all media 100% locally inside your web browser for complete privacy',
    'Preserves full original audio tracks and frame rates on video exports',
    'Automatically detects watermark size scale and corner position',
    'Provides live dual zoomed previews for sub-pixel fine-tuning',
    'Supports unlimited files with zero fees, subscriptions, or account signups',
  ];

  const doesntList = [
    'Does NOT use blurry AI generative fill or lossy inpainting algorithms',
    'Does NOT upload or transmit your private photos/videos to any remote server',
    'Does NOT strip or alter Google DeepMind SynthID™ cryptographic metadata',
    'Does NOT compress or degrade the original resolution or bitrate of your media',
    'Does NOT inject any secondary watermarks, logos, or advertising into exported files',
    'Does NOT require software installations, plugins, or browser extensions',
    'Does NOT impose daily file limits or throttle download speeds',
  ];

  return (
    <section id="what-it-does" className="info-section">
      <div className="section-header">
        <div className="section-badge">
          <Icon icon="ph:scales-bold" width={14} />
          <span>Transparency &amp; Trust</span>
        </div>
        <h2 className="section-title">What This Tool Does vs. What It Doesn&apos;t Do</h2>
        <p className="section-subtitle">
          We believe in complete transparency about our technology, privacy boundaries, and operational capabilities.
        </p>
      </div>

      <div className="does-grid">
        {/* What it DOES */}
        <div className="does-card does-card-yes">
          <div className="does-card-header">
            <div className="does-header-icon-box yes">
              <Icon icon="ph:check-bold" width={20} />
            </div>
            <div>
              <h3 className="does-card-title text-emerald-900">What This Tool DOES</h3>
              <p className="does-card-subtitle">Capabilities &amp; Guarantees</p>
            </div>
          </div>
          <ul className="does-list">
            {doesList.map((item, i) => (
              <li key={i} className="does-list-item">
                <Icon icon="ph:check-circle-fill" width={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What it DOES NOT DO */}
        <div className="does-card does-card-no">
          <div className="does-card-header">
            <div className="does-header-icon-box no">
              <Icon icon="ph:x-bold" width={20} />
            </div>
            <div>
              <h3 className="does-card-title text-rose-900">What This Tool DOES NOT DO</h3>
              <p className="does-card-subtitle">Boundaries &amp; Privacy Protections</p>
            </div>
          </div>
          <ul className="does-list">
            {doesntList.map((item, i) => (
              <li key={i} className="does-list-item">
                <Icon icon="ph:x-circle-fill" width={18} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
