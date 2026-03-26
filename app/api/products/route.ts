import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
    try {
        const baseProducts = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });

        let productsWithStock: any[] = baseProducts as any[];

        try {
            const stockRows = await prisma.$queryRaw<
                { id: string; stock: number | null }[]
            >`SELECT id, stock FROM products`;

            const stockById = new Map<string, number | null>(
                stockRows.map((row) => [row.id, row.stock]),
            );

            productsWithStock = baseProducts.map((p) => ({
                ...p,
                stock: stockById.get(p.id) ?? undefined,
            }));
        } catch (stockError) {
            console.error('GET /api/products stock merge error:', stockError);
        }

        return NextResponse.json({ products: productsWithStock });
    } catch (error) {
        console.error('GET /api/products error:', error);
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, description, price, imageUrl, category, stock } = body;

        if (!name || !category || typeof price !== 'number' || Number.isNaN(price)) {
            return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description: description ?? '',
                price,
                imageUrl,
                category,
            },
        });

        let finalProduct: any = product;

        if (typeof stock === 'number' && !Number.isNaN(stock)) {
            try {
                await prisma.$executeRaw`
                    UPDATE products
                    SET stock = ${stock}
                    WHERE id = ${product.id}
                `;
                finalProduct = { ...product, stock };
            } catch (stockError) {
                console.error('POST /api/products stock update error:', stockError);
            }
        }

        return NextResponse.json({ product: finalProduct }, { status: 201 });
    } catch (error) {
        console.error('POST /api/products error:', error);
        const message =
            error instanceof Error
                ? error.message
                : typeof error === 'string'
                    ? error
                    : 'Unknown error';
        return NextResponse.json(
            { error: 'Failed to create product', detail: message },
            { status: 500 },
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name, description, price, imageUrl, category, stock } = body;

        if (!id) {
            return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
        }

        const product = await prisma.product.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
                ...(price !== undefined && { price }),
                ...(imageUrl !== undefined && { imageUrl }),
                ...(category !== undefined && { category }),
            },
        });

        let finalProduct: any = product;

        if (stock !== undefined && typeof stock === 'number' && !Number.isNaN(stock)) {
            try {
                await prisma.$executeRaw`
                    UPDATE products
                    SET stock = ${stock}
                    WHERE id = ${product.id}
                `;
                finalProduct = { ...product, stock };
            } catch (stockError) {
                console.error('PUT /api/products stock update error:', stockError);
            }
        }

        return NextResponse.json({ product: finalProduct });
    } catch (error) {
        console.error('PUT /api/products error:', error);
        const message =
            error instanceof Error
                ? error.message
                : typeof error === 'string'
                    ? error
                    : 'Unknown error';
        return NextResponse.json(
            { error: 'Failed to update product', detail: message },
            { status: 500 },
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Product id is required' }, { status: 400 });
        }

        await prisma.product.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('DELETE /api/products error:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
