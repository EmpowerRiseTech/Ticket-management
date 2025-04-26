import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Department() {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/department');
        const deptArray = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setDepartments(deptArray);
      } catch (err) {
        setError('Failed to load departments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments(); // ✅ CALL the function
  }, []);

  const filteredDepartments = departments?.filter(dept =>
    // Adjust this line if your response data structure is flat
    (dept?.name || dept?.data?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-2">Departments</h2>

      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded-lg w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="text-blue-600 text-sm font-medium"
            onClick={() => setSearchTerm('')}
          >
            Reset
          </button>
        </div>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 mt-3 sm:mt-0"
          onClick={() => navigate('/create-department')}
        >
          Create Department
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <p className="p-4 text-gray-500">Loading...</p>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((dept, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{dept?.name || dept?.data?.name}</td>
                </tr>
              ))}
              {filteredDepartments.length === 0 && (
                <tr>
                  <td className="p-4 text-gray-500 italic">No results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Department;
