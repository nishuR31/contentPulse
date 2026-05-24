import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    const searchParams = request.nextUrl.searchParams;

    const url = new URL(`${process.env.BACKEND_URL || 'http://localhost:5000'}/api/v1/insights`);
    if (searchParams.get('startDate')) {
      url.searchParams.set('startDate', searchParams.get('startDate')!);
    }
    if (searchParams.get('endDate')) {
      url.searchParams.set('endDate', searchParams.get('endDate')!);
    }

    const response = await fetch(url.toString(), {
      headers: { 'X-API-Key': apiKey || '' },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
