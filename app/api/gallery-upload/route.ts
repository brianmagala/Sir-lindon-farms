import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const galleryDir = path.join(process.cwd(), 'public', 'gallery');
        await fs.mkdir(galleryDir, { recursive: true });

        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const fileName = `${Date.now()}-${safeName}`;
        const filePath = path.join(galleryDir, fileName);

        await fs.writeFile(filePath, buffer);

        const url = `/gallery/${fileName}`;

        return NextResponse.json({ url, fileName });
    } catch (error) {
        console.error('Gallery upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
