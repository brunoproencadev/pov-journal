import Link from 'next/link';
import { categories } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)] border-t-4 border-[var(--color-red)]">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)] py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-[var(--font-serif)] text-xl font-black tracking-wider">
                POV
              </span>
              <span className="text-[var(--text-xs)] text-[var(--color-grey-400)] tracking-[0.1em] uppercase">
                Point of View
              </span>
            </div>
            <p className="font-[var(--font-serif)] text-[var(--text-sm)] italic text-[var(--color-grey-500)] leading-relaxed">
              A escola sob o olhar de quem a vive.
            </p>
          </div>

          {/* Seções */}
          <div>
            <h3 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">
              Seções
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="text-[var(--text-sm)] text-[var(--color-grey-300)] hover:text-[var(--color-paper)] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mídia */}
          <div>
            <h3 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">
              Mídia
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/podcast"
                  className="text-[var(--text-sm)] text-[var(--color-grey-300)] hover:text-[var(--color-paper)] transition-colors"
                >
                  Podcast
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-[var(--text-sm)] text-[var(--color-grey-300)] hover:text-[var(--color-paper)] transition-colors"
                >
                  Vídeos
                </Link>
              </li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">
              Institucional
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-[var(--text-sm)] text-[var(--color-grey-300)] hover:text-[var(--color-paper)] transition-colors"
                >
                  Sobre o POV
                </Link>
              </li>
              <li>
                <Link
                  href="/equipe"
                  className="text-[var(--text-sm)] text-[var(--color-grey-300)] hover:text-[var(--color-paper)] transition-colors"
                >
                  Equipe Editorial
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[var(--text-sm)] text-[var(--color-grey-300)] hover:text-[var(--color-paper)] transition-colors"
                >
                  Área da Redação
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[var(--text-xs)] text-[var(--color-grey-500)]">
          <p>© {new Date().getFullYear()} POV — Point of View. Todos os direitos reservados.</p>
          <p className="font-[var(--font-serif)] italic">
            Informar com precisão, conectar com autenticidade.
          </p>
        </div>
      </div>
    </footer>
  );
}
