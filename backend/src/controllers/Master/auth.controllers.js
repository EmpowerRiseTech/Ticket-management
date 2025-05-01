import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Role from "../../models/Roles and Permissions/role.js";
import Feature from "../../models/Roles and Permissions/feature.js";
import User from "../../models/Master/User.js";
import Department from "../../models/Master/department.js";
import Permission from "../../models/Roles and Permissions/permission.js";

const JWT_SECRET = "your_jwt_secret"; // Use a more secure secret key in production

// Generic login function for any user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Role, as: "role" },
        { model: Department, as: "department" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Fetch permissions for the user's role
    const permissions = await Permission.findAll({
      where: { roleId: user.roleId },
      include: [
        {
          model: Feature, // Include features associated with this role
          attributes: ['id', 'name'], // Only include the necessary fields from Feature
        }
      ]
    });

    // Update the login time
    user.loginTime = new Date();
    await user.save();

    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role.roleName },
      JWT_SECRET,
      { expiresIn: "2h" } // Token expiration time
    );

    // Respond with success message and the token
    res.json({
      message: "Login successful",
      token,
      permissions,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role.roleName,
        department: user.department?.name || null,
        loginTime: user.loginTime,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, roleId, departmentId } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, roleId, departmentId });

    res.status(201).json({ message: "User registered successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
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


// 🎯 Specific login endpoints
export const masterAdminLogin = (req, res) => login(req, res, "Super Admin");
// export const adminLogin = (req, res) => loginWithRole(req, res, "Admin");
// export const departmentAdminLogin = (req, res) => loginWithRole(req, res, "Manager");
export const staffLogin = (req, res) => login(req, res, "Staff");
// export const vendorLogin = (req, res) => loginWithRole(req, res, "Vendors");
