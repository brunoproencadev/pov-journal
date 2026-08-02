import Link from 'next/link';
import type { Article } from '@/lib/data';
import { formatDate } from '@/lib/utils';

interface ArticleHeroProps {
  article: Article;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <article className="group">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
        {/* Image */}
        <Link href={`/artigo/${article.slug}`} className="block overflow-hidden">
          <div className="aspect-[4/3] bg-[var(--color-grey-100)] flex items-center justify-center text-[var(--color-grey-300)] border border-[var(--color-grey-200)] group-hover:border-[var(--color-red)] transition-colors">
            <span className="font-[var(--font-serif)] text-4xl font-black opacity-20">POV</span>
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col justify-center">
          <Link
            href={`/categoria/${article.category.slug}`}
            className="category-label--filled category-label mb-3 inline-block self-start"
          >
            {article.category.name}
          </Link>
          <h2 className="font-[var(--font-serif)] text-[var(--text-3xl)] font-bold leading-[1.1] mb-3 group-hover:text-[var(--color-red)] transition-colors">
            <Link href={`/artigo/${article.slug}`}>{article.title}</Link>
          </h2>
          {article.subtitle && (
            <p className="font-[var(--font-serif)] text-[var(--text-md)] text-[var(--color-grey-600)] italic leading-relaxed mb-4">
              {article.subtitle}
            </p>
          )}
          <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-[var(--text-xs)] text-[var(--color-grey-500)]">
            <span className="font-semibold text-[var(--color-ink)]">{article.author.name}</span>
            <span className="text-[var(--color-red)]">•</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span className="text-[var(--color-red)]">•</span>
            <span>{article.readingTime} min de leitura</span>
          </div>
        </div>
      </div>
    </article>
  );
}
