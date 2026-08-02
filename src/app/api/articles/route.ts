import { NextResponse } from 'next/server';
import { articles, categories, authors } from '@/lib/data';
import { slugify, calculateReadingTime } from '@/lib/utils';

// In-memory store for demo CRUD (resets on restart)
let articlesStore = [...articles];
let nextId = articles.length + 1;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let filtered = [...articlesStore];

  if (status && status !== 'all') {
    filtered = filtered.filter((a) => a.status === status);
  }
  if (category) {
    filtered = filtered.filter((a) => a.category.slug === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
    );
  }

  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, content, excerpt, categoryId, authorId, status, featured } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json({ error: 'Título, conteúdo e categoria são obrigatórios.' }, { status: 400 });
    }

    const category = categories.find((c) => c.id === categoryId);
    const author = authors.find((a) => a.id === (authorId || '1'));

    if (!category || !author) {
      return NextResponse.json({ error: 'Categoria ou autor inválido.' }, { status: 400 });
    }

    const newArticle = {
      id: String(nextId++),
      title,
      subtitle: subtitle || '',
      slug: slugify(title),
      content,
      excerpt: excerpt || content.replace(/<[^>]*>/g, '').slice(0, 200),
      coverImage: '/images/placeholder.jpg',
      status: status || 'RASCUNHO' as const,
      featured: featured || false,
      readingTime: calculateReadingTime(content),
      publishedAt: status === 'PUBLICADO' ? new Date().toISOString() : '',
      author,
      category,
      tags: body.tags || [],
    };

    articlesStore.unshift(newArticle);

    return NextResponse.json(newArticle, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro ao criar artigo.' }, { status: 500 });
  }
}
