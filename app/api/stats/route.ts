import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const stats = await prisma.farmStat.findMany({
            orderBy: { createdAt: 'asc' },
        });
        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { label, value, suffix } = body;

        if (!label || value === undefined) {
            return NextResponse.json({ error: 'Label and value are required' }, { status: 400 });
        }

        const stat = await prisma.farmStat.create({
            data: {
                label,
                value: Number(value),
                suffix: suffix || '',
            },
        });

        return NextResponse.json(stat, { status: 201 });
    } catch (error) {
        console.error('Error creating stat:', error);
        return NextResponse.json({ error: 'Failed to create stat' }, { status: 500 });
    }
}
