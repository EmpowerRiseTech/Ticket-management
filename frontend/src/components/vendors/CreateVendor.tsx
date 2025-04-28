import { useState } from 'react';
import { useNavigate } from 'react-router';

function CreateVendor() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Logic to save vendor (e.g., API call or state update)
    const newVendor = {
      name,
      mobile,
      email,
      status,
      experience
    };

    console.log('New Vendor:', newVendor);
    // Redirect to Vendor Management page after successful creation
    navigate('/vendor-management');
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Create New Vendor</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter vendor name"
          />
        </div>

        {/* Mobile */}
        <div className="flex items-center space-x-4">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 w-32">Mobile</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter vendor mobile number"
          />
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 w-32">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter vendor email"
          />
        </div>

        {/* Status */}
        <div className="flex items-center space-x-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 w-32">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Experience */}
        <div className="flex items-center space-x-4">
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 w-32">Experience</label>
          <input
            type="text"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter vendor experience"
          />
        </div>

        {/* Buttons - Aligning to the right */}
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
            Create Vendor
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateVendor;
