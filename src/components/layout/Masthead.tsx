import { formatMastheadDate } from '@/lib/utils';

export default function Masthead() {
  const today = formatMastheadDate();

  return (
    <header className="pt-20 pb-4">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)]">
        {/* Date Line */}
        <div className="flex items-center justify-between text-[var(--text-xs)] font-medium tracking-[0.15em] uppercase text-[var(--color-grey-500)] mb-4">
          <span>{today}</span>
          <span className="hidden sm:inline">Brasil</span>
        </div>

        {/* Top Rule */}
        <div className="rule-thick mb-2" />

        {/* Masthead Title */}
        <div className="text-center py-6">
          <h1 className="font-[var(--font-serif)] text-[var(--text-4xl)] font-black tracking-[0.04em] leading-none">
            POV
          </h1>
          <p className="text-[var(--text-sm)] font-normal tracking-[0.35em] uppercase text-[var(--color-grey-500)] mt-2">
            Point of View
          </p>
        </div>

        {/* Bottom Rule */}
        <div className="h-px bg-[var(--color-ink)] mb-1" />
        <div className="h-px bg-[var(--color-ink)] mb-4" />

        {/* Tagline */}
        <p className="text-center font-[var(--font-serif)] text-[var(--text-md)] italic text-[var(--color-ink-muted)]">
          A escola sob o olhar de quem a vive
        </p>

        {/* Final Rule */}
        <div className="rule-dashed mt-4" />
      </div>
    </header>
  );
}
