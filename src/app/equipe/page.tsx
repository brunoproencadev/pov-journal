import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { authors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Equipe Editorial',
  description: 'Conheça a equipe editorial do POV — Point of View. Os estudantes por trás do jornal.',
};

export default function EquipePage() {
  return (
    <>
      <Navigation />

      <main className="relative z-10 pt-20">
        <div className="max-w-[1200px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)]">
          {/* Header */}
          <header className="py-12 mb-8">
            <div className="rule-thick mb-6" />
            <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red)] mb-3 block">
              A Redação
            </span>
            <h1 className="font-[var(--font-serif)] text-[var(--text-3xl)] font-bold leading-tight mb-4">
              Equipe Editorial
            </h1>
            <p className="font-[var(--font-serif)] text-[var(--text-md)] text-[var(--color-grey-600)] italic max-w-2xl">
              Os estudantes que fazem o POV acontecer. Cada um com sua expertise, todos com o mesmo compromisso: jornalismo autêntico.
            </p>
            <div className="rule-double mt-6" />
          </header>

          {/* Team Grid */}
          <section className="mb-16" aria-label="Membros da equipe">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {authors.map((member, index) => (
                <article
                  key={member.id}
                  className={`p-8 lg:p-10 border-b border-[var(--color-grey-200)] ${
                    index % 2 === 0 ? 'md:border-r' : ''
                  } group`}
                >
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-center font-[var(--font-serif)] text-2xl font-bold flex-shrink-0 group-hover:bg-[var(--color-red)] transition-colors">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="font-[var(--font-serif)] text-[var(--text-xl)] font-bold leading-tight mb-1">
                        {member.name}
                      </h2>
                      <span className="text-[var(--text-xs)] font-bold tracking-[0.12em] uppercase text-[var(--color-red)] mb-3 block">
                        {member.role}
                      </span>
                      {member.bio && (
                        <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16 text-center py-12 border-t border-b border-[var(--color-ink)]">
            <h2 className="font-[var(--font-serif)] text-[var(--text-xl)] font-bold mb-3">
              Quer fazer parte da equipe?
            </h2>
            <p className="text-[var(--text-sm)] text-[var(--color-grey-600)] max-w-lg mx-auto mb-6">
              O POV está sempre aberto para novos redatores, fotógrafos, ilustradores e colaboradores.
              Se você é aluno do Ensino Médio e tem vontade de fazer jornalismo, fale conosco.
            </p>
            <a
              href="mailto:contato@povjournal.com"
              className="inline-block px-8 py-3 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors"
            >
              Entre em contato
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
