'use client';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const stats = [
    { label: 'Total Products', value: '24', change: '+2 this week' },
    { label: 'Recent Orders', value: '156', change: '+12 this month' },
    { label: 'Active Users', value: '89', change: '+5 new' },
    { label: 'Farm Records', value: '42', change: 'Updated today' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Welcome to Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
            <p className="text-4xl font-bold text-primary mt-2">{stat.value}</p>
            <p className="text-gray-500 text-sm mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/admin/products')}
            className="bg-primary text-accent px-4 py-3 rounded font-semibold hover:bg-primary-dark transition"
          >
            ➕ Add New Product
          </button>
          <button className="bg-accent text-primary px-4 py-3 rounded font-semibold hover:bg-accent-light transition">
            📝 Create Farm Record
          </button>
          <button className="bg-yellow-500 text-white px-4 py-3 rounded font-semibold hover:bg-yellow-600 transition">
            📄 Upload Contract
          </button>
        </div>
      </div>
    </div>
  );
}
