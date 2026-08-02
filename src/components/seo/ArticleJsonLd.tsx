import type { Article } from '@/lib/data';

interface JsonLdProps {
  article: Article;
  url: string;
}

/**
 * Structured data (JSON-LD) for article pages.
 * Outputs NewsArticle schema for Google search results.
 */
export default function ArticleJsonLd({ article, url }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage || undefined,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'POV — Point of View',
      logo: {
        '@type': 'ImageObject',
        url: `${url.split('/artigo')[0]}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: article.category.name,
    keywords: article.tags.join(', '),
    wordCount: article.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    timeRequired: `PT${article.readingTime}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
