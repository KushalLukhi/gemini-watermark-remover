import { Icon } from '@iconify/react';

export default function SynthIdComparison() {
  const comparisonRows = [
    {
      feature: 'Visibility',
      visibleLogo: 'Semi-transparent white sparkle in corner',
      synthId: 'Completely invisible to human eyes',
      icon: 'ph:eye-bold',
    },
    {
      feature: 'Primary Purpose',
      visibleLogo: 'Visual consumer attribution & branding',
      synthId: 'Cryptographic AI provenance & safety tracking',
      icon: 'ph:target-bold',
    },
    {
      feature: 'Embedding Layer',
      visibleLogo: 'Alpha channel overlay on top pixels',
      synthId: 'Interleaved digital signal in pixel/audio noise',
      icon: 'ph:layers-bold',
    },
    {
      feature: 'Removal Method',
      visibleLogo: 'Lossless reverse mathematical unblending',
      synthId: 'Requires specialized signal-level filtering',
      icon: 'ph:eraser-bold',
    },
    {
      feature: 'Visual Aesthetic Impact',
      visibleLogo: 'Causes visual distraction on final media',
      synthId: 'Zero impact on color, sharpness, or clarity',
      icon: 'ph:image-square-bold',
    },
    {
      feature: 'Tool Action',
      visibleLogo: '✅ 100% cleanly removed by this tool',
      synthId: '🔒 Preserved without corruption',
      icon: 'ph:check-circle-bold',
    },
  ];

  return (
    <section id="synthid-comparison" className="info-section">
      <div className="section-header">
        <div className="section-badge">
          <Icon icon="ph:fingerprint-bold" width={14} />
          <span>Technology Deep Dive</span>
        </div>
        <h2 className="section-title">Visible Gemini Logo vs. Google SynthID™</h2>
        <p className="section-subtitle">
          Google applies two distinct layers of identification to AI-generated media. Understand the critical differences below.
        </p>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table" aria-label="Visible Gemini Logo vs SynthID Comparison">
          <thead>
            <tr>
              <th scope="col" style={{ width: '25%' }}>Feature</th>
              <th scope="col" style={{ width: '37.5%' }}>
                <div className="th-header-cell">
                  <Icon icon="ph:sparkle-bold" width={18} className="text-indigo-600" />
                  <span>Visible Gemini Logo</span>
                </div>
              </th>
              <th scope="col" style={{ width: '37.5%' }}>
                <div className="th-header-cell">
                  <Icon icon="ph:fingerprint-bold" width={18} className="text-blue-600" />
                  <span>Google DeepMind SynthID™</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={i}>
                <td className="feature-cell">
                  <Icon icon={row.icon} width={16} className="feature-icon" />
                  <span>{row.feature}</span>
                </td>
                <td className="visible-cell">{row.visibleLogo}</td>
                <td className="synthid-cell">{row.synthId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
