'use client';

import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative w-full h-[500px] md:h-[600px] bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center overflow-hidden">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 600%22%3E%3Crect fill=%22%23FFEFB3%22 width=%221200%22 height=%22600%22/%3E%3C/svg%3E")' }}
            ></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-accent animate-slide-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-sm">
                    Sir Lindon Farms
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-accent/90 max-w-2xl mx-auto animate-fade-in">
                    Premium Farm Products, Sustainable Practices, Exceptional Quality
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/shop"
                        className="bg-accent text-primary px-8 py-3 rounded-lg font-bold shadow-md hover:bg-accent-light hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href="/achievements"
                        className="border-2 border-accent text-accent px-8 py-3 rounded-lg font-bold hover:bg-accent hover:text-primary transform transition-all duration-300 hover:-translate-y-1"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
}
