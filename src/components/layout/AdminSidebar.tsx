'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const adminNavItems = [
  { href: '/admin', label: 'Painel', icon: 'dashboard' },
  { href: '/admin/articles', label: 'Artigos', icon: 'articles' },
  { href: '/admin/categories', label: 'Categorias', icon: 'categories' },
  { href: '/admin/media', label: 'Mídia', icon: 'media' },
  { href: '/admin/podcast', label: 'Podcast', icon: 'podcast' },
  { href: '/admin/videos', label: 'Vídeos', icon: 'videos' },
  { href: '/admin/users', label: 'Usuários', icon: 'users' },
  { href: '/admin/settings', label: 'Configurações', icon: 'settings' },
];

function NavIcon({ type }: { type: string }) {
  const cn = 'w-4 h-4';
  switch (type) {
    case 'dashboard':
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>);
    case 'articles':
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>);
    case 'categories':
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>);
    case 'media':
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>);
    case 'podcast':
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /></svg>);
    case 'videos':
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
    case 'users':
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
    case 'settings':
      return (<svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>);
    default:
      return null;
  }
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="w-64 min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] flex flex-col flex-shrink-0">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-[var(--font-serif)] text-xl font-black tracking-wider">
            POV
          </span>
          <span className="text-[var(--text-xs)] text-[var(--color-grey-400)] tracking-[0.1em] uppercase group-hover:text-[var(--color-red-light)] transition-colors">
            Admin
          </span>
        </Link>
        <p className="text-[var(--text-xs)] text-[var(--color-grey-500)] mt-1">
          Painel Editorial
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-0.5">
          {adminNavItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-2.5 text-[var(--text-sm)] transition-colors ${
                    isActive
                      ? 'bg-white/10 text-[var(--color-paper)] border-r-2 border-[var(--color-red)]'
                      : 'text-[var(--color-grey-400)] hover:text-[var(--color-paper)] hover:bg-white/5'
                  }`}
                >
                  <NavIcon type={item.icon} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Footer */}
      <div className="p-6 border-t border-white/10">
        {session?.user && (
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[var(--color-red)] text-[var(--color-paper)] flex items-center justify-center font-[var(--font-serif)] text-sm font-bold flex-shrink-0">
                {session.user.name?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-[var(--text-sm)] font-semibold truncate">{session.user.name}</p>
                <p className="text-[10px] text-[var(--color-grey-500)] truncate">{session.user.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full text-left px-3 py-1.5 text-[var(--text-xs)] text-[var(--color-grey-500)] hover:text-[var(--color-red-light)] hover:bg-white/5 transition-colors"
            >
              Sair da conta
            </button>
          </div>
        )}
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--text-xs)] text-[var(--color-grey-500)] hover:text-[var(--color-paper)] transition-colors"
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Ver site público
        </Link>
      </div>
    </aside>
  );
}
