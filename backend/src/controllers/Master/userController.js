import User from "../../models/Master/User.js";
import Role from "../../models/Roles and Permissions/role.js";
import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

 
export const createUsersWithRoles = async (req, res) => {
  try {
    const { users } = req.body;

    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({
        message: "Input must be a non-empty array of users.",
      });
    }

    const createdUsers = [];

    for (const userInput of users) {
      const { name, email, password, roleName } = userInput;

      if (!name || !email || !password || !roleName) {
        return res.status(400).json({
          message: "Each user must have name, email, password, and roleName.",
        });
      }

      const role = await Role.findOne({ where: { name: roleName } });

      if (!role) {
        return res.status(404).json({
          message: `Role with name "${roleName}" not found for user "${name}".`,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        roleId: role.id,
      });

      createdUsers.push(user);
    }

    return res.status(201).json({
      message: "Users created successfully.",
      users: createdUsers,
    });
  } catch (error) {
    console.error("Error creating users with roles:", error);
    return res.status(500).json({
      message: "An error occurred while creating users.",
      error: error.message,
    });
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
