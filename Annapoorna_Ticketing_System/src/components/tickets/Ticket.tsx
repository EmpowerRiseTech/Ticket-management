import { useState } from 'react';
import { useNavigate } from 'react-router';

function TicketPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const tickets = [
    { key: "#459460", subject: "Access Issue: Unable to Log in", priority: "Urgent", status: "Processing", date: "2 hours ago", updated: "2 hours ago" },
    { key: "#555666", subject: "Workstation/Equipment Issue", priority: "Urgent", status: "Pending", date: "2 hours ago", updated: "2 hours ago" },
    { key: "#103795", subject: "ID Card/Badge Not Working", priority: "Urgent", status: "Closed", date: "2 hours ago", updated: "2 hours ago" },
    // Add more sample tickets if needed
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Tickets</h2>
        <button
          onClick={() => navigate('/create-ticket')}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          New Ticket
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="border px-3 py-2 rounded-lg w-40">
          <option>Type</option>
          <option>Incident</option>
          <option>Request</option>
        </select>

        <select className="border px-3 py-2 rounded-lg w-40">
          <option>Category</option>
          <option>Access</option>
          <option>Hardware</option>
        </select>

        <select className="border px-3 py-2 rounded-lg w-40">
          <option>Department</option>
          <option>IT</option>
          <option>HR</option>
        </select>

        <select className="border px-3 py-2 rounded-lg w-40">
          <option>Priority</option>
          <option>Urgent</option>
          <option>Less Urgent</option>
          <option>Generally</option>
        </select>

        <select className="border px-3 py-2 rounded-lg w-40">
          <option>Status</option>
          <option>Processing</option>
          <option>Pending</option>
          <option>Closed</option>
          <option>Completed</option>
        </select>

        <select className="border px-3 py-2 rounded-lg w-40">
          <option>Assign To</option>
          <option>Admin</option>
          <option>Support</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b">Key</th>
              <th className="p-3 border-b">Subject</th>
              <th className="p-3 border-b">Priority</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Updated</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{ticket.key}</td>
                <td className="p-3">{ticket.subject}</td>
                <td className="p-3">{ticket.priority}</td>
                <td className="p-3">{ticket.status}</td>
                <td className="p-3">{ticket.date}</td>
                <td className="p-3">{ticket.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketPage;
