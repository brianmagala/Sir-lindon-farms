'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CartNavBadge from '@/components/CartNavBadge';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Achievements', href: '/achievements' },
        { name: 'About', href: '/about' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
            {/* Top Bar */}
            <div className="bg-primary text-accent py-2 px-4">
                <div className="container mx-auto flex justify-between items-center text-sm">
                    <div className="flex gap-4">
                        <span>📞 +1 (234) 567-8900</span>
                        <span>📧 contact@sirlindonfarms.com</span>
                    </div>
                    <div className="flex gap-3">
                        <a href="#facebook" className="hover:text-accent-light">f</a>
                        <a href="#instagram" className="hover:text-accent-light">📷</a>
                        <a href="#twitter" className="hover:text-accent-light">𝕏</a>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="bg-accent">
                <div className="container mx-auto flex justify-between items-center px-4 py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                            <Image
                                src="/sl-logo.png"
                                alt="Sir Lindon Farms logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-primary text-lg">Sir Lindon Farms</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-primary hover:text-primary-dark font-medium transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/login"
                            className="text-primary hover:text-primary-dark font-medium"
                        >
                            Login
                        </Link>
                        <CartNavBadge />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-primary"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-white border-t border-primary/20">
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-primary hover:text-primary-dark font-medium py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="my-2" />
                            <Link href="/login" className="text-primary font-medium py-2">
                                Login
                            </Link>
                            <div className="pt-2">
                                <CartNavBadge />
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
