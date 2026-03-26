'use client';

export default function AdminContractsPage() {
  const contracts = [
    { id: 1, title: 'Standard Farm Contract', type: 'Standard', created: '2026-01-15' },
    { id: 2, title: 'Wholesale Agreement', type: 'Wholesale', created: '2026-02-20' },
    { id: 3, title: 'Partnership Contract', type: 'Partnership', created: '2026-03-10' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Contracts Management</h2>
        <button className="bg-primary text-accent px-6 py-2 rounded font-semibold hover:bg-primary-dark transition">
          ➕ New Contract
        </button>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary text-accent">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Contract Title</th>
              <th className="px-6 py-3 text-left font-semibold">Type</th>
              <th className="px-6 py-3 text-left font-semibold">Created Date</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-semibold">{contract.title}</td>
                <td className="px-6 py-4">
                  <span className="bg-accent/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {contract.type}
                  </span>
                </td>
                <td className="px-6 py-4">{contract.created}</td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:underline mr-4">Download</button>
                  <button className="text-primary hover:underline mr-4">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
