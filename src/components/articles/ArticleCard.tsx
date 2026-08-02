import Link from 'next/link';
import type { Article } from '@/lib/data';
import { formatDate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'horizontal';
  showImage?: boolean;
  showExcerpt?: boolean;
}

export default function ArticleCard({
  article,
  variant = 'default',
  showImage = true,
  showExcerpt = true,
}: ArticleCardProps) {
  if (variant === 'horizontal') {
    return (
      <article className="group flex gap-4 py-4 border-b border-[var(--color-grey-200)] last:border-0">
        {showImage && article.coverImage && (
          <div className="w-24 h-24 flex-shrink-0 bg-[var(--color-grey-200)] overflow-hidden">
            <div className="w-full h-full bg-[var(--color-grey-100)] flex items-center justify-center text-[var(--color-grey-400)] text-xs">
              POV
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Link
            href={`/categoria/${article.category.slug}`}
            className="category-label mb-1 inline-block"
          >
            {article.category.name}
          </Link>
          <h3 className="font-[var(--font-serif)] text-[var(--text-base)] font-bold leading-snug mb-1 group-hover:text-[var(--color-red)] transition-colors">
            <Link href={`/artigo/${article.slug}`}>{article.title}</Link>
          </h3>
          <div className="text-[var(--text-xs)] text-[var(--color-grey-500)]">
            {formatDate(article.publishedAt)}
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group py-4 border-b border-[var(--color-grey-200)] last:border-0">
        <Link
          href={`/categoria/${article.category.slug}`}
          className="category-label mb-1.5 inline-block"
        >
          {article.category.name}
        </Link>
        <h3 className="font-[var(--font-serif)] text-[var(--text-lg)] font-bold leading-snug mb-2 group-hover:text-[var(--color-red)] transition-colors">
          <Link href={`/artigo/${article.slug}`}>{article.title}</Link>
        </h3>
        {showExcerpt && (
          <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 text-[var(--text-xs)] text-[var(--color-grey-500)]">
          <span>{article.author.name}</span>
          <span className="text-[var(--color-red)]">•</span>
          <span>{formatDate(article.publishedAt)}</span>
          <span className="text-[var(--color-red)]">•</span>
          <span>{article.readingTime} min de leitura</span>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group">
      {showImage && article.coverImage && (
        <Link href={`/artigo/${article.slug}`} className="block mb-4 overflow-hidden">
          <div className="aspect-[16/10] bg-[var(--color-grey-100)] flex items-center justify-center text-[var(--color-grey-400)] text-sm border border-[var(--color-grey-200)] group-hover:border-[var(--color-red)] transition-colors">
            <span className="font-[var(--font-serif)] text-lg font-bold opacity-30">POV</span>
          </div>
        </Link>
      )}
      <Link
        href={`/categoria/${article.category.slug}`}
        className="category-label mb-2 inline-block"
      >
        {article.category.name}
      </Link>
      <h3 className="font-[var(--font-serif)] text-[var(--text-xl)] font-bold leading-tight mb-2 group-hover:text-[var(--color-red)] transition-colors">
        <Link href={`/artigo/${article.slug}`}>{article.title}</Link>
      </h3>
      {article.subtitle && (
        <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed mb-2">
          {article.subtitle}
        </p>
      )}
      {showExcerpt && (
        <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed line-clamp-3 mb-3">
          {article.excerpt}
        </p>
      )}
      <div className="flex items-center gap-3 text-[var(--text-xs)] text-[var(--color-grey-500)]">
        <span className="font-medium">{article.author.name}</span>
        <span className="text-[var(--color-red)]">•</span>
        <span>{formatDate(article.publishedAt)}</span>
      </div>
    </article>
  );
}
