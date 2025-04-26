import { useState } from 'react';
import { useNavigate } from 'react-router';

const vendors = [
  { name: 'Rajesh Kumar', mobile: '9876543210', email: 'rajesh@gmail.com', status: 'Active', experience: '5 years' },
  { name: 'Suman Gupta', mobile: '7894561230', email: 'suman@gmail.com', status: 'Inactive', experience: '2 years' },
  { name: 'Vijay Singh', mobile: '9988776655', email: 'vijay@gmail.com', status: 'Active', experience: '3 years' },
  { name: 'Nisha Sharma', mobile: '7788996655', email: 'nisha@gmail.com', status: 'Inactive', experience: '1 year' },
];

function VendorManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === '' || vendor.status === selectedStatus)
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Vendor Management</h2>

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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/create-vendor')}
          >
            Create New Vendor
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">S.No</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Mobile</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Experience</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{vendor.name}</td>
                <td className="p-3">{vendor.mobile}</td>
                <td className="p-3">{vendor.email}</td>
                <td className="p-3">{vendor.status}</td>
                <td className="p-3">{vendor.experience}</td>
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

export default VendorManagement;
