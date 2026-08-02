import { NextResponse } from 'next/server';
import { articles } from '@/lib/data';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  if (!article) return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 });

  const body = await request.json();
  const updated = { ...articles[idx], ...body };
  articles[idx] = updated;

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 });

  articles.splice(idx, 1);
  return NextResponse.json({ success: true });
}
