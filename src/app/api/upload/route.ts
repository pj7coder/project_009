import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { isAuthenticated } = await import('@/lib/auth');
    const authStatus = await isAuthenticated();
    if (!authStatus) {
      console.warn('[API/upload POST] Unauthorized request attempted');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString('base64');
    const fileUrl = `data:${file.type || 'image/jpeg'};base64,${base64String}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('[API/upload POST]', error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Upload failed: ${errMsg}` }, { status: 500 });
  }
}
