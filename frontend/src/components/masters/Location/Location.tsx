import  { useState } from 'react';

const locations = [
  { name: 'Gandhipuram', country: 'India', state: 'Tamilnadu', city: 'Coimbatore', industry: 'Restaurant' },
  { name: 'Vadavalli', country: 'India', state: 'Tamilnadu', city: 'Coimbatore', industry: 'Cafe' },
  { name: 'RS Puram', country: 'India', state: 'Tamilnadu', city: 'Coimbatore', industry: 'Cafe' },
  { name: 'Townhall', country: 'India', state: 'Tamilnadu', city: 'Coimbatore', industry: 'Restaurant' },
  { name: 'Arun Kumar', country: 'India', state: 'Tamilnadu', city: 'Coimbatore', industry: 'Restaurant' },
  { name: 'Arun Kumar', country: 'India', state: 'Tamilnadu', city: 'Coimbatore', industry: 'Sweet Shop' },
];

function Location() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-6">Location</h2>

     <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
  <input
    type="text"
    placeholder="Search..."
    className="border px-3 py-2 rounded-lg w-full sm:w-64"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  
  <div className="flex gap-3">
    <select className="border px-3 py-2 rounded-lg w-40">
      <option value="">Filter</option>
      <option value="Restaurant">Restaurant</option>
      <option value="Cafe">Cafe</option>
      <option value="Sweet Shop">Sweet Shop</option>
    </select>
    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
      Create New
    </button>
  </div>
</div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">S.No</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Country</th>
              <th className="p-3 border-b">State</th>
              <th className="p-3 border-b">City</th>
              <th className="p-3 border-b">Industries</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((loc, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{loc.name}</td>
                <td className="p-3">{loc.country}</td>
                <td className="p-3">{loc.state}</td>
                <td className="p-3">{loc.city}</td>
                <td className="p-3">{loc.industry}</td>
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

export default Location;
