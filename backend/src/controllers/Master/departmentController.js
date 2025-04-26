import Department from "../../models/Master/department.js";
import { Op } from "sequelize";

// Get all departments with search, filter by name, and pagination
export const getAllDepartment = async (req, res) => {
  try {
    const { search = "", name = "", page = 1, limit = 10 } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    if (name) {
      whereClause.name = name;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Department.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset,
      order: [["id", "DESC"]],
    });

    res.json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get department by ID
export const getByIdDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json({ data: department });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new department
export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const newDept = await Department.create({ name });

    res.status(201).json({ message: "Department created", data: newDept });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const dept = await Department.findByPk(id);
    if (!dept) {
      return res.status(404).json({ error: "Department not found" });
    }

    await dept.update({ name });

    res.json({ message: "Department updated", data: dept });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete department
export const removeDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const dept = await Department.findByPk(id);
    if (!dept) {
      return res.status(404).json({ error: "Department not found" });
    }

    await dept.destroy();

    res.json({ message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
