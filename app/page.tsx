import HeroSection from '@/components/HeroSection';
import CategoriesGrid from '@/components/CategoriesGrid';
import AchievementsSection from '@/components/AchievementsSection';
import TestimonialSection from '@/components/TestimonialSection';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <CategoriesGrid />
            <AchievementsSection />
            <TestimonialSection />

            {/* Featured Products Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-primary mb-4">Featured Products</h2>
                        <p className="text-gray-600 text-lg">Check out our latest premium farm products</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-accent/20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                            >
                                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-4xl">
                                    🥕
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-primary mb-2">Premium Product {i}</h3>
                                    <p className="text-gray-600 text-sm mb-4">Fresh and high-quality farm product</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-primary">$99.99</span>
                                        <button className="bg-primary text-accent px-4 py-2 rounded font-semibold hover:bg-primary-dark transition">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
