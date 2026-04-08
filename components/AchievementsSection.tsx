"use client";
import { useState, useEffect } from 'react';
import CountUp from './CountUp';

interface Stat {
    label: string;
    value: number;
    suffix: string;
}

const defaultStats: Stat[] = [
    { label: 'Tons of Harvest', value: 10000, suffix: '+' },
    { label: 'Units of Cattle', value: 500, suffix: '' },
    { label: 'Hectares of Farm', value: 2500, suffix: '+' },
    { label: 'Years of Experience', value: 25, suffix: '' },
];

const defaultSlideImages = [
    "/images/download (6).jpg",
    "/images/fresh-fruits.jpg",
    "/images/vegetables.jpg",
    "/images/livestock.jpg",
    "/images/diaryproducts.jpg",
    "/images/grains-and-seeds.jpg",
    "/images/spices.jpg"
];

export default function AchievementsSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [dynamicImages, setDynamicImages] = useState<string[]>([]);
    const [dynamicStats, setDynamicStats] = useState<Stat[]>([]);

    useEffect(() => {
        const fetchSliderImages = async () => {
            try {
                const res = await fetch('/api/slider');
                if (res.ok) {
                    const data = await res.json();
                    if (data.items && data.items.length > 0) {
                        setDynamicImages(data.items.map((item: any) => item.url));
                    }
                }
            } catch (err) {
                console.error("Failed to load slider images", err);
            }
        };

        const fetchStats = async () => {
            try {
                const res = await fetch('/api/stats');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setDynamicStats(data);
                    }
                }
            } catch (err) {
                console.error("Failed to load stats", err);
            }
        };

        fetchSliderImages();
        fetchStats();
    }, []);

    const activeImages = dynamicImages.length > 0 ? dynamicImages : defaultSlideImages;
    const activeStats = dynamicStats.length > 0 ? dynamicStats : defaultStats;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [activeImages.length]);

    return (
        <section className="py-16 bg-white animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                    {/* Left Image Section */}
                    <div className="relative animate-slide-in h-full min-h-[400px]">
                        <div className="rounded-lg h-full w-full overflow-hidden shadow-xl cursor-pointer absolute inset-0 group bg-gray-100">
                            {activeImages.map((src, idx) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`Farm Achievements ${idx + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out transform 
                                        ${idx === currentImageIndex ? 'opacity-100 scale-100 group-hover:scale-110 z-10' : 'opacity-0 scale-105 z-0'}
                                    `}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Stats Section */}
                    <div className="animate-fade-up">
                        <h2 className="text-4xl font-bold text-primary mb-4">Our Farm Achievements</h2>
                        <p className="text-gray-600 mb-8">
                            With decades of experience and dedication to sustainable farming, we've grown to become a
                            trusted source for premium farm products. Our numbers speak for our commitment to excellence.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            {activeStats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="animate-fade-up bg-white rounded-lg shadow-sm p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-baseline gap-1">
                                        <CountUp
                                            from={0}
                                            to={stat.value}
                                            separator=","
                                            direction="up"
                                            duration={1.2}
                                            className="text-5xl md:text-6xl font-bold text-primary"
                                        />
                                        {stat.suffix && (
                                            <span className="text-3xl md:text-4xl font-bold text-primary">
                                                {stat.suffix}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
