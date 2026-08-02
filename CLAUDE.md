# POV — Point of View | Project Guidelines

## Architecture
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with `@theme` design tokens
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (Auth.js)
- **Smooth Scroll**: Lenis

## Design Principles
- **Vintage newspaper × modern execution**
- Color palette: 90% black/white/paper, 10% dark red (#8B0000)
- Typography: Playfair Display (serif headlines) + Inter (body text)
- Editorial rules, masthead styling, drop caps, category labels
- Avoid: startup aesthetics, SaaS dashboards, bright colors, generic templates

## Coding Conventions
- All visible text in **PT-BR** (Brazilian Portuguese)
- Code and comments in English
- Components use Tailwind utility classes with CSS custom properties for design tokens
- Server Components by default; `'use client'` only when needed
- Mock data in `src/lib/data.ts` (swap to Prisma queries when DB is connected)

## Folder Structure
```
src/
├── app/             # Next.js App Router pages
│   ├── admin/       # CMS admin panel
│   ├── artigo/      # Article pages
│   ├── categoria/   # Category pages
│   ├── podcast/     # Podcast page
│   ├── videos/      # Videos page
│   ├── sobre/       # About page
│   ├── equipe/      # Team page
│   └── login/       # Login page
├── components/
│   ├── layout/      # Navigation, Masthead, Footer, AdminSidebar
│   └── articles/    # ArticleCard, ArticleHero
└── lib/
    ├── data.ts      # Mock data layer
    ├── prisma.ts    # Prisma client singleton
    └── utils.ts     # Utility functions
```

## Important Notes
- `params` in Next.js 15 is a `Promise` — must be `await`ed
- Design tokens defined in `globals.css` `@theme` block
- Admin pages are under `/admin/*` with their own layout
- Articles use `dangerouslySetInnerHTML` for rich content (sanitize in production)
