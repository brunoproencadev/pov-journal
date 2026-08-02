import { NextResponse } from 'next/server';

let settings = {
  siteName: 'POV — Point of View',
  tagline: 'A escola sob o olhar de quem a vive.',
  breakingNews: '',
  breakingNewsUrl: '',
  aboutText: 'POV — Point of View é mais que uma sigla. É o nosso compromisso de mostrar a escola sob o olhar de quem a vive diariamente.',
  contactEmail: 'contato@povjournal.com',
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const body = await request.json();
  settings = { ...settings, ...body };
  return NextResponse.json(settings);
}
