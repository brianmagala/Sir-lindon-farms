'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ShopProduct } from '@/components/ShopProductGrid';

type CartItem = ShopProduct & { quantity: number };

type Props = {
    product: ShopProduct;
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
        // ignore
    }
}

export default function ProductDetailClient({ product }: Props) {
    const router = useRouter();
    const [quantityInCart, setQuantityInCart] = useState(0);

    useEffect(() => {
        const current = getCart();
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
            setQuantityInCart(existing.quantity);
        }
    }, [product.id]);

    const updateCartQuantity = (newQty: number) => {
        const current = getCart();
        const existingIndex = current.findIndex((item) => item.id === product.id);
        if (newQty <= 0) {
            if (existingIndex >= 0) {
                current.splice(existingIndex, 1);
            }
        } else if (existingIndex >= 0) {
            current[existingIndex] = {
                ...current[existingIndex],
                quantity: newQty,
            };
        } else {
            current.push({ ...product, quantity: newQty });
        }
        saveCart(current);
        setQuantityInCart(newQty);
    };

    const handleAddToCart = () => {
        const nextQty = quantityInCart > 0 ? quantityInCart + 1 : 1;
        updateCartQuantity(nextQty);
    };

    const handleIncrease = () => {
        updateCartQuantity(quantityInCart + 1);
    };

    const handleDecrease = () => {
        if (quantityInCart <= 0) return;
        updateCartQuantity(quantityInCart - 1);
    };

    const stock = typeof product.stock === 'number' && product.stock > 0 ? product.stock : 20;
    const maxStock = Math.max(stock, 20);
    const percentage = Math.max(5, Math.min(100, Math.round((stock / maxStock) * 100)));

    const isLowStock = stock <= 2;
    const intensity = stock >= maxStock ? 1 : Math.max(0.2, Math.min(1, stock / maxStock));

    const barColor = isLowStock ? '#dc2626' : `rgba(1, 62, 55, ${intensity})`;
    const labelColor = isLowStock ? 'text-red-600' : 'text-[#013E37]';

    const oldPrice = product.price * 1.3;
    const discountPercent = Math.round(((oldPrice - product.price) / oldPrice) * 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                    ) : (
                        <span className="text-7xl">🥕</span>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="inline-block rounded-full bg-primary text-accent text-xs font-semibold px-3 py-1 mb-3">
                    Tech sale deal
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">{product.name}</h1>
                <p className="text-sm text-gray-600 mb-4">Category: {product.category}</p>

                <div className="bg-[#013E37] text-accent rounded-md px-4 py-3 flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs uppercase tracking-wide opacity-80 mb-1">Flash Sales</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-bold">UGX {product.price.toFixed(0)}</span>
                            <span className="text-xs line-through opacity-70">UGX {oldPrice.toFixed(0)}</span>
                            <span className="text-xs bg-accent text-[#013E37] font-bold px-2 py-0.5 rounded">
                                -{discountPercent}%
                            </span>
                        </div>
                    </div>
                    <div className="text-right text-xs">
                        <p className="font-semibold">Time Left: 01w : 00d : 14h</p>
                    </div>
                </div>

                <div className="mb-4">
                    <p className={`text-xs font-medium mb-1 ${labelColor}`}>{stock} items left</p>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{ width: `${percentage}%`, backgroundColor: barColor }}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-[#013E37] hover:bg-[#02564c] text-white font-semibold py-3 rounded-md transition-transform transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.99]"
                >
                    Add to cart
                </button>

                {quantityInCart > 0 && (
                    <div className="mt-4 flex items-center gap-4">
                        <div className="inline-flex items-center border rounded-md overflow-hidden bg-white">
                            <button
                                type="button"
                                onClick={handleDecrease}
                                className="px-3 py-2 text-lg font-semibold text-white bg-[#013E37] hover:bg-[#02564c]"
                            >
                                -
                            </button>
                            <div className="px-4 py-2 border-l border-r text-sm font-semibold text-gray-800 min-w-[3rem] text-center">
                                {quantityInCart}
                            </div>
                            <button
                                type="button"
                                onClick={handleIncrease}
                                className="px-3 py-2 text-lg font-semibold text-white bg-[#013E37] hover:bg-[#02564c]"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-sm text-gray-700">
                            ({quantityInCart} item{quantityInCart > 1 ? 's' : ''} added)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
