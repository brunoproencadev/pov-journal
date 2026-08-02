'use client';

import { useState } from 'react';
import { videos as initialVideos } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import type { Video } from '@/lib/data';

export default function AdminVideosPage() {
  const [videoList, setVideoList] = useState<Video[]>([...initialVideos]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);

    const res = await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: fd.get('title'),
        description: fd.get('description'),
        youtubeUrl: fd.get('youtubeUrl'),
        category: fd.get('category'),
        featured: fd.get('featured') === 'on',
      }),
    });

    if (res.ok) {
      const newVideo = await res.json();
      setVideoList((prev) => [newVideo, ...prev]);
      setShowForm(false);
      setMessage('Vídeo adicionado!');
      setTimeout(() => setMessage(''), 3000);
    }
    setSaving(false);
  };

  const inputClass = 'w-full px-4 py-3 border border-[var(--color-grey-200)] bg-[var(--color-paper)] text-[var(--text-sm)] focus:outline-none focus:border-[var(--color-red)] transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-1">Vídeos</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">Gerencie os vídeos do Canal POV</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-5 py-2.5 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors">
          {showForm ? '✕ Fechar' : '+ Novo Vídeo'}
        </button>
      </div>

      {message && <div className="mb-6 px-4 py-3 bg-green-50 text-green-800 border border-green-200 text-[var(--text-sm)] font-semibold">{message}</div>}

      {showForm && (
        <div className="mb-8 admin-card">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Título *</label>
              <input name="title" required className={inputClass} placeholder="Título do vídeo" />
            </div>
            <div>
              <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">URL do YouTube *</label>
              <input name="youtubeUrl" required className={inputClass} placeholder="https://www.youtube.com/watch?v=..." />
            </div>
            <div>
              <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Descrição</label>
              <textarea name="description" rows={3} className={`${inputClass} resize-y`} placeholder="Descrição do vídeo" />
            </div>
            <div>
              <label className="block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2">Categoria</label>
              <input name="category" className={inputClass} placeholder="ex: Cobertura, Documentário, Entrevista" />
            </div>
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red)] transition-colors disabled:opacity-50">
              {saving ? 'Salvando...' : 'Adicionar Vídeo'}
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoList.map((video) => (
          <div key={video.id} className="admin-card">
            <div className="aspect-video bg-[var(--color-ink)] flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-[var(--color-red)]" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
            <h3 className="font-semibold text-[var(--text-sm)] mb-1">{video.title}</h3>
            <div className="flex items-center justify-between text-[var(--text-xs)] text-[var(--color-grey-500)]">
              <span>{formatDate(video.publishedAt)}</span>
              {video.featured && <span className="text-[var(--color-red)] font-bold">Destaque</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
