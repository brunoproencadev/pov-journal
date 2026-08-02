import Link from 'next/link';
import { articles, podcasts, videos } from '@/lib/data';
import { getStatusLabel, getStatusColor, formatDate } from '@/lib/utils';

export default function AdminDashboard() {
  const published = articles.filter((a) => a.status === 'PUBLICADO');
  const drafts = articles.filter((a) => a.status === 'RASCUNHO');
  const inReview = articles.filter((a) => a.status === 'EM_REVISAO');
  const scheduled = articles.filter((a) => a.status === 'AGENDADO');

  const stats = [
    { label: 'Total de Artigos', value: articles.length, color: 'bg-[var(--color-ink)]' },
    { label: 'Publicados', value: published.length, color: 'bg-green-800' },
    { label: 'Rascunhos', value: drafts.length, color: 'bg-[var(--color-grey-600)]' },
    { label: 'Em Revisão', value: inReview.length, color: 'bg-yellow-700' },
    { label: 'Agendados', value: scheduled.length, color: 'bg-blue-800' },
    { label: 'Episódios de Podcast', value: podcasts.length, color: 'bg-[var(--color-red)]' },
    { label: 'Vídeos', value: videos.length, color: 'bg-[var(--color-red-dark)]' },
  ];

  const recentArticles = articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-1">
          Painel Editorial
        </h1>
        <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">
          Visão geral do POV — Point of View
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-card">
            <div className={`w-2 h-2 ${stat.color} mb-3`} />
            <div className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-0.5">
              {stat.value}
            </div>
            <div className="text-[var(--text-xs)] text-[var(--color-grey-500)] font-medium tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-10">
        <Link
          href="/admin/articles"
          className="px-5 py-2.5 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors"
        >
          + Novo Artigo
        </Link>
        <Link
          href="/admin/podcast"
          className="px-5 py-2.5 border border-[var(--color-ink)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          + Novo Episódio
        </Link>
        <Link
          href="/admin/videos"
          className="px-5 py-2.5 border border-[var(--color-ink)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          + Novo Vídeo
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Articles */}
        <div className="lg:col-span-2">
          <h2 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-3">
            Artigos Recentes
          </h2>
          <div className="h-px bg-[var(--color-ink)] mb-4" />
          <div className="space-y-0">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-center justify-between py-3 border-b border-[var(--color-grey-200)] last:border-0"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="text-[var(--text-sm)] font-semibold truncate">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-[var(--text-xs)] text-[var(--color-grey-500)]">
                    <span>{article.author.name}</span>
                    <span>•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${getStatusColor(
                    article.status
                  )}`}
                >
                  {getStatusLabel(article.status)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-grey-400)] mb-3">
            Acesso Rápido
          </h2>
          <div className="h-px bg-[var(--color-ink)] mb-4" />
          <div className="space-y-2">
            {[
              { href: '/admin/articles', label: 'Gerenciar Artigos' },
              { href: '/admin/categories', label: 'Gerenciar Categorias' },
              { href: '/admin/media', label: 'Biblioteca de Mídia' },
              { href: '/admin/podcast', label: 'Gerenciar Podcast' },
              { href: '/admin/videos', label: 'Gerenciar Vídeos' },
              { href: '/admin/users', label: 'Gerenciar Usuários' },
              { href: '/admin/settings', label: 'Configurações do Site' },
              { href: '/', label: 'Ver Site Público →' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-3 text-[var(--text-sm)] hover:bg-[var(--color-paper-warm)] hover:text-[var(--color-red)] transition-colors border-l-2 border-transparent hover:border-[var(--color-red)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
