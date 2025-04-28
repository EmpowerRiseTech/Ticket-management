import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('');
  const navigate = useNavigate();

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Failed to fetch employees. Please check the API.');
    }
  };

  // Filtered employee list based on search and designation filter
  // const filteredEmployees = employees.filter(emp =>
  //   emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //   (filterDesignation === '' || emp.designation === filterDesignation)
  // );

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Employee</h2>

      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="ml-auto flex items-center gap-3">
          <select
            className="border px-3 py-2 rounded-lg w-40"
            value={filterDesignation}
            onChange={(e) => setFilterDesignation(e.target.value)}
          >
            <option value="">Filter</option>
            <option value="Manager">Manager</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
          </select>

          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => navigate('/create-employee')}
          >
            Create New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">S.No</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Phone No</th>
              <th className="p-3 border-b">Designation</th>
              <th className="p-3 border-b">Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {/* {filteredEmployees.map((emp, index) => (
              <tr key={emp.empId} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.phone}</td>
                <td className="p-3">{emp.designation}</td>
                <td className="p-3">{emp.empId}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 mt-4">
        <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100">Previous</button>
        <button className="px-3 py-1 border rounded-lg bg-blue-600 text-white">1</button>
        <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100">Next</button>
      </div>
    </div>
  );
}

export default Employee;
