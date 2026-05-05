'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
    image?: string;
}

const categories: Category[] = [
    {
        id: 'fruits',
        name: 'Fresh Fruits',
        icon: '🍎',
        image: '/images/fresh-fruits.jpg',
        description: 'Premium selection of fresh fruits from our orchards',
    },
    {
        id: 'vegetables',
        name: 'Vegetables',
        icon: '🥬',
        image: '/images/vegetables.jpg',
        description: 'Organic vegetables grown with sustainable practices',
    },
    {
        id: 'livestock',
        name: 'Livestock',
        icon: '🐄',
        image: '/images/livestock.jpg',
        description: 'Quality livestock and farm animals',
    },
    {
        id: 'dairy',
        name: 'Dairy Products',
        icon: '🥛',
        image: '/images/diaryproducts.jpg',
        description: 'Fresh dairy products from our farms',
    },
    {
        id: 'grains',
        name: 'Grains & Seeds',
        icon: '🌾',
        image: '/images/grains-and-seeds.jpg',
        description: 'Premium grains and quality seeds',
    },
    {
        id: 'spices',
        name: 'Spices',
        icon: '🌶️',
        image: '/images/spices.jpg',
        description: 'Aromatic spices and seasonings',
    },
];

export default function CategoriesGrid() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section className="py-16 bg-accent/20 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 animate-fade-up">
                    <h2 className="text-4xl font-bold text-primary mb-4">What We Offer</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our diverse range of farm products and services
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/shop?category=${category.id}`}>
                            <div
                                className="group cursor-pointer"
                                onMouseEnter={() => setHoveredId(category.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                                    {/* Background */}
                                    <div
                                        className={`absolute inset-0 ${hoveredId === category.id ? 'scale-110' : 'scale-100'
                                            } transition-transform duration-300 overflow-hidden`}
                                    >
                                        {category.image ? (
                                            <>
                                                <Image
                                                    src={category.image}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-black/0" />
                                            </>
                                        ) : (
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    background: `linear-gradient(135deg, ${['#013E37', '#1A5A52', '#0A2B28'][Math.floor(Math.random() * 3)]} 0%, ${['#FFEFB3', '#FFE680', '#FFF8D6'][Math.floor(Math.random() * 3)]} 100%)`,
                                                }}
                                            ></div>
                                        )}
                                    </div>

                                    {/* Icon only for non-image categories */}
                                    {!category.image && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
                                            <div className="text-6xl mb-3 animate-float group-hover:animate-none">{category.icon}</div>
                                        </div>
                                    )}

                                    {/* Hover Overlay */}
                                    {hoveredId === category.id && (
                                        <div className="absolute inset-0 bg-primary/80 flex flex-col items-center justify-center text-center p-4 animate-fade-in">
                                            <h3 className="text-2xl font-bold text-accent mb-2">{category.name}</h3>
                                            <p className="text-accent/90 mb-4">{category.description}</p>
                                            <span className="text-accent font-bold">Discover More →</span>
                                        </div>
                                    )}
                                </div>

                                {/* Title below card */}
                                <div className="mt-3 text-center">
                                    <h3 className="text-lg font-semibold text-primary">{category.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
