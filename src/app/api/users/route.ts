import { NextResponse } from 'next/server';
import { authors } from '@/lib/data';

export async function GET() {
  return NextResponse.json(authors);
}
