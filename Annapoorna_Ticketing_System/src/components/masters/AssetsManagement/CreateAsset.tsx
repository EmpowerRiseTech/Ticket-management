import { useState } from 'react';
import { useNavigate } from 'react-router';

function CreateAsset() {
  const [name, setName] = useState('');
  const [availableQty, setAvailableQty] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAsset = {
      name,
      availableQty,
      location,
      status
    };

    console.log('New Asset:', newAsset);
    navigate('/asset-management');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Create New Asset</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div className="flex items-center space-x-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 w-40">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter asset name"
          />
        </div>

        {/* Available Qty */}
        <div className="flex items-center space-x-4">
          <label htmlFor="availableQty" className="block text-sm font-medium text-gray-700 w-40">Available Qty</label>
          <input
            type="number"
            id="availableQty"
            value={availableQty}
            onChange={(e) => setAvailableQty(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter available quantity"
          />
        </div>

        {/* Location */}
        <div className="flex items-center space-x-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 w-40">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
            placeholder="Enter location"
          />
        </div>

        {/* Status */}
        <div className="flex items-center space-x-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 w-40">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="border px-3 py-2 rounded-lg w-full"
          >
            <option value="">Select status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
            <option value="In Use">In Use</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
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
            Create Asset
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreateAsset;
