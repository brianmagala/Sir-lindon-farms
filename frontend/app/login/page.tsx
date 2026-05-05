import Link from 'next/link';

export default function LoginPage() {
    return (
        <main>
            <section className="bg-primary py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-accent mb-4">User Login</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-md">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-primary font-semibold mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-primary font-semibold mb-2">Password</label>
                                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                            </div>
                            <button type="submit" className="w-full bg-primary text-accent px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition">
                                Sign In
                            </button>
                        </form>
                        <p className="text-center text-gray-600 mt-6">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-primary font-semibold hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}