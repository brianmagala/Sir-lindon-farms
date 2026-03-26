'use client';

export default function AdminRecordsPage() {
  const records = [
    { id: 1, title: 'April Harvest Report', date: '2026-04-01', type: 'Harvest' },
    { id: 2, title: 'Cattle Inventory Update', date: '2026-03-28', type: 'Livestock' },
    { id: 3, title: 'Soil Analysis Results', date: '2026-03-25', type: 'Soil' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary">Farm Records Management</h2>
        <button className="bg-primary text-accent px-6 py-2 rounded font-semibold hover:bg-primary-dark transition">
          ➕ New Record
        </button>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-primary">{record.title}</h3>
                <p className="text-gray-600 text-sm mt-1">Type: {record.type}</p>
                <p className="text-gray-600 text-sm">Date: {record.date}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-primary hover:underline">View</button>
                <button className="text-primary hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
