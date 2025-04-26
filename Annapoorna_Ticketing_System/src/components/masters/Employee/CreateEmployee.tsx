import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function CreateEmployee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      name,
      email,
      phoneNo,
      designation,
      employeeId
    };

    try {
      const response = await axios.post('http://localhost:3001/api/employee', newEmployee);
      console.log('Employee created:', response.data);
      navigate('/employee-management');
    } catch (error) {
      console.error('Failed to create employee:', error);
      alert('Error creating employee. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Create New Employee</h2>

      <form 
      // onSubmit={handleSubmit}
       className="space-y-6">

        <div className="flex items-center space-x-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-36">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter employee name"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-36">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter employee email"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700 w-36">Phone No</label>
          <input
            type="text"
            id="phoneNo"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter phone number"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700 w-36">Designation</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter designation"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 w-36">Employee ID</label>
          <input
            type="text"
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter employee ID"
          />
        </div>

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
            Create Employee
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateEmployee;
