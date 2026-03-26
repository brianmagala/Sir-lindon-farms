'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const adminLinks = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Products', href: '/admin/products', icon: '📦' },
        { name: 'Farm Records', href: '/admin/records', icon: '📋' },
        { name: 'Contracts', href: '/admin/contracts', icon: '📄' },
        { name: 'Orders', href: '/admin/orders', icon: '🛒' },
        { name: 'Users', href: '/admin/users', icon: '👥' },
        { name: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className={`bg-primary text-accent transition-all ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-4 border-b border-accent/20">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-2xl hover:text-accent-light transition"
                    >
                        {isSidebarOpen ? '←' : '→'}
                    </button>
                </div>
                <nav className="mt-4">
                    {adminLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-primary-dark transition text-accent"
                        >
                            <span className="text-xl">{link.icon}</span>
                            {isSidebarOpen && <span>{link.name}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-50">
                {/* Top Bar */}
                <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <span className="text-gray-600">Admin User</span>
                        <button className="text-primary hover:text-primary-dark font-semibold">Logout</button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}
