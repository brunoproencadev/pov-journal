'use client';

import { useState, useEffect } from 'react';

interface Settings {
  siteName: string;
  tagline: string;
  breakingNews: string;
  breakingNewsUrl: string;
  aboutText: string;
  contactEmail: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      siteName: formData.get('siteName'),
      tagline: formData.get('tagline'),
      breakingNews: formData.get('breakingNews'),
      breakingNewsUrl: formData.get('breakingNewsUrl'),
      aboutText: formData.get('aboutText'),
      contactEmail: formData.get('contactEmail'),
    };

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const updated = await res.json();
      setSettings(updated);
      setMessage('Configurações salvas com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('Erro ao salvar.');
    }
    setSaving(false);
  };

  if (!settings) return <div className="animate-pulse text-[var(--color-grey-400)]">Carregando...</div>;

  const inputClass = 'w-full px-4 py-3 border border-[var(--color-grey-200)] bg-[var(--color-paper)] text-[var(--text-sm)] focus:outline-none focus:border-[var(--color-red)] transition-colors';
  const labelClass = 'block text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase text-[var(--color-grey-600)] mb-2';

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-1">Configurações</h1>
        <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">Configurações gerais do site</p>
      </div>

      {message && (
        <div className={`mb-6 px-4 py-3 text-[var(--text-sm)] font-semibold ${message.includes('sucesso') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-[var(--color-red)] border border-[var(--color-red)]'}`}>
          {message}
        </div>
      )}

      <form className="max-w-2xl space-y-8" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">Informações do Site</legend>
          <div className="h-px bg-[var(--color-ink)] mb-4" />
          <div className="space-y-4">
            <div>
              <label htmlFor="site-name" className={labelClass}>Nome do Site</label>
              <input id="site-name" name="siteName" type="text" defaultValue={settings.siteName} className={inputClass} />
            </div>
            <div>
              <label htmlFor="site-tagline" className={labelClass}>Tagline</label>
              <input id="site-tagline" name="tagline" type="text" defaultValue={settings.tagline} className={inputClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>E-mail de Contato</label>
              <input id="contact-email" name="contactEmail" type="email" defaultValue={settings.contactEmail} className={inputClass} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">Breaking News</legend>
          <div className="h-px bg-[var(--color-ink)] mb-4" />
          <div className="space-y-4">
            <div>
              <label htmlFor="breaking-text" className={labelClass}>Texto do Breaking News</label>
              <input id="breaking-text" name="breakingNews" type="text" defaultValue={settings.breakingNews} placeholder="Deixe vazio para desativar" className={`${inputClass} placeholder:text-[var(--color-grey-400)]`} />
            </div>
            <div>
              <label htmlFor="breaking-url" className={labelClass}>Link (opcional)</label>
              <input id="breaking-url" name="breakingNewsUrl" type="url" defaultValue={settings.breakingNewsUrl} placeholder="https://..." className={`${inputClass} placeholder:text-[var(--color-grey-400)]`} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-4">Texto Sobre</legend>
          <div className="h-px bg-[var(--color-ink)] mb-4" />
          <div>
            <label htmlFor="about-text" className={labelClass}>Texto da Página Sobre</label>
            <textarea id="about-text" name="aboutText" rows={6} defaultValue={settings.aboutText} className={`${inputClass} resize-y`} />
          </div>
        </fieldset>

        <button type="submit" disabled={saving} className="px-8 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.15em] uppercase hover:bg-[var(--color-red)] transition-colors disabled:opacity-50">
          {saving ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </form>
    </div>
  );
}
