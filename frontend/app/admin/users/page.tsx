'use client';

export default function AdminUsersPage() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', joined: '2026-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', joined: '2026-02-20' },
    { id: 3, name: 'Admin User', email: 'admin@sirlindonfarms.com', role: 'Admin', joined: '2025-12-01' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-8">Users Management</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary text-accent">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Role</th>
              <th className="px-6 py-3 text-left font-semibold">Joined</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-semibold">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">{user.joined}</td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}