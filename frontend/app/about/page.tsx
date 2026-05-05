export default function AboutPage() {
    return (
        <main>
            <section className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-accent mb-4">About Sir Lindon Farms</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    <p className="text-gray-700 mb-6 text-lg">Sir Lindon Farms is a leading agricultural enterprise dedicated to delivering premium quality farm products while maintaining sustainable and environmentally responsible practices.</p>
                    <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
                    <p className="text-gray-700 mb-8">To provide the highest quality farm products while fostering sustainable agricultural practices that protect our environment for future generations.</p>
                    <h2 className="text-2xl font-bold text-primary mb-4">Our Values</h2>
                    <ul className="space-y-3 text-gray-700 mb-8">
                        <li>• <strong>Quality:</strong> Uncompromising commitment to excellence</li>
                        <li>• <strong>Sustainability:</strong> Protecting our environment</li>
                        <li>• <strong>Innovation:</strong> Embracing modern farming techniques</li>
                        <li>• <strong>Community:</strong> Supporting local communities</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}