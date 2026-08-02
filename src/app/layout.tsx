import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/effects/SmoothScroll';
import ScrollReveal from '@/components/effects/ScrollReveal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'POV — Point of View | Jornal Estudantil',
    template: '%s | POV — Point of View',
  },
  description:
    'A escola sob o olhar de quem a vive. Jornal estudantil independente com notícias, entretenimento, debates, podcast e vídeos.',
  keywords: [
    'POV',
    'Point of View',
    'jornal estudantil',
    'jornalismo escolar',
    'notícias escolares',
    'podcast estudantil',
  ],
  authors: [{ name: 'Equipe POV — Point of View' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'POV — Point of View',
    title: 'POV — Point of View | Jornal Estudantil',
    description:
      'A escola sob o olhar de quem a vive. Jornalismo sério com tom descontraído, feito por alunos.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="paper-texture">
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <ScrollReveal />
        </body>
    </html>
  );
}
