'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('E-mail ou senha inválidos.');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('Erro ao conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <div className="px-4 py-3 border border-[var(--color-red)] bg-red-50 text-[var(--text-sm)] text-[var(--color-red)]">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="login-email"
          className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2"
        >
          E-mail
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-3 border border-[var(--color-ink)] bg-[var(--color-paper)] text-[var(--text-sm)] placeholder:text-[var(--color-grey-400)] focus:outline-none focus:border-[var(--color-red)] transition-colors"
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="login-password"
          className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2"
        >
          Senha
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 border border-[var(--color-ink)] bg-[var(--color-paper)] text-[var(--text-sm)] placeholder:text-[var(--color-grey-400)] focus:outline-none focus:border-[var(--color-red)] transition-colors"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[var(--color-ink)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase hover:bg-[var(--color-red)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
