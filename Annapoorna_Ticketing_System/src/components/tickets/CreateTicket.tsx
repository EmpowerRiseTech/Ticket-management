import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

interface FormData {
  employeeId: string;
  priority: string;
  ticketType: string;
  departmentId: string;
  subject: string;
  requestDetails: string;
  attachment: File | null;
}

function CreateTicket() {
  const [formData, setFormData] = useState<FormData>({
    employeeId: "",
    priority: "",
    ticketType: "",
    departmentId: "",
    subject: "",
    requestDetails: "",
    attachment: null,
  });

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      const [empRes, deptRes] = await Promise.all([
        axios.get("http://localhost:3001/api/employee"),
        axios.get("http://localhost:3001/api/department"),
      ]);
  
      setEmployees(empRes?.data?.data || []);
      setDepartments(deptRes?.data?.data || []);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      setEmployees([]);
      setDepartments([]);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "attachment" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val) formPayload.append(key, val as any);
      });

      await axios.post("http://localhost:3001/api/tickets/", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Ticket created successfully!");
      setFormData({
        employeeId: "",
        priority: "",
        ticketType: "",
        departmentId: "",
        subject: "",
        requestDetails: "",
        attachment: null,
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket. Please try again.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Create a new ticket</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Select Employee</option>
          {employees?.map((emp: any) => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Select Priority</option>
          <option value="urgent">Urgent</option>
          <option value="general">General</option>
          <option value="less_urgent">Less Urgent</option>
        </select>

        <select
          name="ticketType"
          value={formData.ticketType}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Select Ticket Type</option>
          <option value="access_issue">Access Issue</option>
          <option value="shift_change">Shift Change</option>
          <option value="equipment_issue">Equipment Issue</option>
        </select>

        <select
  name="departmentId"
  value={formData.departmentId}
  onChange={handleChange}
>
  <option value="">Select Department</option>
  {departments?.map((dept: any) => (
    <option key={dept.id} value={dept.id}>{dept.name}</option>
  ))}
</select>


        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Select Subject</option>
          <option value="leave_request">Leave Request</option>
          <option value="gas_issue">Gas Issue</option>
          <option value="attendance_issue">Attendance Issue</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="font-medium mb-2 block">Request Details:</label>
        <textarea
          name="requestDetails"
          value={formData.requestDetails}
          onChange={handleChange}
          rows={5}
          className="border px-3 py-2 rounded-lg w-full"
          placeholder="Describe the issue or request in detail..."
        />
      </div>

      <div className="mb-4">
  <label className="font-medium mb-2 block">Attach Files:</label>
  <div className="relative flex items-center space-x-4">
    <button
      type="button"
      className="border px-6 py-2 rounded-lg text-center cursor-pointer bg-blue-600 text-white hover:bg-blue-700 text-lg"
      onClick={() => document.getElementById("file-input")?.click()}
    >
      Choose File
    </button>
    {formData.attachment && (
      <span className="text-sm text-green-600">
        {formData.attachment.name} selected
      </span>
    )}
    {!formData.attachment && (
      <span className="text-sm text-gray-500">
        No file selected
      </span>
    )}
    <input
      id="file-input"
      type="file"
      name="attachment"
      accept=".pdf,.jpg,.jpeg,.png" // restrict if needed
      onChange={handleChange}
      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
    />
  </div>
</div>


      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleGoBack}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
        >
          Go Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Ticket
        </button>
      </div>
    </div>
  );
}

export default CreateTicket;
