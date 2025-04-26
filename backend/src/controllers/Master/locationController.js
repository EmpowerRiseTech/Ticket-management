import Location from "../../models/Master/Location.js";
import { Op } from "sequelize";

// Get all locations with search, industry filter, and pagination
export const getAllLocation = async (req, res) => {
  try {
    const { search = "", industry = "", page = 1, limit = 10 } = req.query;

    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { country: { [Op.like]: `%${search}%` } },
        { state: { [Op.like]: `%${search}%` } },
        { city: { [Op.like]: `%${search}%` } },
        { industries: { [Op.like]: `%${search}%` } },
      ];
    }

    if (industry) {
      whereClause.industries = industry;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Location.findAndCountAll({
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

// Get location by ID
export const getByIdLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findByPk(id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json({ data: location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new location
export const createLocation = async (req, res) => {
  try {
    const { name, country, state, city, industries } = req.body;

    const newLocation = await Location.create({
      name,
      country,
      state,
      city,
      industries,
    });

    res.status(201).json({ message: "Location created", data: newLocation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a location
export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country, state, city, industries } = req.body;

    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    await location.update({ name, country, state, city, industries });

    res.json({ message: "Location updated", data: location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a location
export const removeLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }

    await location.destroy();

    res.json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
