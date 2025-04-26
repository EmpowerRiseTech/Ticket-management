import User from "../../models/Master/User.js";


export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      where: {
        username: {
          [Op.like]: `%${search}%`
        }
      },
      include: ["role", "department"],
      offset: parseInt(offset),
      limit: parseInt(limit),
    });

    res.json({
      data: users.rows,
      total: users.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(users.count / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: ["role", "department"] });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update(req.body);
    res.json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

export const updateLoginTime = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.loginTime = new Date();
    await user.save();
    res.json({ message: "Login time updated", loginTime: user.loginTime });
  } catch (error) {
    res.status(500).json({ message: "Error updating login time", error: error.message });
  }
};
