import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminShortcutListener from '@/components/AdminShortcutListener';

export const metadata: Metadata = {
    title: 'Sir Lindon Farms - Premium Farm Products',
    description: 'Discover fresh farm products, contracts, and farm achievements from Sir Lindon Farms',
    keywords: ['farm', 'products', 'agriculture', 'fresh produce'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body>
                <AdminShortcutListener />
                <Header />
                <main className="pt-32">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
