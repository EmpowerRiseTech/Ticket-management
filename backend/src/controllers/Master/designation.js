import Designation from "../../models/Master/Designation.js";
import { Op } from "sequelize";
import Role from "../../models/Roles and Permissions/role.js";

export const getAll = async (req, res) => {
    try {
      const { search = "", role = "", page = 1, limit = 10 } = req.query;
  
      const whereClause = {};
  
      if (search) {
        whereClause[Op.or] = [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
          { city: { [Op.like]: `%${search}%` } },
        ];
      }
  
      if (role) {
        whereClause.roleId = role; // if filtering by role ID
      }
  
      const offset = (parseInt(page) - 1) * parseInt(limit);
  
      const result = await Designation.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name"], // include only needed fields
          },
        ],
        limit: parseInt(limit),
        offset,
        order: [["id", "DESC"]],
      });
  
      res.json({
        total: result.count,
        page: parseInt(page),
        limit: parseInt(limit),
        data: result.rows,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export const getById = async (req, res) => {
  try {
    const designation = await Designation.findByPk(req.params.id);
    if (!designation) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res.json(designation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const designation = await Designation.create(req.body);
    res.status(201).json(designation);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err.message)
  }
};

export const update = async (req, res) => {
  try {
    const [updated] = await Designation.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const deleted = await Designation.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ message: "Designation not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
