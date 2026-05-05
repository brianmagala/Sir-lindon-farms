'use client';

import Link from 'next/link';
import GridMotion from '@/components/GridMotion';
import BlurText from '@/components/BlurText';

export default function HeroSection() {
    const farmItems = [
        '🐄', '🌾', '🚜', '🍏', 'Fresh', 'Organic', 'Local',
        '🐔', '🍅', '🌽', '🌻', 'Quality', 'Sustainable', 'Pure',
        '🥕', '🥚', '🥛', '🥬', 'Nature', 'Harvest', 'Healthy',
        '🥩', '🥦', '🧅', '🍓', 'Green', 'Growth', 'Sir Lindon'
    ];

    return (
        <section className="relative w-full h-[500px] md:h-[600px] bg-primary flex items-center justify-center overflow-hidden">
            {/* Background Image/Animation */}
            <GridMotion items={farmItems} gradientColor="transparent" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center text-accent">
                <BlurText
                    text="Sir. Lindon Farms"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-md text-accent z-20"
                />
                <BlurText
                    text="Premium Farm Products, Sustainable Practices, Exceptional Quality"
                    delay={50}
                    animateBy="words"
                    direction="bottom"
                    className="text-xl md:text-2xl mb-10 text-accent/90 max-w-2xl mx-auto drop-shadow-sm font-semibold mt-4"
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/shop"
                        className="bg-accent text-primary px-8 py-3 rounded-lg font-bold shadow-md hover:bg-accent-light hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
                    >
                        <BlurText
                            text="Shop Now"
                            delay={50}
                            animateBy="letters"
                            direction="bottom"
                            className="inline-flex m-0"
                        />
                    </Link>
                    <Link
                        href="/achievements"
                        className="border-2 border-accent text-accent px-8 py-3 rounded-lg font-bold hover:bg-accent hover:text-primary transform transition-all duration-300 hover:-translate-y-1"
                    >
                        <BlurText
                            text="Learn More"
                            delay={50}
                            animateBy="letters"
                            direction="bottom"
                            className="inline-flex m-0"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
