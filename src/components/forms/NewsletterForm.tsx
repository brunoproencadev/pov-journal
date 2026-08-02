'use client';

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Seu e-mail"
        className="flex-1 px-4 py-3 border border-[var(--color-ink)] bg-[var(--color-paper)] text-[var(--text-sm)] placeholder:text-[var(--color-grey-400)] focus:outline-none focus:border-[var(--color-red)]"
        aria-label="Endereço de e-mail"
        id="newsletter-email"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors"
      >
        Assinar
      </button>
    </form>
  );
}
