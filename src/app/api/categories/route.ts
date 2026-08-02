import { NextResponse } from 'next/server';
import { categories } from '@/lib/data';
import { slugify } from '@/lib/utils';

let categoriesStore = [...categories];
let nextId = categories.length + 1;

export async function GET() {
  return NextResponse.json(categoriesStore);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description } = body;

  if (!name) {
    return NextResponse.json({ error: 'Nome é obrigatório.' }, { status: 400 });
  }

  const newCategory = {
    id: String(nextId++),
    name,
    slug: slugify(name),
    description: description || '',
  };

  categoriesStore.push(newCategory);
  return NextResponse.json(newCategory, { status: 201 });
}
