import { authors } from '@/lib/data';

export default function AdminUsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-1">Usuários</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">Gerencie a equipe editorial</p>
        </div>
        <button className="px-5 py-2.5 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors">
          + Novo Usuário
        </button>
      </div>

      <div className="border border-[var(--color-grey-200)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--color-paper-warm)] border-b border-[var(--color-grey-200)]">
              <th className="text-left px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)]">Nome</th>
              <th className="text-left px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)]">Função</th>
              <th className="text-left px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)] hidden md:table-cell">Cargo</th>
              <th className="text-right px-4 py-3 text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase text-[var(--color-grey-500)]">Ações</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((user) => (
              <tr key={user.id} className="border-b border-[var(--color-grey-200)] last:border-0 hover:bg-[var(--color-paper-warm)] transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center justify-center font-[var(--font-serif)] text-sm font-bold flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-[var(--text-sm)]">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-[var(--color-paper-warm)] text-[10px] font-bold tracking-wide uppercase text-[var(--color-grey-600)]">
                    Jornalista
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-sm)] text-[var(--color-grey-600)] hidden md:table-cell">
                  {user.role}
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="px-3 py-1.5 border border-[var(--color-grey-200)] text-[var(--text-xs)] font-semibold uppercase hover:border-[var(--color-ink)] transition-colors">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
