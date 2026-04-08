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

        const sliderDir = path.join(process.cwd(), 'public', 'slider');
        await fs.mkdir(sliderDir, { recursive: true });

        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const fileName = `${Date.now()}-${safeName}`;
        const filePath = path.join(sliderDir, fileName);

        await fs.writeFile(filePath, buffer);

        const url = `/slider/${fileName}`;

        return NextResponse.json({ url, fileName });
    } catch (error) {
        console.error('Slider upload error:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
