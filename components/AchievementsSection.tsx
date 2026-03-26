"use client";

import CountUp from './CountUp';

interface Stat {
    label: string;
    value: number;
    suffix: string;
}

const stats: Stat[] = [
    { label: 'Tons of Harvest', value: 10000, suffix: '+' },
    { label: 'Units of Cattle', value: 500, suffix: '' },
    { label: 'Hectares of Farm', value: 2500, suffix: '+' },
    { label: 'Years of Experience', value: 25, suffix: '' },
];

export default function AchievementsSection() {
    return (
        <section className="py-16 bg-white animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Image Section */}
                    <div className="relative animate-slide-in">
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg h-400 flex items-center justify-center text-accent shadow-xl">
                            <div className="text-6xl animate-float">🌾</div>
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
                            {stats.map((stat, index) => (
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
