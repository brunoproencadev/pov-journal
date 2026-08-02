/**
 * Mock data layer for POV Journal
 * 
 * This provides seed data that works without a database connection.
 * When PostgreSQL is configured, these will be replaced by Prisma queries.
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  status: 'RASCUNHO' | 'EM_REVISAO' | 'AGENDADO' | 'PUBLICADO';
  featured: boolean;
  featuredOrder?: number;
  readingTime: number;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  author: Author;
  category: Category;
  tags: string[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  slug: string;
  description: string;
  audioUrl: string;
  coverImage?: string;
  duration: string;
  season?: number;
  episode?: number;
  featured: boolean;
  publishedAt: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnail: string;
  featured: boolean;
  category?: string;
  publishedAt: string;
}

// ═══════════════════════════════════════════════════════════════
// AUTHORS
// ═══════════════════════════════════════════════════════════════

export const authors: Author[] = [
  {
    id: '1',
    name: 'Laura Reis',
    role: 'Editora-Chefe',
    bio: 'Coordenação editorial, visão estratégica e liderança do projeto POV.',
  },
  {
    id: '2',
    name: 'Ryan',
    role: 'Cinegrafista / Filmmaker',
    bio: 'Responsável pelo olhar visual, captação de imagens e estética cinematográfica.',
  },
  {
    id: '3',
    name: 'Vinícius',
    role: 'Sonoplastia',
    bio: 'Identidade sonora, captação de áudio e mixagem para podcasts e vídeos.',
  },
  {
    id: '4',
    name: 'Valentina',
    role: 'Edição de Vídeo',
    bio: 'Montagem, ritmo narrativo e finalização de todo o conteúdo audiovisual.',
  },
];

// ═══════════════════════════════════════════════════════════════
// CATEGORIES
// ═══════════════════════════════════════════════════════════════

export const categories: Category[] = [
  {
    id: '1',
    name: 'Notícias Escolares',
    slug: 'noticias-escolares',
    description: 'O que acontece nos corredores, salas de aula e eventos, sob uma ótica interna e autêntica dos próprios estudantes.',
  },
  {
    id: '2',
    name: 'Entretenimento',
    slug: 'entretenimento',
    description: 'Cultura, artes, esportes, tendências e o estilo de vida jovem, conectando a escola com o mundo pop.',
  },
  {
    id: '3',
    name: 'Debates Mundiais',
    slug: 'debates-mundiais',
    description: 'Visão crítica sobre política, meio ambiente e sociedade, trazendo temas globais para a realidade do Ensino Médio.',
  },
];

// ═══════════════════════════════════════════════════════════════
// ARTICLES
// ═══════════════════════════════════════════════════════════════

export const articles: Article[] = [
  {
    id: '1',
    title: 'Semana Cultural 2026: quando a escola vira palco de ideias',
    subtitle: 'Com mais de 30 apresentações, a Semana Cultural trouxe debates, arte e ciência para os corredores da escola — tudo organizado pelos próprios alunos.',
    slug: 'semana-cultural-2026-quando-a-escola-vira-palco-de-ideias',
    excerpt: 'A Semana Cultural deste ano superou todas as expectativas. Com apresentações que iam desde experimentos científicos até performances teatrais, os alunos provaram que protagonismo estudantil não é só discurso.',
    content: `<p>A Semana Cultural deste ano superou todas as expectativas. Com apresentações que iam desde experimentos científicos até performances teatrais, os alunos provaram que protagonismo estudantil não é só discurso — é ação concreta que transforma o ambiente escolar.</p>

<p>Foram cinco dias intensos. O salão principal se transformou em galeria de arte na segunda-feira, em laboratório de ciências na terça, e em arena de debates na quarta. "A gente queria mostrar que escola não é só prova e nota", contou Marina Silva, do 2º ano, uma das organizadoras do evento.</p>

<h2>O destaque ficou para o teatro</h2>

<p>A peça "Vozes do Corredor", escrita e dirigida por alunos do 3º ano, arrancou aplausos e lágrimas da plateia. O espetáculo trazia relatos reais de estudantes sobre suas experiências no Ensino Médio, transformados em cenas teatrais com profundidade e sensibilidade.</p>

<blockquote>"Cada cena era um pedaço da vida de alguém. A gente ria, chorava, se reconhecia. Foi a coisa mais real que já vi na escola." — Pedro Henrique, 1º ano</blockquote>

<p>A professora de Artes, Carla Mendonça, destacou a maturidade dos estudantes: "Eles não precisaram de roteiro externo. As histórias já estavam ali, vividas, sentidas. Eles só precisaram de espaço para contar."</p>

<h2>Ciência com propósito</h2>

<p>Na área de ciências, o projeto "Água Limpa" chamou atenção ao apresentar um sistema de filtragem feito com materiais reciclados. A equipe, formada por cinco alunos do 2º ano, desenvolveu o protótipo ao longo de três meses.</p>

<p>"Nosso objetivo não era ganhar prêmio. Era mostrar que soluções simples podem ter impacto real na comunidade", explicou João Victor, líder do projeto.</p>

<h2>O que fica</h2>

<p>Mais do que um evento no calendário escolar, a Semana Cultural de 2026 deixou uma mensagem clara: quando os estudantes têm voz e espaço, o resultado vai muito além do esperado. As paredes da escola ganharam cor, os corredores ganharam vida, e a comunidade escolar ganhou orgulho.</p>

<p>A próxima edição já está sendo planejada — desta vez, com a promessa de abrir espaço para apresentações de ex-alunos e da comunidade do entorno.</p>`,
    coverImage: '/images/semana-cultural.jpg',
    status: 'PUBLICADO',
    featured: true,
    featuredOrder: 1,
    readingTime: 5,
    publishedAt: '2026-06-18T10:00:00Z',
    author: authors[0],
    category: categories[0],
    tags: ['Semana Cultural', 'Protagonismo', 'Arte', 'Ciência'],
  },
  {
    id: '2',
    title: 'Inteligência artificial no Ensino Médio: ferramenta ou ameaça?',
    subtitle: 'Alunos e professores divergem sobre o uso da IA em sala de aula. Ouvimos os dois lados para entender onde estamos e para onde vamos.',
    slug: 'inteligencia-artificial-no-ensino-medio-ferramenta-ou-ameaca',
    excerpt: 'O debate sobre inteligência artificial chegou aos corredores da escola com força total. Enquanto alguns professores veem com desconfiança, muitos alunos já incorporaram ferramentas de IA no dia a dia.',
    content: `<p>O debate sobre inteligência artificial chegou aos corredores da escola com força total. Enquanto alguns professores veem com desconfiança, muitos alunos já incorporaram ferramentas de IA no dia a dia acadêmico — e a fronteira entre uso legítimo e plágio nunca foi tão nebulosa.</p>

<p>"Eu uso IA para organizar minhas ideias, não para pensar por mim", defende Ana Clara, do 3º ano. "É como usar uma calculadora: você ainda precisa saber o que está fazendo."</p>

<h2>O lado dos professores</h2>

<p>Do outro lado do debate, o professor de Redação, Marcos Oliveira, expressa uma preocupação legítima: "O problema não é a ferramenta em si. É que muitos alunos ainda não desenvolveram pensamento crítico suficiente para usar IA de forma responsável."</p>

<blockquote>"Precisamos ensinar nossos alunos a pensar com a IA, não a delegar o pensamento para ela." — Prof. Marcos Oliveira</blockquote>

<p>A coordenação pedagógica da escola está em processo de criar diretrizes claras sobre o uso de inteligência artificial em trabalhos e avaliações. A expectativa é que as novas regras sejam implementadas no próximo semestre.</p>

<h2>O que dizem os dados</h2>

<p>Uma pesquisa informal realizada pelo POV com 150 alunos revelou números interessantes: 78% já usaram alguma ferramenta de IA para estudos, 45% consideram que a IA melhorou suas notas, e apenas 12% acreditam que ela pode substituir completamente o professor.</p>

<p>O debate continua aberto — e talvez essa seja a parte mais importante. Em um mundo onde a tecnologia avança mais rápido que a regulação, o diálogo entre alunos, professores e família é mais necessário do que nunca.</p>`,
    coverImage: '/images/ia-escola.jpg',
    status: 'PUBLICADO',
    featured: true,
    featuredOrder: 2,
    readingTime: 4,
    publishedAt: '2026-06-17T14:00:00Z',
    author: authors[0],
    category: categories[2],
    tags: ['Inteligência Artificial', 'Educação', 'Tecnologia', 'Debate'],
  },
  {
    id: '3',
    title: 'Os 10 álbuns que estão dominando os fones do Ensino Médio',
    subtitle: 'De Kendrick Lamar a artistas indie brasileiros, a playlist do EM é mais diversa do que você imagina.',
    slug: 'os-10-albuns-que-estao-dominando-os-fones-do-ensino-medio',
    excerpt: 'Fizemos uma pesquisa com mais de 200 alunos para descobrir o que está tocando nos corredores. O resultado? Uma mistura surpreendente de gêneros, nacionalidades e atitudes.',
    content: `<p>Fizemos uma pesquisa com mais de 200 alunos para descobrir o que está tocando nos corredores. O resultado? Uma mistura surpreendente de gêneros, nacionalidades e atitudes. A geração que vive com fones de ouvido tem um gosto musical mais eclético do que qualquer geração anterior.</p>

<h2>1. Kendrick Lamar — "GNX"</h2>
<p>Líder disparado da pesquisa. O álbum que redefiniu o hip-hop em 2025 continua reverberando nos corredores. "As letras fazem a gente pensar", disse Lucas, do 2º ano.</p>

<h2>2. Liniker — "Caju"</h2>
<p>A voz potente de Liniker conquistou até quem não ouvia MPB. "Descobri que música brasileira pode ser moderna", confessou Beatriz, do 1º ano.</p>

<h2>3. Billie Eilish — "Hit Me Hard and Soft"</h2>
<p>A estética sonora de Billie continua fascinando. O álbum, mais maduro e experimental, dividiu opiniões, mas ganhou respeito.</p>

<h2>4. Matuê — "333"</h2>
<p>O trap brasileiro segue forte. Matuê é unanimidade entre os mais novos e polêmica entre os veteranos do 3º ano.</p>

<h2>5. Tyler, The Creator — "Chromakopia"</h2>
<p>Complexidade lírica e produção impecável. "Tyler é arte", resumiu Gabriel, do 3º ano.</p>

<p>A lista completa inclui ainda nomes como Rosalía, Bad Bunny, Ana Frango Elétrico, Beyoncé e Mac DeMarco — provando que os corredores da escola são, na verdade, um festival de música em câmera lenta.</p>`,
    coverImage: '/images/musica-em.jpg',
    status: 'PUBLICADO',
    featured: false,
    readingTime: 3,
    publishedAt: '2026-06-16T09:00:00Z',
    author: authors[3],
    category: categories[1],
    tags: ['Música', 'Cultura', 'Entretenimento', 'Playlist'],
  },
  {
    id: '4',
    title: 'Grêmio estudantil: por que ninguém se candidata?',
    subtitle: 'A participação política dentro da escola está em baixa. Conversamos com alunos para entender o que está por trás do desinteresse.',
    slug: 'gremio-estudantil-por-que-ninguem-se-candidata',
    excerpt: 'As eleições para o grêmio estudantil tiveram a menor participação em cinco anos. O que está acontecendo com a representação estudantil?',
    content: `<p>As eleições para o grêmio estudantil tiveram a menor participação em cinco anos. Apenas duas chapas se inscreveram, e o comparecimento nas urnas não chegou a 40% dos alunos. O que está acontecendo com a representação estudantil?</p>

<p>"Sinceramente? Ninguém acredita que o grêmio pode mudar alguma coisa", desabafou Fernanda, do 2º ano. A frase pode soar pessimista, mas reflete um sentimento compartilhado por muitos.</p>

<h2>O problema é estrutural</h2>

<p>Professores e coordenadores reconhecem que o grêmio historicamente teve pouca autonomia real. "As decisões importantes são tomadas pela direção. O grêmio acaba sendo decorativo", admitiu um professor que preferiu não se identificar.</p>

<blockquote>"Se queremos que os alunos participem, precisamos dar a eles poder real de decisão. Não dá para pedir engajamento e não entregar autonomia."</blockquote>

<p>A nova gestão do grêmio promete mudar esse cenário. Entre as propostas, estão a criação de um canal direto com a coordenação e a realização de assembleias mensais abertas a todos os alunos.</p>

<p>O POV acompanhará de perto os próximos passos e cobrará — com a devida responsabilidade jornalística — os resultados prometidos.</p>`,
    coverImage: '/images/gremio.jpg',
    status: 'PUBLICADO',
    featured: false,
    readingTime: 4,
    publishedAt: '2026-06-15T11:00:00Z',
    author: authors[0],
    category: categories[0],
    tags: ['Grêmio', 'Política Estudantil', 'Democracia', 'Participação'],
  },
  {
    id: '5',
    title: 'Crise climática: o que a nossa geração pode (e deve) fazer',
    subtitle: 'Entre a ansiedade climática e a ação concreta, os jovens buscam seu papel na luta ambiental.',
    slug: 'crise-climatica-o-que-a-nossa-geracao-pode-e-deve-fazer',
    excerpt: 'A crise climática não é mais uma previsão — é uma realidade que afeta o cotidiano de milhões. E os jovens estão no centro dessa questão, tanto como vítimas quanto como potenciais agentes de mudança.',
    content: `<p>A crise climática não é mais uma previsão — é uma realidade que afeta o cotidiano de milhões. Enchentes no Sul, secas no Norte, temperaturas recordes em São Paulo. E os jovens estão no centro dessa questão, tanto como vítimas quanto como potenciais agentes de mudança.</p>

<p>"Eu sinto um misto de raiva e impotência", confessa Mariana, do 3º ano. "As decisões que vão definir o nosso futuro estão sendo tomadas por pessoas que não vão viver as consequências."</p>

<h2>Da ansiedade à ação</h2>

<p>O termo "eco-ansiedade" já é familiar para muitos adolescentes. Uma pesquisa recente mostrou que 75% dos jovens brasileiros entre 16 e 24 anos se sentem ansiosos em relação ao futuro do planeta.</p>

<blockquote>"Não podemos nos dar ao luxo do cinismo. A apatia é um privilégio que a nossa geração não tem." — Greta Thunberg</blockquote>

<p>Mas a ansiedade também pode ser motor. Na nossa escola, um grupo de alunos criou o projeto "Corredor Verde", transformando áreas ociosas em pequenas hortas e jardins. "É pouco? Talvez. Mas é honesto", defende Caio, do 1º ano, um dos fundadores.</p>

<h2>O papel da educação</h2>

<p>Especialistas apontam que a educação ambiental nas escolas ainda é superficial. "Não basta falar sobre reciclagem. Precisamos discutir sistemas econômicos, justiça climática, e o papel político da ciência", argumenta a professora de Geografia, Daniela Souza.</p>

<p>O debate sobre clima não é apenas ambiental — é social, econômico e profundamente político. E se há um lugar onde esse debate precisa acontecer com profundidade, é na escola.</p>`,
    coverImage: '/images/clima.jpg',
    status: 'PUBLICADO',
    featured: true,
    featuredOrder: 3,
    readingTime: 5,
    publishedAt: '2026-06-14T08:00:00Z',
    author: authors[0],
    category: categories[2],
    tags: ['Clima', 'Meio Ambiente', 'Sustentabilidade', 'Juventude'],
  },
  {
    id: '6',
    title: 'O fenômeno do cinema asiático entre os jovens brasileiros',
    subtitle: 'De "Parasita" a dramas coreanos, a Ásia domina as telas — e as conversas nos intervalos.',
    slug: 'o-fenomeno-do-cinema-asiatico-entre-os-jovens-brasileiros',
    excerpt: 'O cinema asiático deixou de ser nicho para se tornar mainstream entre os jovens brasileiros. K-dramas, anime e filmes coreanos são assuntos recorrentes nos corredores.',
    content: `<p>O cinema asiático deixou de ser nicho para se tornar mainstream entre os jovens brasileiros. Se antes era necessário buscar em sites obscuros, hoje as plataformas de streaming oferecem catálogos imensos de produções coreanas, japonesas e tailandesas.</p>

<p>"Comecei assistindo K-drama por curiosidade. Hoje assisto mais conteúdo coreano do que brasileiro", conta Sofia, do 2º ano.</p>

<h2>Mais do que entretenimento</h2>

<p>O interesse pelo cinema asiático vai além da diversão. Muitos alunos relatam que as produções trouxeram uma nova perspectiva sobre cultura, sociedade e até sobre si mesmos.</p>

<blockquote>"Parasita mudou minha forma de ver desigualdade. Não é só um filme — é uma aula." — Thiago, 3º ano</blockquote>

<p>Professores de Literatura e Sociologia já começaram a incorporar filmes asiáticos em suas aulas, aproveitando o interesse dos alunos para aprofundar discussões sobre classe social, tradição versus modernidade, e globalização cultural.</p>

<p>A influência se estende para a música (K-pop), a gastronomia (ramen, kimchi) e até para a moda. A "onda coreana" não é passageira — é uma revolução cultural silenciosa que está redefinindo o gosto de uma geração.</p>`,
    coverImage: '/images/cinema-asiatico.jpg',
    status: 'PUBLICADO',
    featured: false,
    readingTime: 3,
    publishedAt: '2026-06-13T15:00:00Z',
    author: authors[3],
    category: categories[1],
    tags: ['Cinema', 'Cultura', 'K-drama', 'Entretenimento'],
  },
  {
    id: '7',
    title: 'Professor destaque: entrevista com Marcos Oliveira',
    subtitle: 'O professor de Redação que transformou a forma como os alunos veem a escrita.',
    slug: 'professor-destaque-entrevista-com-marcos-oliveira',
    excerpt: 'Conhecido por suas aulas criativas e pela paciência infinita, o professor Marcos é um dos mais queridos da escola. Conversamos com ele sobre educação, escrita e o futuro.',
    content: `<p>Conhecido por suas aulas criativas e pela paciência infinita, o professor Marcos Oliveira é um dos mais queridos da escola. Em uma conversa franca com o POV, ele falou sobre educação, escrita, e por que acredita que todo aluno é um escritor em potencial.</p>

<h2>POV: Como você define seu estilo de ensino?</h2>

<p><strong>Marcos:</strong> Eu tento criar um ambiente onde errar é permitido. A escrita é um processo, não um produto. Quando o aluno entende que o primeiro rascunho é sempre ruim — e que isso é normal — ele se liberta.</p>

<h2>POV: Qual o maior desafio de ensinar Redação hoje?</h2>

<p><strong>Marcos:</strong> Competir com a pressa. Os alunos querem resultados imediatos, e a escrita exige tempo. Exige sentar, pensar, reescrever. Numa era de stories e tweets, isso é contracultural.</p>

<blockquote>"Escrever bem é um ato de resistência contra a superficialidade." — Prof. Marcos Oliveira</blockquote>

<h2>POV: O que você acha do POV como projeto?</h2>

<p><strong>Marcos:</strong> Eu acho fundamental. A escola precisa de vozes jovens, organizadas, responsáveis. O POV não é apenas um jornal — é um exercício de cidadania. E eu tenho orgulho de ver meus alunos participando.</p>

<p>A entrevista completa será publicada em formato de vídeo no canal do POV no YouTube. Fiquem atentos!</p>`,
    coverImage: '/images/professor-marcos.jpg',
    status: 'PUBLICADO',
    featured: false,
    readingTime: 4,
    publishedAt: '2026-06-12T10:00:00Z',
    author: authors[0],
    category: categories[0],
    tags: ['Entrevista', 'Professores', 'Educação', 'Redação'],
  },
  {
    id: '8',
    title: 'Olimpíadas de Matemática: escola classifica 12 alunos',
    subtitle: 'Resultado histórico coloca a escola entre as melhores do estado na competição nacional.',
    slug: 'olimpiadas-de-matematica-escola-classifica-12-alunos',
    excerpt: 'Em um resultado histórico, 12 alunos da nossa escola avançaram para a fase estadual das Olimpíadas Brasileiras de Matemática. É o melhor desempenho em mais de uma década.',
    content: `<p>Em um resultado histórico, 12 alunos da nossa escola avançaram para a fase estadual das Olimpíadas Brasileiras de Matemática. É o melhor desempenho em mais de uma década, superando o recorde anterior de 8 classificados em 2019.</p>

<p>"Foi fruto de muito trabalho, mas também de um ambiente que valoriza o esforço intelectual", comemora a professora de Matemática, Renata Torres, que coordenou a preparação dos alunos.</p>

<h2>Preparação intensa</h2>

<p>Os alunos participaram de sessões extras de estudo durante três meses, incluindo simulados aos sábados e resolução de provas antigas. "Não foi fácil, mas foi divertido. A gente formou um grupo que realmente se apoiava", contou Isabella, do 2º ano, uma das classificadas.</p>

<p>A escola agora se prepara para a fase estadual, marcada para agosto. A expectativa é de que pelo menos 3 alunos avancem para a fase nacional.</p>

<p>O POV parabeniza todos os classificados e deseja boa sorte na próxima etapa. Protagonismo se constrói também com dedicação e disciplina.</p>`,
    coverImage: '/images/olimpiadas-mat.jpg',
    status: 'PUBLICADO',
    featured: false,
    readingTime: 3,
    publishedAt: '2026-06-11T13:00:00Z',
    author: authors[0],
    category: categories[0],
    tags: ['Olimpíadas', 'Matemática', 'Conquistas', 'Acadêmico'],
  },
];

// ═══════════════════════════════════════════════════════════════
// PODCASTS
// ═══════════════════════════════════════════════════════════════

export const podcasts: PodcastEpisode[] = [
  {
    id: '1',
    title: 'POV Debates #1 — Saúde mental na escola: por que ninguém fala sobre isso?',
    slug: 'pov-debates-1-saude-mental-na-escola',
    description: 'No episódio inaugural do POV Debates, discutimos um tema urgente: a saúde mental dos estudantes. Com depoimentos anônimos e a participação da psicóloga escolar, abordamos ansiedade, pressão acadêmica e a importância do acolhimento.',
    audioUrl: '#',
    duration: '42:15',
    season: 1,
    episode: 1,
    featured: true,
    publishedAt: '2026-06-10T10:00:00Z',
  },
  {
    id: '2',
    title: 'POV Debates #2 — Celular em sala de aula: proibir ou integrar?',
    slug: 'pov-debates-2-celular-em-sala-de-aula',
    description: 'O celular é vilão ou aliado? Neste episódio, ouvimos alunos, professores e a coordenação para entender os dois lados do debate mais polêmico dos corredores.',
    audioUrl: '#',
    duration: '38:30',
    season: 1,
    episode: 2,
    featured: false,
    publishedAt: '2026-06-03T10:00:00Z',
  },
  {
    id: '3',
    title: 'POV Debates #3 — Vestibular ou mercado de trabalho?',
    slug: 'pov-debates-3-vestibular-ou-mercado',
    description: 'A pressão por decidir o futuro aos 17 anos é real. Conversamos com ex-alunos que seguiram caminhos diferentes e compartilharam suas experiências sem filtros.',
    audioUrl: '#',
    duration: '45:00',
    season: 1,
    episode: 3,
    featured: false,
    publishedAt: '2026-05-27T10:00:00Z',
  },
];

// ═══════════════════════════════════════════════════════════════
// VIDEOS
// ═══════════════════════════════════════════════════════════════

export const videos: Video[] = [
  {
    id: '1',
    title: 'Bastidores da Semana Cultural 2026',
    slug: 'bastidores-semana-cultural-2026',
    description: 'Acompanhe os bastidores da maior Semana Cultural da história da escola. Da montagem ao grand finale, capturamos cada momento.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/video-semana.jpg',
    featured: true,
    category: 'Cobertura',
    publishedAt: '2026-06-19T12:00:00Z',
  },
  {
    id: '2',
    title: 'Um dia na vida de um aluno do 3º ano',
    slug: 'um-dia-na-vida-aluno-3o-ano',
    description: 'Documentário curto que acompanha um aluno do terceiro ano em um dia típico: das 6h às 22h, entre aulas, simulados, sonhos e incertezas.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/video-dia-vida.jpg',
    featured: false,
    category: 'Documentário',
    publishedAt: '2026-06-12T12:00:00Z',
  },
  {
    id: '3',
    title: 'Entrevista: O novo grêmio estudantil',
    slug: 'entrevista-novo-gremio-estudantil',
    description: 'Entrevista exclusiva com os membros do novo grêmio estudantil. O que eles planejam? O que prometem mudar? Cobramos respostas.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/video-gremio.jpg',
    featured: false,
    category: 'Entrevista',
    publishedAt: '2026-06-05T12:00:00Z',
  },
  {
    id: '4',
    title: 'POV Shorts: Intervalos pelo Brasil',
    slug: 'pov-shorts-intervalos-pelo-brasil',
    description: 'Compilação de vídeos curtos mostrando como são os intervalos em escolas de diferentes estados brasileiros. Um retrato divertido e diverso.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: '/images/video-shorts.jpg',
    featured: false,
    category: 'Shorts',
    publishedAt: '2026-05-29T12:00:00Z',
  },
];

// ═══════════════════════════════════════════════════════════════
// QUERY HELPERS
// ═══════════════════════════════════════════════════════════════

export function getPublishedArticles(): Article[] {
  return articles
    .filter(a => a.status === 'PUBLICADO')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedArticles(): Article[] {
  return articles
    .filter(a => a.featured && a.status === 'PUBLICADO')
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles
    .filter(a => a.category.slug === categorySlug && a.status === 'PUBLICADO')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getRelatedArticles(articleId: string, categoryId: string, limit: number = 3): Article[] {
  return articles
    .filter(a => a.id !== articleId && a.category.id === categoryId && a.status === 'PUBLICADO')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getFeaturedPodcast(): PodcastEpisode | undefined {
  return podcasts.find(p => p.featured);
}

export function getFeaturedVideo(): Video | undefined {
  return videos.find(v => v.featured);
}
