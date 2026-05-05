'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary text-accent">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Sir. Lindon Farms</h3>
                        <p className="text-accent/80 mb-4">
                            Dedicated to delivering premium farm products with sustainable practices.
                        </p>
                        <div className="flex gap-3">
                            <a href="#facebook" className="hover:text-white transition" aria-label="Facebook">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    className="bi bi-facebook"
                                >
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg>
                            </a>
                            <a href="#instagram" className="hover:text-white transition" aria-label="Instagram">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    className="bi bi-instagram"
                                >
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.942-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.333-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.298c-.04-.851-.174-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.238.42c-.51-.198-1.09-.333-1.942-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.165 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.275-.843.039-1.096.047-3.232.047s-2.39-.008-3.233-.047c-.78-.035-1.203-.165-1.485-.275a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.274-1.485-.04-.843-.047-1.096-.047-3.233 0-2.136.006-2.388.047-3.231.034-.78.165-1.204.274-1.486.145-.373.32-.64.6-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg>
                            </a>
                            <a href="#twitter" className="hover:text-white transition" aria-label="Twitter">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="bi bi-twitter-x"
                                >
                                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                </svg>
                            </a>
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
                                <span className="text-accent/80">+256 7541 58774</span>
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
