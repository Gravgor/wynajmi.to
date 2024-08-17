
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Oględziny zaplanowane dla:', data);

    return new Response(JSON.stringify({ message: 'Oględziny zostały zaplanowane!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Błąd przy zapisywaniu danych:', error);
    return new Response(JSON.stringify({ error: 'Błąd podczas zapisywania danych' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
