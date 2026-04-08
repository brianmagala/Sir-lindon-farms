import HeroSection from '@/components/HeroSection';
import CategoriesGrid from '@/components/CategoriesGrid';
import AchievementsSection from '@/components/AchievementsSection';
import TestimonialSection from '@/components/TestimonialSection';
import ShopProductGrid, { ShopProduct } from '@/components/ShopProductGrid';
import { prisma } from '@/lib/prisma';

export default async function Home() {
    const featuredRaw = await prisma.product.findMany({
        where: { featured: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
    });

    const featuredProducts: ShopProduct[] = featuredRaw.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        description: p.description,
        imageUrl: p.imageUrl,
        stock: typeof (p as any).stock === 'number' ? (p as any).stock : undefined,
    }));

    return (
        <main>
            <HeroSection />
            <CategoriesGrid />
            <AchievementsSection />
            <TestimonialSection />

            {/* Featured Products Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Featured Products</h2>
                        <p className="text-gray-600 text-lg">Check out our latest premium farm products</p>
                    </div>
                    {featuredProducts.length > 0 ? (
                        <ShopProductGrid products={featuredProducts} />
                    ) : (
                        <p className="text-center text-gray-500">
                            No featured products yet. Mark products as featured in the admin dashboard.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}
