import { NextResponse } from 'next/server';
import { videos } from '@/lib/data';
import { slugify, extractYouTubeId } from '@/lib/utils';

let videosStore = [...videos];
let nextId = videos.length + 1;

export async function GET() {
  const sorted = [...videosStore].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, youtubeUrl, category, featured } = body;

  if (!title || !youtubeUrl) {
    return NextResponse.json({ error: 'Título e URL do YouTube são obrigatórios.' }, { status: 400 });
  }

  const newVideo = {
    id: String(nextId++),
    title,
    slug: slugify(title),
    description: description || '',
    youtubeUrl,
    youtubeId: extractYouTubeId(youtubeUrl) || '',
    thumbnail: `https://img.youtube.com/vi/${extractYouTubeId(youtubeUrl) || ''}/hqdefault.jpg`,
    featured: featured || false,
    category: category || '',
    publishedAt: new Date().toISOString(),
  };

  videosStore.unshift(newVideo);
  return NextResponse.json(newVideo, { status: 201 });
}
