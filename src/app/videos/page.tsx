import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { videos, getFeaturedVideo } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Vídeos',
  description: 'Canal de vídeos do POV Journal. Coberturas, documentários, entrevistas e shorts.',
};

export default function VideosPage() {
  const featured = getFeaturedVideo();
  const allVideos = videos.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <Navigation />

      <main className="relative z-10 pt-20">
        <div className="max-w-[1200px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)]">
          {/* Page Header */}
          <header className="py-12 mb-8">
            <div className="rule-thick mb-6" />
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-[var(--color-red)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red)]">
                Vídeos
              </span>
            </div>
            <h1 className="font-[var(--font-serif)] text-[var(--text-3xl)] font-bold leading-tight mb-4">
              Canal POV
            </h1>
            <p className="font-[var(--font-serif)] text-[var(--text-md)] text-[var(--color-grey-600)] italic max-w-2xl">
              Coberturas de eventos, documentários estudantis, entrevistas e produções originais.
            </p>
            <div className="rule-double mt-6" />
          </header>

          {/* Featured Video */}
          {featured && (
            <section className="mb-12" aria-label="Vídeo em destaque">
              <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red)] mb-4 block">
                Em Destaque
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 aspect-video bg-[var(--color-ink)] flex items-center justify-center border border-[var(--color-grey-200)]">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2 text-[var(--color-red)]" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <p className="text-xs text-[var(--color-grey-500)]">YouTube Player</p>
                  </div>
                </div>
                <div className="lg:col-span-2 flex flex-col justify-center">
                  {featured.category && (
                    <span className="category-label mb-2 inline-block self-start">{featured.category}</span>
                  )}
                  <h2 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold leading-tight mb-3">
                    {featured.title}
                  </h2>
                  <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed mb-3">
                    {featured.description}
                  </p>
                  <span className="text-[var(--text-xs)] text-[var(--color-grey-500)]">
                    {formatDate(featured.publishedAt)}
                  </span>
                </div>
              </div>
            </section>
          )}

          <div className="rule-dashed mb-8" />

          {/* All Videos Grid */}
          <section aria-label="Todos os vídeos">
            <h2 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">
              Últimos Vídeos
            </h2>
            <div className="h-px bg-[var(--color-ink)] mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {allVideos.map((video) => (
                <article key={video.id} className="group">
                  <div className="aspect-video bg-[var(--color-ink)] flex items-center justify-center mb-4 border border-[var(--color-grey-200)] group-hover:border-[var(--color-red)] transition-colors overflow-hidden">
                    <svg className="w-10 h-10 text-[var(--color-red)] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  {video.category && (
                    <span className="category-label mb-1.5 inline-block">{video.category}</span>
                  )}
                  <h3 className="font-[var(--font-serif)] text-[var(--text-lg)] font-bold leading-snug mb-2 group-hover:text-[var(--color-red)] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed line-clamp-2 mb-2">
                    {video.description}
                  </p>
                  <span className="text-[var(--text-xs)] text-[var(--color-grey-500)]">
                    {formatDate(video.publishedAt)}
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
