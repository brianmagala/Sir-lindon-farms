'use client';

import { useEffect, useState } from 'react';
import type { ShopProduct } from '@/components/ShopProductGrid';

type CartItem = ShopProduct & { quantity: number };

function loadCart(): CartItem[] {
    try {
        const raw = typeof window !== 'undefined' ? window.localStorage.getItem('cart') : null;
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveCart(items: CartItem[]) {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('cart', JSON.stringify(items));
        }
    } catch {
        // ignore
    }
}

export default function CartClient() {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        setItems(loadCart());
    }, []);

    const updateQuantity = (id: string, newQty: number) => {
        setItems((prev) => {
            const updated = prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(0, newQty) } : item,
                )
                .filter((item) => item.quantity > 0);
            saveCart(updated);
            return updated;
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => {
            const updated = prev.filter((item) => item.id !== id);
            saveCart(updated);
            return updated;
        });
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <main>
            <section className="bg-primary py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-accent">Cart ({itemCount})</h1>
                </div>
            </section>
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    {items.length === 0 ? (
                        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 text-center">
                            <p className="text-gray-600 text-lg mb-4">Your cart is currently empty</p>
                            <a
                                href="/shop"
                                className="inline-block bg-primary text-accent px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
                            >
                                Continue Shopping
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart items list */}
                            <div className="lg:col-span-2 bg-white rounded-lg shadow">
                                <div className="border-b px-6 py-4 flex justify-between items-center">
                                    <h2 className="font-semibold text-primary">Cart ({itemCount})</h2>
                                </div>
                                <ul className="divide-y">
                                    {items.map((item) => (
                                        <li key={item.id} className="px-6 py-4 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                                    {item.imageUrl ? (
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-3xl">🥕</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-primary text-sm md:text-base">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">In stock</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="mt-2 text-xs text-red-500 hover:underline flex items-center gap-1"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <p className="font-semibold text-primary whitespace-nowrap">
                                                    UGX {item.price.toFixed(0)}
                                                </p>
                                                <div className="inline-flex items-center rounded-full overflow-hidden border bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-lg font-semibold text-[#013E37] bg-gray-100 hover:bg-gray-200"
                                                    >
                                                        -
                                                    </button>
                                                    <div className="px-4 text-sm font-semibold text-gray-800">
                                                        {item.quantity}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-lg font-semibold text-white bg-[#013E37] hover:bg-[#02564c]"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Summary panel */}
                            <aside className="bg-white rounded-lg shadow p-6 h-fit">
                                <h2 className="font-semibold text-primary mb-4">Cart Summary</h2>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">UGX {total.toFixed(0)}</span>
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 w-full bg-[#013E37] hover:bg-[#02564c] text-white font-semibold py-3 rounded-md transition"
                                >
                                    Checkout (UGX {total.toFixed(0)})
                                </button>
                            </aside>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
