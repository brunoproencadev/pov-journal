import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Sobre o POV',
  description: 'Conheça a missão, a visão editorial e os valores do POV — Point of View, o jornal estudantil independente.',
};

export default function SobrePage() {
  return (
    <>
      <Navigation />

      <main className="relative z-10 pt-20">
        <div className="max-w-[800px] mx-auto px-[clamp(1.25rem,1rem+2vw,3rem)]">
          {/* Header */}
          <header className="py-12 mb-8">
            <div className="rule-thick mb-6" />
            <span className="text-[var(--text-xs)] font-bold tracking-[0.2em] uppercase text-[var(--color-red)] mb-3 block">
              Institucional
            </span>
            <h1 className="font-[var(--font-serif)] text-[var(--text-3xl)] font-bold leading-tight mb-4">
              Sobre o POV
            </h1>
            <div className="rule-double mt-4" />
          </header>

          {/* Content */}
          <div className="article-content mb-16">
            <p className="drop-cap">
              <strong>POV — Point of View</strong> é mais que uma sigla. É o nosso compromisso de mostrar a escola sob o olhar de quem a vive diariamente. Um jornal estudantil independente que nasce da vontade genuína de dar voz a quem realmente conhece a realidade escolar: os próprios alunos.
            </p>

            <p>
              Com estética clássica e olhar contemporâneo, o POV carrega uma identidade visual baseada em tons de jornal clássico — preto e branco — simbolizando o &quot;Olho&quot; que tudo observa, que tudo questiona e que nunca se contenta com a superfície.
            </p>

            <h2>Missão</h2>
            <blockquote>
              Retratar o cotidiano escolar e o mundo através da perspectiva autêntica e sem filtros dos alunos.
            </blockquote>

            <h2>Linha Editorial</h2>
            <p>
              Nossa linha editorial é guiada por um princípio simples: <em>informar com precisão, conectar com autenticidade</em>. Jornalismo sério com tom descontraído — dos corredores da escola até as grandes questões do mundo.
            </p>
            <p>
              Cada palavra importa, cada fonte é verificada. Mas acreditamos que informação séria não precisa ser chata. Usamos linguagem acessível, humor e referências da cultura jovem para gerar engajamento sem comprometer a qualidade.
            </p>

            <h2>Valores</h2>
            <ul>
              <li><strong>Autenticidade</strong> — Sem filtros, sem intermediários</li>
              <li><strong>Independência</strong> — Liberdade editorial total</li>
              <li><strong>Responsabilidade</strong> — Ética e compromisso com a verdade</li>
              <li><strong>Protagonismo Estudantil</strong> — Pelo aluno, para o aluno, sobre o aluno</li>
              <li><strong>Pensamento Crítico</strong> — Questionando, sempre</li>
            </ul>

            <h2>Pilares de Conteúdo</h2>
            <p>
              O POV se organiza em torno de três pilares editoriais, cada um refletindo uma dimensão da experiência estudantil:
            </p>
            <ul>
              <li><strong>Notícias Escolares</strong> — O que acontece nos corredores, salas de aula e eventos, sob uma ótica interna e autêntica.</li>
              <li><strong>Entretenimento</strong> — Cultura, artes, esportes, tendências e o estilo de vida jovem.</li>
              <li><strong>Debates Mundiais</strong> — Visão crítica sobre política, meio ambiente e sociedade, trazendo temas globais para a realidade do Ensino Médio.</li>
            </ul>

            <h2>Ecossistema Multiplataforma</h2>
            <p>
              O POV não se limita ao texto. Nosso ecossistema inclui:
            </p>
            <ul>
              <li><strong>Blog / Website</strong> — Artigos, crônicas e textos reflexivos</li>
              <li><strong>YouTube</strong> — Conteúdo visual dinâmico e coberturas de eventos</li>
              <li><strong>Podcast (POV Debates)</strong> — Debates sobre temas atuais e cultura jovem</li>
            </ul>

            <h2>Autonomia Estudantil</h2>
            <p>
              Este é um projeto concebido, organizado e executado inteiramente pelos alunos. Sem vínculos institucionais diretos, garantindo a liberdade de expressão e a autenticidade da visão discente. A autogestão prepara os estudantes para os desafios reais do mercado de trabalho e da vida acadêmica.
            </p>

            <div className="pull-quote">
              &ldquo;A escola sob o olhar de quem a vive.&rdquo;
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
