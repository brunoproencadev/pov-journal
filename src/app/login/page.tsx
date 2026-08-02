import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import LoginForm from '@/components/forms/LoginForm';

export const metadata: Metadata = {
  title: 'Área da Redação',
  description: 'Acesso restrito para a equipe editorial do POV — Point of View.',
};

export default function LoginPage() {
  return (
    <>
      <Navigation />

      <main className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="w-full max-w-md mx-auto px-6">
          {/* Masthead-style header */}
          <div className="text-center mb-8">
            <div className="rule-thick mb-4" />
            <h1 className="font-[var(--font-serif)] text-[var(--text-4xl)] font-black tracking-wider leading-none mb-2">
              POV
            </h1>
            <p className="text-[var(--text-xs)] font-medium tracking-[0.3em] uppercase text-[var(--color-grey-500)]">
              Point of View
            </p>
            <div className="h-px bg-[var(--color-ink)] mt-4 mb-2" />
            <div className="h-px bg-[var(--color-ink)]" />
          </div>

          <h2 className="text-center font-[var(--font-serif)] text-[var(--text-lg)] font-bold mb-6">
            Área da Redação
          </h2>

          <LoginForm />

          <div className="rule-dashed mt-8 mb-4" />
          <p className="text-center text-[var(--text-xs)] text-[var(--color-grey-500)]">
            Acesso restrito à equipe editorial do POV.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
