export default function AchievementsPage() {
    const milestones = [
        { year: 2000, title: 'Farm Established', description: 'Sir Lindon Farms was founded with a vision for sustainable agriculture' },
        { year: 2005, title: 'First Certification', description: 'Received organic farming certification' },
        { year: 2010, title: 'Regional Recognition', description: 'Awarded Best Farm Producer in the region' },
        { year: 2015, title: 'Expansion Phase', description: 'Expanded operations to 2500+ hectares' },
        { year: 2020, title: 'Digital Transformation', description: 'Launched online platform for direct customer sales' },
        { year: 2026, title: 'Leading Brand', description: 'Recognized as the #1 trusted farm brand in the region' },
    ];

    return (
        <main>
            {/* Hero */}
            <section className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-accent mb-4">Our Achievements</h1>
                    <p className="text-accent/80">A journey of excellence and sustainable farming</p>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="mb-12 pl-8 border-l-4 border-primary relative">
                                <div className="absolute w-4 h-4 bg-primary rounded-full -left-2.5 -top-1.5"></div>
                                <h3 className="text-3xl font-bold text-primary mb-2">{milestone.year}</h3>
                                <h4 className="text-xl font-semibold text-primary mb-2">{milestone.title}</h4>
                                <p className="text-gray-600">{milestone.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="bg-accent/10 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12">Certifications & Awards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Organic Certified', 'Fair Trade Certified', 'Sustainability Award'].map((cert, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg text-center shadow-md">
                                <div className="text-5xl mb-4">🏆</div>
                                <h3 className="font-bold text-primary text-lg">{cert}</h3>
                                <p className="text-gray-600 text-sm mt-2">Recognized for our commitment to quality</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
