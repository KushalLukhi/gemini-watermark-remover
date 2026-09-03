import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export interface BlogPost {
  slug: string;
  filename: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  keywords: string[];
  contentHtml: string;
}

interface BlogMeta {
  slug: string;
  filename: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  keywords: string[];
}

export const blogMetadata: BlogMeta[] = [
  {
    slug: 'how-to-remove-gemini-watermark',
    filename: 'blog-01-how-to-remove-gemini-watermark.md',
    title: 'How to Remove the Gemini Watermark from AI Images and Videos (Free & Zero Blur)',
    description: 'Learn how to remove the visible 4-point sparkle logo from Google Gemini and Veo media using lossless mathematical unblending with zero blur.',
    category: 'Tutorials',
    readTime: '6 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['how to remove gemini watermark', 'remove gemini watermark free', 'gemini logo remover', 'google ai watermark remover'],
  },
  {
    slug: 'gemini-video-watermark-remover-guide',
    filename: 'blog-02-gemini-video-watermark-remover-guide.md',
    title: 'How to Remove Google Veo AI Video Watermarks (With Original Audio Preserved)',
    description: 'A complete guide for video editors on cleaning Google Veo video watermarks frame-by-frame with WebCodecs and 100% audio passthrough.',
    category: 'Video',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['gemini video watermark remover', 'google veo watermark remover', 'veo video watermark cleaner', 'remove watermark ai video audio'],
  },
  {
    slug: 'gemini-watermark-vs-synthid',
    filename: 'blog-03-gemini-watermark-vs-synthid.md',
    title: 'Visible Gemini Watermark vs. Google DeepMind SynthID™: The Key Differences',
    description: 'Understand the critical differences between the cosmetic 4-point sparkle logo and Google DeepMind\'s invisible cryptographic SynthID provenance.',
    category: 'Technical',
    readTime: '6 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['gemini watermark vs synthid', 'google synthid explained', 'can you remove synthid', 'how does google watermark ai'],
  },
  {
    slug: 'nano-banana-watermark-remover',
    filename: 'blog-04-nano-banana-watermark-remover.md',
    title: 'How to Remove Nano Banana & Star Overlay Watermarks from Gemini Images Online',
    description: 'Learn how to remove the Nano Banana watermark variant and custom star overlays from Google Gemini generations cleanly with zero blur.',
    category: 'Guides',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['nano banana watermark remover', 'remove nano banana watermark', 'gemini star overlay watermark'],
  },
  {
    slug: 'google-imagen-3-watermark-remover',
    filename: 'blog-05-google-imagen-3-watermark-remover.md',
    title: 'How to Clean Watermarks from Google Imagen 3 Artwork Losslessly',
    description: 'A deep dive into Google Imagen 3 alpha compositing and how to export clean, watermark-free 4K artwork with lossless color depth.',
    category: 'Guides',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['google imagen 3 watermark remover', 'remove imagen 3 watermark', 'clean imagen 3 photos'],
  },
  {
    slug: 'ai-video-watermark-removal-veo-vs-others',
    filename: 'blog-06-ai-video-watermark-removal-veo-vs-others.md',
    title: 'Removing Watermarks from AI Videos: Google Veo, Runway, and Sora Compared',
    description: 'Comparing watermark techniques across leading generative video platforms and why Veo clips can be cleaned with zero audio loss.',
    category: 'Video',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['remove watermark from ai video free', 'veo vs runway vs sora', 'ai video watermark cleaner'],
  },
  {
    slug: 'how-to-turn-off-gemini-watermark-settings',
    filename: 'blog-07-how-to-turn-off-gemini-watermark-settings.md',
    title: 'Can You Turn Off the Gemini Watermark in Google Settings? (Complete Walkthrough)',
    description: 'Step-by-step tutorial on disabling visible watermarks natively in Google Gemini account settings, and what to do for existing media.',
    category: 'Tutorials',
    readTime: '4 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['how to turn off gemini watermark in settings', 'disable gemini watermark', 'gemini settings media watermark'],
  },
  {
    slug: 'is-it-legal-to-remove-gemini-watermark',
    filename: 'blog-08-is-it-legal-to-remove-gemini-watermark.md',
    title: 'Can You Use Gemini Images Commercially Without the Watermark? (Legal & Ethics Guide)',
    description: 'An analysis of Google Terms of Service, copyright fair use, and best practices for commercial use of AI-generated content.',
    category: 'Legal',
    readTime: '6 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['is it legal to remove gemini watermark', 'gemini images commercial use', 'google gemini copyright terms'],
  },
  {
    slug: 'remove-gemini-watermark-iphone-android',
    filename: 'blog-09-remove-gemini-watermark-iphone-android.md',
    title: 'How to Remove the Gemini Watermark on Mobile (iPhone & Android)',
    description: 'How to clean Gemini photos and Veo videos directly in Safari or Chrome on mobile devices without installing shady apps.',
    category: 'Mobile',
    readTime: '4 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['remove gemini watermark on iphone android', 'remove gemini watermark mobile', 'gemini watermark remover phone'],
  },
  {
    slug: 'why-generative-inpainting-fails-math-unblending',
    filename: 'blog-10-why-generative-inpainting-fails-math-unblending.md',
    title: 'Why Generative Inpainting Fails on Gemini Watermarks (And Why Math Wins)',
    description: 'A technical deep-dive into stochastic neural inpainting versus deterministic inverse alpha unblending for semi-transparent synthetic watermarks.',
    category: 'Technical',
    readTime: '7 min read',
    date: 'September 2026',
    author: 'Kushal Lukhi',
    keywords: ['why ai watermark removers blur', 'inverse alpha blending watermark', 'lossless watermark removal math'],
  },
];

function getBlogContentHtml(filename: string): string {
  try {
    const filePath = path.join(process.cwd(), 'blogs', filename);
    if (!fs.existsSync(filePath)) {
      return '<p>Article content coming soon.</p>';
    }
    const rawMarkdown = fs.readFileSync(filePath, 'utf-8');
    // Remove initial H1 if duplicate with page title
    const cleanedMarkdown = rawMarkdown.replace(/^#\s+[^\n]+\n+/, '');
    return marked.parse(cleanedMarkdown) as string;
  } catch (err) {
    console.error(`Error loading blog ${filename}:`, err);
    return '<p>Error loading article content.</p>';
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return blogMetadata.map((meta) => ({
    ...meta,
    contentHtml: getBlogContentHtml(meta.filename),
  }));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const meta = blogMetadata.find((b) => b.slug === slug);
  if (!meta) return undefined;
  return {
    ...meta,
    contentHtml: getBlogContentHtml(meta.filename),
  };
}

// Pre-computed array of all blog posts with full HTML content
export const blogPosts: BlogPost[] = getAllBlogPosts();
