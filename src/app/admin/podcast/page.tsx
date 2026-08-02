'use client';

import { useState } from 'react';
import { podcasts as initialPodcasts } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import type { PodcastEpisode } from '@/lib/data';

export default function AdminPodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([...initialPodcasts]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);

    const res = await fetch('/api/podcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: fd.get('title'),
        description: fd.get('description'),
        audioUrl: fd.get('audioUrl'),
        duration: fd.get('duration'),
        season: Number(fd.get('season')) || 1,
        episode: Number(fd.get('episode')) || episodes.length + 1,
        featured: fd.get('featured') === 'on',
      }),
    });

    if (res.ok) {
      const newEp = await res.json();
      setEpisodes((prev) => [newEp, ...prev]);
      setShowForm(false);
      setMessage('Episódio criado!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const inputClass = 'w-full px-4 py-3 border border-[var(--color-grey-200)] bg-[var(--color-paper)] text-[var(--text-sm)] focus:outline-none focus:border-[var(--color-red)] transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-1">Podcast</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">Gerencie os episódios do POV Debates</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors">
          {showForm ? '✕ Fechar' : '+ Novo Episódio'}
        </button>
      </div>

      {message && <div className="mb-6 px-4 py-3 bg-green-50 text-green-800 border border-green-200 text-[var(--text-sm)] font-semibold">{message}</div>}

      {showForm && (
        <div className="mb-8 admin-card">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Título *</label>
              <input name="title" required className={inputClass} placeholder="Título do episódio" />
            </div>
            <div>
              <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Descrição</label>
              <textarea name="description" rows={3} className={`${inputClass} resize-y`} placeholder="Descrição do episódio" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">URL do Áudio</label>
                <input name="audioUrl" className={inputClass} placeholder="https://..." />
              </div>
              <div>
                <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Duração</label>
                <input name="duration" className={inputClass} placeholder="42:15" />
              </div>
              <div>
                <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Temporada</label>
                <input name="season" type="number" defaultValue={1} className={inputClass} />
              </div>
            </div>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red)] transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : 'Criar Episódio'}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-0">
        {episodes.map((ep) => (
          <div key={ep.id} className="flex items-center justify-between py-4 border-b border-[var(--color-grey-200)] last:border-0">
            <div className="flex-1 min-w-0 mr-4">
              <h3 className="font-semibold text-[var(--text-sm)]">{ep.title}</h3>
              <div className="flex items-center gap-3 mt-1 text-[var(--text-xs)] text-[var(--color-grey-500)]">
                <span>{formatDate(ep.publishedAt)}</span>
                <span>•</span>
                <span>{ep.duration}</span>
                {ep.featured && (<><span>•</span><span className="text-[var(--color-red)] font-bold">Destaque</span></>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
