// controllers/Master/employee.controller.js
import Employee from "../../models/Master/Employee.js";
import Designation from "../../models/Master/Designation.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";


// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const defaultPassword = "123456";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    const data = {
      ...req.body,
      password: hashedPassword,
    }; 
    const employee = await Employee.create(data);
    res.status(201).json({ message: "Employee created successfully", data: employee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
};

// Get all employees with pagination, search, and filter
export const getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", designationId } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }
    if (designationId) {
      where.designationId = designationId;
    }

    const { rows, count } = await Employee.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: Designation, as: "designation" }],
      order: [["id", "DESC"]],
    });

    res.json({
      message: "Employees fetched successfully",
      data: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [{ model: Designation, as: "designation" }],
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee fetched successfully", data: employee });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error: error.message });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.update(req.body);
    res.json({ message: "Employee updated successfully", data: employee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.destroy();
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};
