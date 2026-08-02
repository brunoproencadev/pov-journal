import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { podcasts, getFeaturedPodcast } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'POV Debates — Podcast',
  description: 'O podcast do POV Journal. Debates sobre temas atuais, cultura jovem e o cotidiano escolar.',
};

export default function PodcastPage() {
  const featured = getFeaturedPodcast();
  const allEpisodes = podcasts.sort(
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
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red)]">
                Podcast
              </span>
            </div>
            <h1 className="font-[var(--font-serif)] text-[var(--text-3xl)] font-bold leading-tight mb-4">
              POV Debates
            </h1>
            <p className="font-[var(--font-serif)] text-[var(--text-md)] text-[var(--color-grey-600)] italic max-w-2xl">
              Debates sobre temas atuais e cultura jovem. Ouvindo todos os lados, sem filtros.
            </p>
            <div className="rule-double mt-6" />
          </header>

          {/* Featured Episode */}
          {featured && (
            <section className="mb-12 bg-[var(--color-ink)] text-[var(--color-paper)] p-8 lg:p-12" aria-label="Episódio em destaque">
              <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red-light)] mb-4 block">
                Episódio em Destaque
              </span>
              <h2 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold leading-tight mb-4">
                {featured.title}
              </h2>
              <p className="text-[var(--text-sm)] text-[var(--color-grey-300)] leading-relaxed mb-6 max-w-2xl">
                {featured.description}
              </p>
              <div className="flex items-center gap-4 text-[var(--text-xs)] text-[var(--color-grey-400)]">
                <span>Temporada {featured.season}, Episódio {featured.episode}</span>
                <span>•</span>
                <span>Duração: {featured.duration}</span>
                <span>•</span>
                <span>{formatDate(featured.publishedAt)}</span>
              </div>
              {/* Audio player placeholder */}
              <div className="mt-6 bg-white/5 border border-white/10 p-4 flex items-center gap-4">
                <button className="w-12 h-12 flex items-center justify-center bg-[var(--color-red)] flex-shrink-0" aria-label="Reproduzir episódio">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
                <div className="flex-1 h-1 bg-white/10 rounded-full">
                  <div className="w-0 h-full bg-[var(--color-red)] rounded-full" />
                </div>
                <span className="text-xs text-[var(--color-grey-400)]">{featured.duration}</span>
              </div>
            </section>
          )}

          {/* Episode Archive */}
          <section aria-label="Arquivo de episódios">
            <h2 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">
              Todos os Episódios
            </h2>
            <div className="h-px bg-[var(--color-ink)] mb-6" />
            <div className="space-y-0">
              {allEpisodes.map((ep, index) => (
                <article
                  key={ep.id}
                  className="py-6 border-b border-[var(--color-grey-200)] last:border-0 group"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold text-[var(--color-grey-200)] leading-none flex-shrink-0 w-12">
                      {String(allEpisodes.length - index).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-[var(--font-serif)] text-[var(--text-lg)] font-bold leading-snug mb-2 group-hover:text-[var(--color-red)] transition-colors">
                        {ep.title}
                      </h3>
                      <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed mb-2 line-clamp-2">
                        {ep.description}
                      </p>
                      <div className="flex items-center gap-3 text-[var(--text-xs)] text-[var(--color-grey-500)]">
                        <span>{formatDate(ep.publishedAt)}</span>
                        <span className="text-[var(--color-red)]">•</span>
                        <span>{ep.duration}</span>
                      </div>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center border border-[var(--color-ink)] flex-shrink-0 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors" aria-label={`Reproduzir ${ep.title}`}>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="h-16" />
        </div>
      </main>

      <Footer />
    </>
  );
}
