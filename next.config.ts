import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ishara-madu.github.io' },
      { protocol: 'https', hostname: 'www.google.com' },
    ],
  },
  // Allow external ESM CDN imports (mediabunny) at runtime in the browser
  // These are dynamic imports inside client components only
  experimental: {
    // externalDir: true is not needed for CDN imports
  },
};

export default nextConfig;
