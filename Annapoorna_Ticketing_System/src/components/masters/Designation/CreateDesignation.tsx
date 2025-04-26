import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function CreateDesignation() {
  const [designationId, setDesignationId] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message state
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const navigate = useNavigate();

  // Handle form submit
  const handleCreate = async () => {
    if (!designationId || !title) {
      setError('Please fill in all fields');
      return;
    }

    const newDesignation = {
      designationId,
      title,
    };

    try {
      setLoading(true);
      setError(''); // Reset error on new attempt

      // Send API request to create designation
      const response = await axios.post('http://localhost:3001/api/designations', newDesignation);

      if (response.data.success) {
        setSuccessMessage('Designation created successfully!');
        setTimeout(() => {
          navigate('/designation'); // Redirect to designations page after success
        }, 2000);
      } else {
        setError('Failed to create designation');
      }
    } catch (err) {
      setError('Something went wrong, please try again!');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Create Designation</h2>

      {/* Show success message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}

      {/* Show error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Designation ID Input */}
        <input
          type="text"
          placeholder="Designation ID"
          className="border px-4 py-3 rounded-lg w-full"
          value={designationId}
          onChange={(e) => setDesignationId(e.target.value)}
        />

        {/* Designation Title Input */}
        <input
          type="text"
          placeholder="Designation Title"
          className="border px-4 py-3 rounded-lg w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handleCreate}
          className={`${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-6 py-3 rounded-lg`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>

        <button
          onClick={() => navigate('/designation')}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default CreateDesignation;
