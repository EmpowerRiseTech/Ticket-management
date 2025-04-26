import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function CreateDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDepartment = {
      departmentName
    };

    try {
      await axios.post('http://localhost:3001/api/department', newDepartment);
      console.log('New Department Created:', newDepartment);
      navigate('/department-management');
    } catch (error) {
      console.error('Failed to create department:', error);
      alert('Failed to create department. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Create New Department</h2>

      <form 
      // onSubmit={handleSubmit}
       className="space-y-6">

        {/* Department Name */}
        <div className="flex items-center space-x-4">
          <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 w-48">Department Name</label>
          <input
            type="text"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter department name"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={handleGoBack}
            className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400"
          >
            Go Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Department
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateDepartment;
