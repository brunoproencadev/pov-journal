export default function AdminMediaPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-serif)] text-[var(--text-2xl)] font-bold mb-1">Biblioteca de Mídia</h1>
          <p className="text-[var(--text-sm)] text-[var(--color-grey-600)]">Gerencie imagens e arquivos do jornal</p>
        </div>
        <button className="px-5 py-2.5 bg-[var(--color-red)] text-[var(--color-paper)] text-[var(--text-xs)] font-bold tracking-[0.1em] uppercase hover:bg-[var(--color-red-dark)] transition-colors">
          + Upload
        </button>
      </div>

      {/* Upload area */}
      <div className="border-2 border-dashed border-[var(--color-grey-200)] p-12 text-center mb-8 hover:border-[var(--color-red)] transition-colors cursor-pointer">
        <svg className="w-12 h-12 mx-auto mb-4 text-[var(--color-grey-300)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="text-[var(--text-sm)] text-[var(--color-grey-500)] mb-1">
          Arraste arquivos aqui ou clique para selecionar
        </p>
        <p className="text-[var(--text-xs)] text-[var(--color-grey-400)]">
          PNG, JPG, GIF, WebP — até 5MB
        </p>
      </div>

      {/* Empty state */}
      <div className="text-center py-12 text-[var(--color-grey-400)]">
        <p className="font-[var(--font-serif)] text-[var(--text-lg)] italic">Nenhum arquivo na biblioteca.</p>
        <p className="text-[var(--text-sm)] mt-1">Faça upload de imagens para começar.</p>
      </div>
    </div>
  );
}
