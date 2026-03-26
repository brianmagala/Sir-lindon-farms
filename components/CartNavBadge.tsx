'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ShopProduct } from '@/components/ShopProductGrid';

type CartItem = ShopProduct & { quantity: number };

export default function CartNavBadge() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const load = () => {
            try {
                const raw = window.localStorage.getItem('cart');
                if (!raw) {
                    setCount(0);
                    return;
                }
                const parsed = JSON.parse(raw);
                if (!Array.isArray(parsed)) {
                    setCount(0);
                    return;
                }
                const total = (parsed as CartItem[]).reduce(
                    (sum, item) => sum + (item.quantity || 0),
                    0,
                );
                setCount(total);
            } catch {
                setCount(0);
            }
        };

        load();
        window.addEventListener('storage', load);
        return () => window.removeEventListener('storage', load);
    }, []);

    return (
        <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 text-[#013E37] font-semibold hover:text-[#012a26] transition-colors"
        >
            <span className="text-lg" aria-hidden="true">
                🛒
            </span>
            <span className="relative inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#013E37] bg-[#013E37]/5">
                <span className="text-xs font-bold">{count}</span>
            </span>
            <span className="text-sm">Cart</span>
        </Link>
    );
}
