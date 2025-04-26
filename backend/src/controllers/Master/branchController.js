import Branch from "../../models/Master/branch.js";
import { Op } from "sequelize";

// ➕ Create Branch
export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.status(201).json({ message: "Branch created successfully", data: branch });
  } catch (error) {
    res.status(500).json({ message: "Error creating branch", error: error.message });
  }
};

// 📥 Get All Branches (with search, filter, pagination)
export const getAllBranches = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, industries } = req.query;
    const offset = (page - 1) * limit;

    const where = {};

    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    if (industries) {
      where.industries = { [Op.like]: `%${industries}%` };
    }

    const { count, rows } = await Branch.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      total: count,
      page: parseInt(page),
      pages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving branches", error: error.message });
  }
};

// 📥 Get Branch by ID
export const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving branch", error: error.message });
  }
};

// 🔁 Update Branch
export const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    await branch.update(req.body);
    res.json({ message: "Branch updated successfully", data: branch });
  } catch (error) {
    res.status(500).json({ message: "Error updating branch", error: error.message });
  }
};

// ❌ Delete Branch
export const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findByPk(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    await branch.destroy();
    res.json({ message: "Branch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting branch", error: error.message });
  }
};
