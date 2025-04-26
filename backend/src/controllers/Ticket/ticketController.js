import Ticket from "../../models/Tickets/ticket.js";
import Employee from "../../models/Master/Employee.js";
import Department from "../../models/Master/department.js";

// Create
export const createTicket = async (req, res) => {
    try {
      const {
        employeeId,
        departmentId,
        priority,
        ticketType,
        subject,
        requestDetails
      } = req.body;
  
      // const attachment = req.file ? req.file.filename : null;
      const attachment = req.file ? `/uploads/tickets/${req.file.filename}` : null;
  
      const newTicket = await Ticket.create({
        employeeId,
        departmentId,
        priority,
        ticketType,
        subject,
        requestDetails,
        attachment
      });
  
      res.status(201).json({
        message: "Ticket created successfully",
        data: newTicket
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating ticket",
        error: error.message
      });
    }
  };
  

// Get All with employee + department
export const getAllTickets = async (req, res) => {
    try {
      const {
        search,
        type,
        departmentId,
        priority,
        status,
        assignToDepartmentId,
        page = 1,
        limit = 10,
      } = req.query;
  
      const offset = (page - 1) * limit;
      const whereClause = {};
  
      if (search) {
        whereClause[Op.or] = [
          { subject: { [Op.like]: `%${search}%` } },
          { requestDetails: { [Op.like]: `%${search}%` } },
        ];
      }
  
      if (type) whereClause.ticketType = type;
      if (departmentId) whereClause.departmentId = departmentId;
      if (priority) whereClause.priority = priority;
      if (status) whereClause.status = status;
      if (assignToDepartmentId) whereClause.assignToDepartmentId = assignToDepartmentId;
  
      const tickets = await Ticket.findAndCountAll({
        where: whereClause,
        include: [
          { model: Employee, as: "employee" },
          { model: Department, as: "department" },
          { model: Department, as: "assignToDepartment" },
        ],
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["createdAt", "DESC"]],
      });
  
      res.json({
        total: tickets.count,
        page: parseInt(page),
        pages: Math.ceil(tickets.count / limit),
        data: tickets.rows,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching tickets", error: error.message });
    }
  };

// Get by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id, {
      include: ["employee", "department"],
    });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ticket", error: error.message });
  }
};

// Update
export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const attachment = req.file ? req.file.filename : ticket.attachment;

    await ticket.update({ ...req.body, attachment });
    res.json({ message: "Ticket updated", data: ticket });
  } catch (error) {
    res.status(500).json({ message: "Error updating ticket", error: error.message });
  }
};

// Delete
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    await ticket.destroy();
    res.json({ message: "Ticket deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ticket", error: error.message });
  }
};
