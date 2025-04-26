import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Designation() {
  const [designations, setDesignations] = useState([]); // Dynamic designations state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  // Fetch designations from API on component mount
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        setLoading(true);
        setError(''); // Reset error message
        const response = await axios.get('http://localhost:3001/api/designations'); // Replace with your API endpoint
        setDesignations(response.data); // Assuming response.data is an array of designations
      } catch (err) {
        setError('Failed to fetch designations');
      } finally {
        setLoading(false);
      }
    };

    fetchDesignations();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Designation</h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => navigate('/create-designation')}
            >
              Create New
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">S.No</th>
                  <th className="p-3 border-b">Designation ID</th>
                  <th className="p-3 border-b">Designation Title</th>
                </tr>
              </thead>
              <tbody>
                {/* {designations.map((des, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{des.id}</td>
                    <td className="p-3">{des.title}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Designation;
