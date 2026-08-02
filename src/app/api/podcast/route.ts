import { NextResponse } from 'next/server';
import { podcasts } from '@/lib/data';
import { slugify } from '@/lib/utils';

let podcastsStore = [...podcasts];
let nextId = podcasts.length + 1;

export async function GET() {
  const sorted = [...podcastsStore].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, description, audioUrl, duration, season, episode, featured } = body;

  if (!title) {
    return NextResponse.json({ error: 'Título é obrigatório.' }, { status: 400 });
  }

  const newEpisode = {
    id: String(nextId++),
    title,
    slug: slugify(title),
    description: description || '',
    audioUrl: audioUrl || '#',
    duration: duration || '00:00',
    season: season || 1,
    episode: episode || podcastsStore.length + 1,
    featured: featured || false,
    publishedAt: new Date().toISOString(),
  };

  podcastsStore.unshift(newEpisode);
  return NextResponse.json(newEpisode, { status: 201 });
}
