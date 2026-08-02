'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/data';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsScrolled(currentY > 20);
    if (currentY > 80 && currentY > lastScrollY) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        isScrolled
          ? 'bg-[var(--color-paper)]/95 backdrop-blur-md shadow-sm'
          : 'bg-[var(--color-paper)]'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      role="navigation"
      aria-label="Navegação principal"
    >
      {/* Top rule */}
      <div className="h-[3px] bg-[var(--color-red)]" />

      <div className="max-w-[1200px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)]">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-1.5 group"
            aria-label="POV — Ir para a página inicial"
          >
            <span className="font-[var(--font-serif)] text-2xl font-black tracking-wider leading-none">
              POV
            </span>
            <span className="hidden sm:inline text-[var(--text-xs)] font-medium tracking-[0.15em] uppercase text-[var(--color-grey-500)] group-hover:text-[var(--color-red)] transition-colors">
              Point of View
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6" role="menubar">
            {categories.map((cat) => (
              <li key={cat.slug} role="none">
                <Link
                  href={`/categoria/${cat.slug}`}
                  className="text-[var(--text-xs)] font-semibold tracking-[0.1em] uppercase relative py-1 hover:text-[var(--color-red)] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[var(--color-red)] hover:after:w-full after:transition-all"
                  role="menuitem"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li role="none">
              <Link
                href="/podcast"
                className="text-[var(--text-xs)] font-semibold tracking-[0.1em] uppercase relative py-1 hover:text-[var(--color-red)] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[var(--color-red)] hover:after:w-full after:transition-all"
                role="menuitem"
              >
                Podcast
              </Link>
            </li>
            <li role="none">
              <Link
                href="/videos"
                className="text-[var(--text-xs)] font-semibold tracking-[0.1em] uppercase relative py-1 hover:text-[var(--color-red)] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[var(--color-red)] hover:after:w-full after:transition-all"
                role="menuitem"
              >
                Vídeos
              </Link>
            </li>
            <li role="none">
              <Link
                href="/sobre"
                className="text-[var(--text-xs)] font-semibold tracking-[0.1em] uppercase relative py-1 hover:text-[var(--color-red)] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[var(--color-red)] hover:after:w-full after:transition-all"
                role="menuitem"
              >
                Sobre
              </Link>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            className="flex lg:hidden flex-col gap-[5px] p-2 z-[1001]"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileOpen}
          >
            <span
              className={`block w-[22px] h-[2px] bg-[var(--color-ink)] transition-all origin-center ${
                isMobileOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-[var(--color-ink)] transition-all ${
                isMobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-[var(--color-ink)] transition-all origin-center ${
                isMobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="h-px bg-[var(--color-ink)]" />

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[999] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-[min(320px,85vw)] h-dvh bg-[var(--color-paper)] flex flex-col items-start justify-center px-10 gap-6 border-l border-[var(--color-ink)] z-[1000] transition-transform duration-400 lg:hidden ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categoria/${cat.slug}`}
            className="text-[var(--text-lg)] font-semibold tracking-[0.05em] uppercase hover:text-[var(--color-red)] transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            {cat.name}
          </Link>
        ))}
        <div className="w-12 h-px bg-[var(--color-grey-200)] my-2" />
        <Link
          href="/podcast"
          className="text-[var(--text-lg)] font-semibold tracking-[0.05em] uppercase hover:text-[var(--color-red)] transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          Podcast
        </Link>
        <Link
          href="/videos"
          className="text-[var(--text-lg)] font-semibold tracking-[0.05em] uppercase hover:text-[var(--color-red)] transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          Vídeos
        </Link>
        <Link
          href="/sobre"
          className="text-[var(--text-lg)] font-semibold tracking-[0.05em] uppercase hover:text-[var(--color-red)] transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          Sobre
        </Link>
        <Link
          href="/equipe"
          className="text-[var(--text-lg)] font-semibold tracking-[0.05em] uppercase hover:text-[var(--color-red)] transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          Equipe
        </Link>
      </div>
    </nav>
  );
}
