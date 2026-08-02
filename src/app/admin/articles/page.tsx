'use client';

import { useState } from 'react';
import Link from 'next/link';
import { articles, categories, authors } from '@/lib/data';
import { getStatusLabel, getStatusColor, formatDate } from '@/lib/utils';
import type { Article } from '@/lib/data';

type StatusFilter = 'all' | 'PUBLICADO' | 'RASCUNHO' | 'EM_REVISAO' | 'AGENDADO';

export default function AdminArticlesPage() {
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [showForm, setShowForm] = useState(false);
  const [articleList, setArticleList] = useState<Article[]>([...articles]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const filtered = filter === 'all'
    ? articleList
    : articleList.filter((a) => a.status === filter);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const filters: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'PUBLICADO', label: 'Publicados' },
    { key: 'RASCUNHO', label: 'Rascunhos' },
    { key: 'EM_REVISAO', label: 'Em Revisão' },
    { key: 'AGENDADO', label: 'Agendados' },
  ];

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: fd.get('title'),
        subtitle: fd.get('subtitle'),
        content: fd.get('content'),
        excerpt: fd.get('excerpt'),
        categoryId: fd.get('categoryId'),
        authorId: fd.get('authorId'),
        status: fd.get('status'),
        featured: fd.get('featured') === 'on',
      }),
    });

    if (res.ok) {
      const newArticle = await res.json();
      setArticleList((prev) => [newArticle, ...prev]);
      setShowForm(false);
      setMessage('Artigo criado com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const inputClass = 'w-full px-4 py-3 border border-[var(--color-grey-200)] bg-[var(--color-paper)] text-[var(--text-sm)] focus:outline-none focus:border-[var(--color-red)] transition-colors';
  const labelClass = 'block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-1">Artigos</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">Gerencie todos os artigos do jornal</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors"
        >
          {showForm ? '✕ Fechar' : '+ Novo Artigo'}
        </button>
      </div>

      {message && (
        <div className="mb-6 px-4 py-3 bg-green-50 text-green-800 border border-green-200 text-[var(--text-sm)] font-semibold">
          {message}
        </div>
      )}

      {/* Create Form */}
      {showForm && (
        <div className="mb-8 admin-card">
          <h2 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">Novo Artigo</h2>
          <div className="h-px bg-[var(--color-ink)] mb-6" />
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Título *</label>
                <input name="title" required className={inputClass} placeholder="Título do artigo" />
              </div>
              <div>
                <label className={labelClass}>Subtítulo</label>
                <input name="subtitle" className={inputClass} placeholder="Subtítulo opcional" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Resumo</label>
              <textarea name="excerpt" rows={2} className={`${inputClass} resize-y`} placeholder="Resumo curto do artigo" />
            </div>
            <div>
              <label className={labelClass}>Conteúdo (HTML) *</label>
              <textarea name="content" required rows={8} className={`${inputClass} resize-y font-mono text-xs`} placeholder="<p>Conteúdo do artigo...</p>" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Categoria *</label>
                <select name="categoryId" required className={inputClass}>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Autor</label>
                <select name="authorId" className={inputClass}>
                  {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select name="status" className={inputClass}>
                  <option value="RASCUNHO">Rascunho</option>
                  <option value="EM_REVISAO">Em Revisão</option>
                  <option value="PUBLICADO">Publicado</option>
                  <option value="AGENDADO">Agendado</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="featured" id="featured" className="accent-[var(--color-red)]" />
              <label htmlFor="featured" className="text-[var(--text-sm)]">Artigo em destaque</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red)] transition-colors disabled:opacity-50">
                {saving ? 'Salvando...' : 'Criar Artigo'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 border border-[var(--color-grey-200)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:border-[var(--color-ink)] transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 text-[var(--text-xs)] font-semibold tracking-wide uppercase border transition-colors ${
              filter === f.key
                ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                : 'border-[var(--color-grey-200)] text-[var(--color-grey-600)] hover:border-[var(--color-ink)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Articles Table */}
      <div className="border border-[var(--color-grey-200)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-paper-warm)] border-b border-[var(--color-grey-200)]">
              <th className="text-left px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)]">Título</th>
              <th className="text-left px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)] hidden md:table-cell">Categoria</th>
              <th className="text-left px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)] hidden lg:table-cell">Autor</th>
              <th className="text-left px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)]">Status</th>
              <th className="text-left px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)] hidden sm:table-cell">Data</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((article) => (
              <tr key={article.id} className="border-b border-[var(--color-grey-200)] last:border-0 hover:bg-[var(--color-paper-warm)] transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/artigo/${article.slug}`} className="font-semibold text-[var(--text-sm)] hover:text-[var(--color-red)] transition-colors">
                    {article.title}
                  </Link>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="category-label">{article.category.name}</span>
                </td>
                <td className="px-4 py-3 text-[var(--text-sm)] text-[var(--color-grey-600)] hidden lg:table-cell">
                  {article.author.name}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${getStatusColor(article.status)}`}>
                    {getStatusLabel(article.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-xs)] text-[var(--color-grey-500)] hidden sm:table-cell">
                  {article.publishedAt ? formatDate(article.publishedAt) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
