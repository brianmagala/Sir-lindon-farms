"use client";

import { useEffect, useState } from 'react';
import ShopProductGrid, { ShopProduct } from '@/components/ShopProductGrid';

export default function ShopPageClient() {
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/products');
                if (!res.ok) return;
                const data = await res.json();
                const loaded: ShopProduct[] = (data.products ?? []).map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    category: p.category,
                    imageUrl: p.imageUrl,
                    stock: typeof p.stock === 'number' ? p.stock : undefined,
                }));
                setProducts(loaded);
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        load();
    }, []);

    return (
        <main>
            {/* Hero */}
            <section className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-accent mb-4">Our Farm Products</h1>
                    <p className="text-accent/80">Browse our complete collection of premium farm products</p>
                </div>
            </section>

            {/* Filters & Products */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar - Filters */}
                        <div className="bg-accent/10 p-6 rounded-lg h-fit">
                            <h3 className="font-bold text-primary text-lg mb-4">Filter by Category</h3>
                            <div className="space-y-3">
                                {['Fruits', 'Vegetables', 'Dairy', 'Grains', 'Spices'].map((cat) => (
                                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <span className="text-gray-700">{cat}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t">
                                <h4 className="font-bold text-primary mb-3">Price Range</h4>
                                <input type="range" min="0" max="500" className="w-full" />
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="lg:col-span-3">
                            {isLoading && products.length === 0 ? (
                                <p className="text-gray-500">Loading products...</p>
                            ) : (
                                <ShopProductGrid products={products} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
