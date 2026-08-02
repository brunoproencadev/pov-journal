import type { Metadata } from 'next';
import AdminSidebar from '@/components/layout/AdminSidebar';
import SessionWrapper from '@/components/layout/SessionWrapper';

export const metadata: Metadata = {
  title: {
    default: 'Admin | POV',
    template: '%s — Admin | POV',
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <div className="flex min-h-screen bg-[var(--color-paper)]">
        <AdminSidebar />
        <div className="flex-1 overflow-x-hidden">
          {/* Top bar */}
          <header className="h-14 bg-[var(--color-paper)] border-b border-[var(--color-grey-200)] flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="text-[var(--text-xs)] text-[var(--color-grey-500)] font-medium tracking-wide uppercase">
              Painel Editorial
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-center font-[var(--font-serif)] text-sm font-bold">
                A
              </div>
            </div>
          </header>
          <main className="p-8">{children}</main>
        </div>
      </div>
    </SessionWrapper>
  );
}
