import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogPosts } from '../lib/blogs';
import { Icon } from '@iconify/react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

export const metadata: Metadata = {
  title: 'Blog & Guides – Gemini Watermark Remover',
  description:
    'Tutorials, technical deep-dives, and guides on removing Google Gemini, Imagen 3, and Veo video watermarks with lossless mathematical precision.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'Blog & Guides – Gemini Watermark Remover',
    description:
      'Tutorials and guides on removing Google Gemini and Veo video watermarks cleanly with zero blur.',
    url: `${siteUrl}/blog`,
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Gemini Watermark Remover Blog',
    description: 'Guides and tutorials on removing AI watermarks losslessly.',
    url: `${siteUrl}/blog`,
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: '2026-08-30',
      author: {
        '@type': 'Person',
        name: post.author,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="container pb-16">
        {/* Hero Section */}
        <div className="hero-section text-center max-w-3xl mx-auto pt-10 pb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50/80 px-3 py-1 text-xs font-bold text-indigo-700 mb-4 shadow-sm">
            <Icon icon="ph:article-medium-bold" width={15} />
            <span>Articles &amp; Guides</span>
          </div>
          <h1 className="hero-title text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Gemini Watermark Remover <span className="hero-title-gradient">Blog</span>
          </h1>
          <p className="hero-description text-slate-600 text-base max-w-2xl mx-auto">
            Step-by-step guides, technical breakdowns, and best practices for creating clean, watermark-free AI images and videos.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-200 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors mb-2">
                  <a href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </a>
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {post.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">By {post.author}</span>
                <a
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  <span>Read Article</span>
                  <Icon icon="ph:arrow-right-bold" width={12} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 sm:p-12 text-center text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to clean your Gemini images and videos?</h2>
          <p className="text-sm text-indigo-100 max-w-xl mx-auto mb-6">
            100% free, runs locally inside your browser with zero blur and original audio intact.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-md hover:bg-indigo-50 hover:scale-105 transition-all"
          >
            <Icon icon="ph:sparkle-fill" width={16} />
            <span>Launch Free Remover Tool</span>
          </a>
        </div>

        <Footer />
      </main>
    </>
  );
}
