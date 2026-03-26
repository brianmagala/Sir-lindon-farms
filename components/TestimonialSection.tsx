'use client';

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    image?: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        quote:
            'Sir Lindon Farms has transformed our community with their commitment to sustainable agriculture and quality products.',
        author: 'John Smith',
        role: 'Local Farmer Partner',
    },
    {
        id: '2',
        quote:
            'The freshness and quality of products from Sir Lindon Farms are unmatched. Our family now exclusively uses their produce.',
        author: 'Maria Garcia',
        role: 'Customer Since 2020',
    },
    {
        id: '3',
        quote:
            'Working with Sir Lindon Farms has been the best decision for our agricultural cooperative. Their expertise is invaluable.',
        author: 'Ahmed Hassan',
        role: 'Cooperative Director',
    },
];

export default function TestimonialSection() {
    return (
        <section className="py-16 bg-accent/10 animate-fade-in">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 animate-fade-up">
                    <h2 className="text-4xl font-bold text-primary mb-4">What People Say</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Hear from our customers and partners about their experiences
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2 animate-fade-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="mb-4 text-3xl">⭐⭐⭐⭐⭐</div>
                            <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                            <div>
                                <p className="font-bold text-primary">{testimonial.author}</p>
                                <p className="text-gray-600 text-sm">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
