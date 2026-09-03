import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { blogPosts } from '../../lib/blogs';
import { Icon } from '@iconify/react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geminiremove.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} – Gemini Watermark Remover`,
    description: post.description,
    keywords: post.keywords.join(', '),
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
    },
  };
}

export default async function SingleBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: `${siteUrl}/blog/${post.slug}`,
        datePublished: '2026-08-30',
        author: {
          '@type': 'Person',
          name: post.author,
          url: 'https://github.com/KushalLukhi',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Gemini Watermark Remover',
          url: siteUrl,
        },
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
            name: 'Blog',
            item: `${siteUrl}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `${siteUrl}/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="container pb-16">
        {/* Breadcrumbs */}
        <nav className="max-w-3xl mx-auto pt-6 px-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
          <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
          <span>/</span>
          <a href="/blog" className="hover:text-indigo-600 transition-colors">Blog</a>
          <span>/</span>
          <span className="text-slate-800 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="max-w-3xl mx-auto px-4 pt-8 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">• {post.readTime}</span>
            <span className="text-xs text-slate-400 font-medium">• {post.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            {post.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span>Written by {post.author}</span>
          </div>
        </header>

        {/* Article Content */}
        <article
          className="blog-prose max-w-3xl mx-auto px-4 py-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* In-Article CTA */}
        <div className="max-w-3xl mx-auto my-8 p-6 sm:p-8 rounded-3xl bg-indigo-50/80 border border-indigo-200/90 text-center shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Want to remove a Gemini or Veo watermark right now?</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            Try our free in-browser tool with zero blur, original audio passthrough, and 100% privacy.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow hover:bg-indigo-700 transition-all"
          >
            <Icon icon="ph:sparkle-fill" width={15} />
            <span>Use Free Tool Online</span>
          </a>
        </div>

        {/* Related Articles */}
        <section className="max-w-3xl mx-auto px-4 mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Related Guides &amp; Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <a
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                    {related.category}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                    {related.title}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 mt-2 block">
                  {related.readTime}
                </span>
              </a>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
