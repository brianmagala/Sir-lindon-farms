'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Stat {
    id: string;
    label: string;
    value: number;
    suffix: string;
}

export default function AdminStatsPage() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({ label: '', value: '', suffix: '' });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/stats');
            if (!res.ok) throw new Error('Failed to load stats');
            const data = await res.json();
            setStats(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        try {
            const res = await fetch('/api/stats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    label: form.label,
                    value: parseInt(form.value, 10),
                    suffix: form.suffix,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create stat');
            }

            setForm({ label: '', value: '', suffix: '' });
            await loadStats();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this stat?')) return;

        try {
            const res = await fetch(`/api/stats/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete stat');
            setStats((prev) => prev.filter((s) => s.id !== id));
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Manage Farm Statistics</h1>
            <p className="text-gray-600 mb-8">
                These numbers highlight the farm achievements on the Home page (e.g. 10,000+ Tons of Harvest).
            </p>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Stat</h2>
                {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>}

                <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Value (Number)</label>
                        <input
                            type="number"
                            required
                            value={form.value}
                            onChange={(e) => setForm({ ...form, value: e.target.value })}
                            className="w-full border rounded-md p-2"
                            placeholder="e.g. 10000"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Suffix (Optional)</label>
                        <input
                            type="text"
                            value={form.suffix}
                            onChange={(e) => setForm({ ...form, suffix: e.target.value })}
                            className="w-full border rounded-md p-2"
                            placeholder="e.g. +"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                        <input
                            type="text"
                            required
                            value={form.label}
                            onChange={(e) => setForm({ ...form, label: e.target.value })}
                            className="w-full border rounded-md p-2"
                            placeholder="Tons of Harvest"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark disabled:opacity-50"
                        >
                            {isSaving ? 'Adding...' : 'Add Stat'}
                        </button>
                    </div>
                </form>
            </div>

            {isLoading ? (
                <p>Loading stats...</p>
            ) : stats.length === 0 ? (
                <div className="bg-gray-50 text-center py-12 rounded-lg border border-gray-200">
                    <p className="text-gray-500">No stats added yet. The home page will use default values until you add some.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-white border rounded-lg p-4 flex flex-col justify-between shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-3xl font-bold text-primary">
                                    {stat.value}{stat.suffix}
                                </h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(stat.id)}
                                className="text-sm text-red-600 border border-red-200 py-1 px-3 rounded hover:bg-red-50"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
