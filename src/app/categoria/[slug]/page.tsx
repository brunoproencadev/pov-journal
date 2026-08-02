import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/articles/ArticleCard';
import { getCategoryBySlug, getArticlesByCategory, categories } from '@/lib/data';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) return { title: 'Categoria não encontrada' };

  return {
    title: category.name,
    description: category.description || `Artigos sobre ${category.name} — POV Journal`,
  };
}

export function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = getArticlesByCategory(slug);

  return (
    <>
      <Navigation />

      <main className="relative z-10 pt-20">
        <div className="max-w-[1200px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)]">
          {/* Category Header */}
          <header className="py-12 mb-8">
            <div className="rule-thick mb-6" />
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red)]">
                Seção
              </span>
            </div>
            <h1 className="font-[var(--font-serif)] text-[var(--text-3xl)] font-bold leading-tight mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="font-[var(--font-serif)] text-[var(--text-md)] text-[var(--color-grey-600)] italic max-w-2xl">
                {category.description}
              </p>
            )}
            <div className="rule-double mt-6" />
          </header>

          {/* Articles Grid */}
          {categoryArticles.length > 0 ? (
            <>
              {/* First article — large */}
              <div className="mb-10">
                <ArticleCard article={categoryArticles[0]} />
              </div>

              <div className="rule-dashed mb-8" />

              {/* Rest — grid */}
              {categoryArticles.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {categoryArticles.slice(1).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-[var(--color-grey-500)]">
              <p className="font-[var(--font-serif)] text-[var(--text-lg)] italic">
                Nenhum artigo publicado nesta categoria ainda.
              </p>
              <p className="text-[var(--text-sm)] mt-2">
                Volte em breve para novidades.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
