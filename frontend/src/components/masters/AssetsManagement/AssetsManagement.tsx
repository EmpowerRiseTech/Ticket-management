import { useState } from 'react';
import { useNavigate } from 'react-router';

const assets = [
  { name: 'Laptop', availableQty: 20, location: 'Office A', status: 'Available' },
  { name: 'Projector', availableQty: 5, location: 'Conference Room', status: 'In Use' },
  { name: 'Whiteboard', availableQty: 3, location: 'Meeting Room', status: 'Available' },
  { name: 'Air Conditioner', availableQty: 2, location: 'Server Room', status: 'Under Maintenance' },
];

function AssetManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === '' || asset.status === selectedStatus)
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Asset Management</h2>

      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by Name..."
          className="border px-3 py-2 rounded-lg w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="flex gap-3">
          <select
            className="border px-3 py-2 rounded-lg w-40"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Filter by Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/create-asset')}
          >
            Create New Asset
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">S.No</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Available Qty</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{asset.name}</td>
                <td className="p-3">{asset.availableQty}</td>
                <td className="p-3">{asset.location}</td>
                <td className="p-3">{asset.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100">Previous</button>
        <button className="px-3 py-1 border rounded-lg bg-blue-600 text-white">1</button>
        <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100">Next</button>
      </div>
    </div>
  );
}

export default AssetManagement;
