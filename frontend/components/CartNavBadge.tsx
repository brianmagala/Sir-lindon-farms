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
            className="relative inline-flex items-center gap-1.5 text-[#013E37] font-semibold hover:text-[#012a26] transition-colors"
        >
            <span className="text-lg flex items-center" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
            </span>
            <span className="relative inline-flex items-center justify-center w-6 h-6 rounded-full border border-[#013E37] bg-[#013E37]/5 ml-[-4px]">
                <span className="text-xs font-bold leading-none">{count}</span>
            </span>
            <span className="text-sm">Cart</span>
        </Link>
    );
}
