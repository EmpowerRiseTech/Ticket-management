import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function CreateBranch() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [managerName, setManagerName] = useState('');
  const [noOfEmployees, setNoOfEmployees] = useState('');
  const [industries, setIndustries] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBranch = {
      name,
      address,
      managerName,
      noOfEmployees,
      industries
    };

    try {
      // Call API to save branch
      const res = await axios.post('http://localhost:3001/api/branch', newBranch);
      console.log('Branch created:', res.data);

      // Redirect to Branch Management page after success
      navigate('/branch');
    } catch (err) {
      console.error('Error creating branch:', err);
      alert('Failed to create branch. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Create New Branch</h2>

      <form 
      
      // onSubmit={handleSubmit} 
      
      className="space-y-6">
        {/* Name */}
        <div className="flex items-center space-x-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-32">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter branch name"
          />
        </div>

        {/* Address */}
        <div className="flex items-center space-x-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 w-32">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter branch address"
          />
        </div>

        {/* Manager Name */}
        <div className="flex items-center space-x-4">
          <label htmlFor="managerName" className="block text-sm font-medium text-gray-700 w-32">Manager Name</label>
          <input
            type="text"
            id="managerName"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter manager name"
          />
        </div>

        {/* No of Employees */}
        <div className="flex items-center space-x-4">
          <label htmlFor="noOfEmployees" className="block text-sm font-medium text-gray-700 w-32">No of Employees</label>
          <input
            type="number"
            id="noOfEmployees"
            value={noOfEmployees}
            onChange={(e) => setNoOfEmployees(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter number of employees"
          />
        </div>

        {/* Industries */}
        <div className="flex items-center space-x-4">
          <label htmlFor="industries" className="block text-sm font-medium text-gray-700 w-32">Industries</label>
          <input
            type="text"
            id="industries"
            value={industries}
            onChange={(e) => setIndustries(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter industries"
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
            Create Branch
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBranch;
