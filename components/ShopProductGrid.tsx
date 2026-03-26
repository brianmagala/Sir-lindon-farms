'use client';

import { useRouter } from 'next/navigation';

export type ShopProduct = {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl?: string | null;
    stock?: number | null;
};

type CartItem = ShopProduct & { quantity: number };

type Props = {
    products: ShopProduct[];
};

function getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem('cart');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed;
    } catch {
        return [];
    }
}

function saveCart(items: CartItem[]) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem('cart', JSON.stringify(items));
    } catch {
        // ignore storage errors
    }
}

export default function ShopProductGrid({ products }: Props) {
    const router = useRouter();

    const handleOpenDetails = (product: ShopProduct) => {
        router.push(`/shop/${product.id}`);
    };

    const handleBuy = (product: ShopProduct) => {
        const current = getCart();
        const existingIndex = current.findIndex((item) => item.id === product.id);
        if (existingIndex >= 0) {
            current[existingIndex] = {
                ...current[existingIndex],
                quantity: current[existingIndex].quantity + 1,
            };
        } else {
            current.push({ ...product, quantity: 1 });
        }
        saveCart(current);
        router.push('/cart');
    };

    if (!products || products.length === 0) {
        return (
            <p className="text-gray-600">No products available yet. Please check back soon.</p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                // Derive a simple "items left" value for display. If no stock is set,
                // show a reasonable default so the UI still looks good.
                <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition transform group cursor-pointer"
                    onClick={() => handleOpenDetails(product)}
                >
                    <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-5xl overflow-hidden">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                        ) : (
                            <span className="transform transition-transform duration-300 group-hover:scale-110">
                                🥕
                            </span>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-primary/70 mb-1">{product.category}</p>
                        <h3 className="font-bold text-primary mb-2">{product.name}</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBuy(product);
                                }}
                                className="bg-primary text-accent px-3 py-2 rounded font-semibold hover:bg-primary-dark transition text-sm inline-flex items-center justify-center"
                            >
                                Buy
                            </button>
                        </div>
                        {(() => {
                            const stock = typeof product.stock === 'number' && product.stock > 0 ? product.stock : 20;
                            const maxStock = Math.max(stock, 20);
                            const percentage = Math.max(5, Math.min(100, Math.round((stock / maxStock) * 100)));

                            const isLowStock = stock <= 2;
                            const intensity = stock >= maxStock
                                ? 1
                                : Math.max(0.2, Math.min(1, stock / maxStock));

                            const barColor = isLowStock
                                ? '#dc2626' // red when only a couple items left
                                : `rgba(1, 62, 55, ${intensity})`; // #013E37 with varying opacity

                            const labelColor = isLowStock ? 'text-red-600' : 'text-[#013E37]';

                            return (
                                <div className="mt-3">
                                    <p className={`text-xs font-medium mb-1 ${labelColor}`}>
                                        {stock} items left
                                    </p>
                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: `${percentage}%`, backgroundColor: barColor }}
                                        />
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            ))}
        </div>
    );
}
