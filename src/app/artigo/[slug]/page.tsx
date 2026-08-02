import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/articles/ArticleCard';
import ShareButtons from '@/components/ui/ShareButtons';
import ArticleJsonLd from '@/components/seo/ArticleJsonLd';
import { getArticleBySlug, getRelatedArticles, articles } from '@/lib/data';
import { formatDate } from '@/lib/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: 'Artigo não encontrado' };

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article.id, article.category.id);

  return (
    <>
      <ArticleJsonLd article={article} url={`/artigo/${article.slug}`} />
      <Navigation />

      <main className="relative z-10 pt-20">
        <article className="max-w-[800px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)]">
          {/* Article Header */}
          <header className="mb-8 pt-8 reveal">
            {/* Category */}
            <Link
              href={`/categoria/${article.category.slug}`}
              className="category-label--filled category-label mb-4 inline-block"
            >
              {article.category.name}
            </Link>

            {/* Title */}
            <h1 className="font-[var(--font-serif)] text-[var(--text-3xl)] font-bold leading-[1.1] mb-4">
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="font-[var(--font-serif)] text-[var(--text-lg)] text-[var(--color-grey-600)] italic leading-relaxed mb-6">
                {article.subtitle}
              </p>
            )}

            {/* Author & Meta */}
            <div className="flex items-center gap-4 pb-6 border-b border-[var(--color-grey-200)]">
              {/* Author avatar placeholder */}
              <div className="w-10 h-10 bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-center font-[var(--font-serif)] font-bold text-sm flex-shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-[var(--text-sm)]">
                  {article.author.name}
                </div>
                <div className="flex items-center gap-2 text-[var(--text-xs)] text-[var(--color-grey-500)]">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span className="text-[var(--color-red)]">•</span>
                  <span>{article.readingTime} min de leitura</span>
                </div>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="mb-8 reveal">
            <div className="aspect-[16/9] bg-[var(--color-grey-100)] flex items-center justify-center border border-[var(--color-grey-200)]">
              <span className="font-[var(--font-serif)] text-3xl font-black text-[var(--color-grey-300)] opacity-30">
                POV
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div
            className="article-content mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-[var(--color-grey-200)]">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[var(--text-xs)] font-medium tracking-[0.1em] uppercase text-[var(--color-grey-600)] px-3 py-1 border border-[var(--color-grey-200)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mb-12 pb-8 border-b border-[var(--color-grey-200)] reveal">
            <h3 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">
              Compartilhar
            </h3>
            <ShareButtons title={article.title} />
          </div>
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)] mb-16">
            <h2 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red)] mb-4">
              Leia também
            </h2>
            <div className="h-[3px] bg-[var(--color-ink)] mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
