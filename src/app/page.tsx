import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Masthead from '@/components/layout/Masthead';
import Footer from '@/components/layout/Footer';
import ArticleHero from '@/components/articles/ArticleHero';
import ArticleCard from '@/components/articles/ArticleCard';
import NewsletterForm from '@/components/forms/NewsletterForm';
import {
  getFeaturedArticles,
  getPublishedArticles,
  getArticlesByCategory,
  categories,
  getFeaturedPodcast,
  getFeaturedVideo,
} from '@/lib/data';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const featured = getFeaturedArticles();
  const allArticles = getPublishedArticles();
  const heroArticle = featured[0];
  const secondaryFeatured = featured.slice(1, 3);
  const noticiasEscolares = getArticlesByCategory('noticias-escolares').slice(0, 4);
  const entretenimento = getArticlesByCategory('entretenimento').slice(0, 4);
  const debatesMundiais = getArticlesByCategory('debates-mundiais').slice(0, 4);
  const featuredPodcast = getFeaturedPodcast();
  const featuredVideo = getFeaturedVideo();

  return (
    <>
      <Navigation />
      <Masthead />

      <main className="relative z-10">
        <div className="max-w-[1200px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)]">
          {/* ═══════════════════════════════════════════════════
             HERO ARTICLE
             ═══════════════════════════════════════════════════ */}
          {heroArticle && (
            <section className="mb-8" aria-label="Destaque principal">
              <ArticleHero article={heroArticle} />
              <div className="rule-double mt-8" />
            </section>
          )}

          {/* ═══════════════════════════════════════════════════
             SECONDARY FEATURED + LATEST
             ═══════════════════════════════════════════════════ */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 reveal" aria-label="Destaques e últimas notícias">
            {/* Secondary featured — 2 columns */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {secondaryFeatured.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Latest sidebar */}
            <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-grey-200)] pt-6 lg:pt-0 lg:pl-8">
              <h2 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">
                <span className="text-[var(--color-red)]">•</span> Últimas
              </h2>
              {allArticles.slice(0, 5).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="horizontal"
                  showImage={false}
                />
              ))}
            </aside>
          </section>

          <div className="rule-thin mb-12" />

          {/* ═══════════════════════════════════════════════════
             NOTÍCIAS ESCOLARES
             ═══════════════════════════════════════════════════ */}
          <section className="mb-12 reveal" aria-label="Notícias Escolares">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2">
                <span className="text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-red)]">
                  Notícias Escolares
                </span>
              </h2>
              <Link
                href="/categoria/noticias-escolares"
                className="text-[var(--text-xs)] font-semibold tracking-[0.1em] uppercase text-[var(--color-grey-500)] hover:text-[var(--color-red)] transition-colors"
              >
                Ver todas →
              </Link>
            </div>
            <div className="h-[3px] bg-[var(--color-ink)] mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {noticiasEscolares.map((article) => (
                <ArticleCard key={article.id} article={article} showExcerpt={false} />
              ))}
            </div>
          </section>

          <div className="rule-dashed mb-12" />

          {/* ═══════════════════════════════════════════════════
             ENTRETENIMENTO
             ═══════════════════════════════════════════════════ */}
          <section className="mb-12 reveal" aria-label="Entretenimento">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-red)]">
                Entretenimento
              </h2>
              <Link
                href="/categoria/entretenimento"
                className="text-[var(--text-xs)] font-semibold tracking-[0.1em] uppercase text-[var(--color-grey-500)] hover:text-[var(--color-red)] transition-colors"
              >
                Ver todas →
              </Link>
            </div>
            <div className="h-[3px] bg-[var(--color-ink)] mb-6" />
            {entretenimento.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* First article larger */}
                <div className="lg:col-span-2">
                  <ArticleCard article={entretenimento[0]} />
                </div>
                {/* Rest in sidebar */}
                <div className="border-t lg:border-t-0 lg:border-l border-[var(--color-grey-200)] pt-6 lg:pt-0 lg:pl-8">
                  {entretenimento.slice(1).map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      variant="compact"
                      showExcerpt={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          <div className="rule-dashed mb-12" />

          {/* ═══════════════════════════════════════════════════
             DEBATES MUNDIAIS
             ═══════════════════════════════════════════════════ */}
          <section className="mb-12 reveal" aria-label="Debates Mundiais">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-red)]">
                Debates Mundiais
              </h2>
              <Link
                href="/categoria/debates-mundiais"
                className="text-[var(--text-xs)] font-semibold tracking-[0.1em] uppercase text-[var(--color-grey-500)] hover:text-[var(--color-red)] transition-colors"
              >
                Ver todas →
              </Link>
            </div>
            <div className="h-[3px] bg-[var(--color-ink)] mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {debatesMundiais.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          <div className="rule-double mb-12" />

          {/* ═══════════════════════════════════════════════════
             PODCAST HIGHLIGHT
             ═══════════════════════════════════════════════════ */}
          {featuredPodcast && (
            <section
              className="mb-12 bg-[var(--color-ink)] text-[var(--color-paper)] p-8 lg:p-12"
              aria-label="Podcast em destaque"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-5 h-5 text-[var(--color-red-light)]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                    <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red-light)]">
                      POV Debates — Podcast
                    </span>
                  </div>
                  <h2 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold leading-tight mb-3">
                    {featuredPodcast.title}
                  </h2>
                  <p className="text-[var(--text-sm)] text-[var(--color-grey-300)] leading-relaxed mb-4">
                    {featuredPodcast.description}
                  </p>
                  <div className="flex items-center gap-4 text-[var(--text-xs)] text-[var(--color-grey-400)]">
                    <span>Duração: {featuredPodcast.duration}</span>
                    <span>•</span>
                    <span>{formatDate(featuredPodcast.publishedAt)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-48 h-48 bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <svg
                      className="w-16 h-16 text-[var(--color-red)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <Link
                    href="/podcast"
                    className="text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-red-light)] hover:text-[var(--color-paper)] transition-colors"
                  >
                    Todos os episódios →
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* ═══════════════════════════════════════════════════
             VIDEO HIGHLIGHT
             ═══════════════════════════════════════════════════ */}
          {featuredVideo && (
            <section className="mb-12" aria-label="Vídeo em destaque">
              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-5 h-5 text-[var(--color-red)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red)]">
                  Vídeo em Destaque
                </span>
              </div>
              <div className="h-[3px] bg-[var(--color-ink)] mb-6" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video bg-[var(--color-ink)] flex items-center justify-center border border-[var(--color-grey-200)]">
                  <div className="text-center text-[var(--color-grey-400)]">
                    <svg
                      className="w-16 h-16 mx-auto mb-2 text-[var(--color-red)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <p className="text-xs">YouTube Player</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold leading-tight mb-3">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed mb-4">
                    {featuredVideo.description}
                  </p>
                  <div className="text-[var(--text-xs)] text-[var(--color-grey-500)] mb-4">
                    {formatDate(featuredVideo.publishedAt)}
                  </div>
                  <Link
                    href="/videos"
                    className="inline-block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-red)] hover:text-[var(--color-red-dark)] transition-colors"
                  >
                    Todos os vídeos →
                  </Link>
                </div>
              </div>
            </section>
          )}

          <div className="rule-double mb-12" />

          {/* ═══════════════════════════════════════════════════
             NEWSLETTER
             ═══════════════════════════════════════════════════ */}
          <section
            className="mb-12 bg-[var(--color-paper-warm)] border border-[var(--color-ink)] p-8 lg:p-12 text-center"
            aria-label="Newsletter"
          >
            <h2 className="font-[var(--font-serif)] text-[var(--text-xl)] font-bold mb-2">
              Fique por dentro de tudo
            </h2>
            <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] mb-6 max-w-lg mx-auto">
              Receba as principais notícias do POV diretamente no seu e-mail. Sem spam, com conteúdo.
            </p>
            <NewsletterForm />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
