'use client';

import { useState } from 'react';
import { categories as initialCategories } from '@/lib/data';
import type { Category } from '@/lib/data';

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState<Category[]>([...initialCategories]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);

    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: fd.get('name'),
        description: fd.get('description'),
      }),
    });

    if (res.ok) {
      const newCat = await res.json();
      setCats((prev) => [...prev, newCat]);
      setShowForm(false);
      setMessage('Categoria criada!');
      setTimeout(() => setMessage(''), 3000);
      e.currentTarget.reset();
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-1">Categorias</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">Gerencie as categorias do jornal</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors"
        >
          {showForm ? '✕ Fechar' : '+ Nova Categoria'}
        </button>
      </div>

      {message && (
        <div className="mb-6 px-4 py-3 bg-green-50 text-green-800 border border-green-200 text-[var(--text-sm)] font-semibold">{message}</div>
      )}

      {showForm && (
        <div className="mb-8 admin-card">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Nome *</label>
              <input name="name" required className="w-full px-4 py-3 border border-[var(--color-grey-200)] bg-[var(--color-paper)] text-[var(--text-sm)] focus:outline-none focus:border-[var(--color-red)] transition-colors" placeholder="Nome da categoria" />
            </div>
            <div>
              <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Descrição</label>
              <textarea name="description" rows={3} className="w-full px-4 py-3 border border-[var(--color-grey-200)] bg-[var(--color-paper)] text-[var(--text-sm)] focus:outline-none focus:border-[var(--color-red)] transition-colors resize-y" placeholder="Descrição da categoria" />
            </div>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red)] transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : 'Criar Categoria'}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {cats.map((cat) => (
          <div key={cat.id} className="admin-card flex items-center justify-between">
            <div>
              <h3 className="font-[var(--font-serif)] text-[var(--text-lg)] font-bold">{cat.name}</h3>
              <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">{cat.description}</p>
              <span className="text-[var(--text-xs)] text-[var(--color-grey-400)] mt-1 inline-block">Slug: /{cat.slug}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
