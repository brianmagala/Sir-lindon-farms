'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary text-accent">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Sir Lindon Farms</h3>
                        <p className="text-accent/80 mb-4">
                            Dedicated to delivering premium farm products with sustainable practices.
                        </p>
                        <div className="flex gap-3">
                            <a href="#facebook" className="hover:text-white transition">
                                <Facebook size={20} />
                            </a>
                            <a href="#instagram" className="hover:text-white transition">📷</a>
                            <a href="#twitter" className="hover:text-white transition">𝕏</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-accent/80 hover:text-white transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="text-accent/80 hover:text-white transition">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/achievements"
                                    className="text-accent/80 hover:text-white transition"
                                >
                                    Achievements
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-accent/80 hover:text-white transition">
                                    Gallery
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex gap-2">
                                <Phone size={18} className="flex-shrink-0 mt-0.5" />
                                <span className="text-accent/80">+1 (234) 567-8900</span>
                            </li>
                            <li className="flex gap-2">
                                <Mail size={18} className="flex-shrink-0 mt-0.5" />
                                <span className="text-accent/80">contact@sirlindonfarms.com</span>
                            </li>
                            <li className="flex gap-2">
                                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                                <span className="text-accent/80">123 Farm Lane, Agriculture City</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Newsletter</h4>
                        <p className="text-accent/80 mb-4">Subscribe for farm updates and special offers.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-3 py-2 bg-white/10 text-white placeholder-accent/50 rounded border border-accent/20 focus:outline-none focus:border-accent"
                            />
                            <button
                                type="submit"
                                className="bg-accent text-primary px-4 py-2 rounded font-bold hover:bg-accent-light transition"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-accent/20 pt-8 flex justify-between items-center">
                    <p className="text-accent/80 text-sm">
                        © 2026 Sir Lindon Farms. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm">
                        <Link href="#privacy" className="text-accent/80 hover:text-white transition">
                            Privacy Policy
                        </Link>
                        <Link href="#terms" className="text-accent/80 hover:text-white transition">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
