export default function ContactPage() {
    return (
        <main>
            <section className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-accent mb-4">Contact Us</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-2xl">
                    <form className="space-y-6 mb-12">
                        <div>
                            <label className="block text-primary font-semibold mb-2">Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-primary font-semibold mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-primary font-semibold mb-2">Message</label>
                            <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary text-accent px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition">
                            Send Message
                        </button>
                    </form>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-2">📍</div>
                            <h3 className="font-bold text-primary">Address</h3>
                            <p className="text-gray-600 text-sm">123 Farm Lane, Agriculture City</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">📞</div>
                            <h3 className="font-bold text-primary">Phone</h3>
                            <p className="text-gray-600 text-sm">+256 7541 58774</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">📧</div>
                            <h3 className="font-bold text-primary">Email</h3>
                            <p className="text-gray-600 text-sm">contact@sirlindonfarms.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}