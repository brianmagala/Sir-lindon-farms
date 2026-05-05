import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

const sliderDir = path.join(process.cwd(), 'public', 'slider');

export async function GET() {
    try {
        await fs.mkdir(sliderDir, { recursive: true });
        const files = await fs.readdir(sliderDir).catch(() => [] as string[]);

        const items = files
            // Include common image extensions
            .filter((file) => /\.(png|jpe?g|gif|webp|avif|jfif)$/i.test(file))
            .map((file) => ({
                filename: file,
                url: `/slider/${file}`,
                name: file,
            }));

        return NextResponse.json({ items });
    } catch (error) {
        console.error('Slider list error:', error);
        return NextResponse.json({ error: 'Failed to load slider images' }, { status: 500 });
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

        const filePath = path.join(sliderDir, filename);

        try {
            await fs.unlink(filePath);
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                return NextResponse.json({ ok: true });
            }
            throw err;
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Slider delete error:', error);
        return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
}
