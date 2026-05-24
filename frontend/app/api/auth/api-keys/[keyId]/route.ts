import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { keyId: string } }) {
  try {
    const token = request.headers.get('authorization');
    const keyId = params.keyId;

    const response = await fetch(
      `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/v1/auth/api-keys/${keyId}`,
      {
        method: 'DELETE',
        headers: { Authorization: token || '' },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
