import { prisma } from '@/lib/prisma';
import ProductDetailClient from '@/components/ProductDetailClient';

interface ProductPageProps {
    params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
    });

    if (!product) {
        return (
            <main className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold text-primary mb-2">Product not found</h1>
                    <p className="text-gray-600 mb-4">The product you are looking for does not exist.</p>
                    <a
                        href="/shop"
                        className="inline-block bg-primary text-accent px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
                    >
                        Back to shop
                    </a>
                </div>
            </main>
        );
    }

    let stock: number | undefined;
    try {
        const rows = await prisma.$queryRaw<{ stock: number | null }[]>`
            SELECT stock FROM products WHERE id = ${product.id}
        `;
        if (rows[0] && typeof rows[0].stock === 'number') {
            stock = rows[0].stock;
        }
    } catch (stockError) {
        console.error('Product detail stock load error:', stockError);
    }

    const detailProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
        stock,
    };

    return (
        <main>
            <section className="bg-primary py-8">
                <div className="container mx-auto px-4">
                    <p className="text-xs text-accent/80 mb-1">
                        Home / Shop / <span className="font-semibold">{product.name}</span>
                    </p>
                    <h1 className="text-3xl font-bold text-accent">Product Details</h1>
                </div>
            </section>
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <ProductDetailClient product={detailProduct} />
                </div>
            </section>
        </main>
    );
}
