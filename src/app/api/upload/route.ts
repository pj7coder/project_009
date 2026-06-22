import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';


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

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create the public/uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Generate unique name
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const fileName = `${timestamp}_${cleanFileName}`;
    const filePath = join(uploadDir, fileName);

    // Save the file to disk
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${fileName}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error('[API/upload POST]', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
