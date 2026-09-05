import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/gemini-watermark-remover' : '',
  assetPrefix: isGithubActions ? '/gemini-watermark-remover/' : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? '/gemini-watermark-remover' : '',
  },
};

export default nextConfig;
