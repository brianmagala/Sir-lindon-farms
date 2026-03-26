import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

const galleryDir = path.join(process.cwd(), 'public', 'gallery');

export async function GET() {
    try {
        const files = await fs.readdir(galleryDir).catch(() => [] as string[]);

        const items = files
            // Include common image extensions plus JFIF used by some cameras/phones
            .filter((file) => /\.(png|jpe?g|gif|webp|avif|jfif)$/i.test(file))
            .map((file) => ({
                filename: file,
                url: `/gallery/${file}`,
                name: file,
            }));

        return NextResponse.json({ items });
    } catch (error) {
        console.error('Gallery list error:', error);
        return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const filename = searchParams.get('file');

        if (!filename) {
            return NextResponse.json({ error: 'File parameter is required' }, { status: 400 });
        }

        // Basic safety: prevent path traversal
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return NextResponse.json({ error: 'Invalid file name' }, { status: 400 });
        }

        const filePath = path.join(galleryDir, filename);

        try {
            await fs.unlink(filePath);
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                // File already gone; treat as success
                return NextResponse.json({ ok: true });
            }
            throw err;
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Gallery delete error:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
