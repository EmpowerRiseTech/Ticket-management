import Role from "../../models/Roles and Permissions/role.js";

// Get All Roles
export const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve roles", error: err.message });
  }
};

// Create a Role
export const createRole = async (req, res) => {
  const { name, description, parentRoleId, isDefault } = req.body;
  try {
    const newRole = await Role.create({ name, description, parentRoleId, isDefault });
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ message: "Failed to create role", error: err.message });
    console.log( err.message)
  }
};

export const createRoles = async (req, res) => {
  try {
    const roles = req.body.roles;

    if (!Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: "Roles data is required and must be an array." });
    }

    const createdRoles = await Role.bulkCreate(roles);

    return res.status(201).json({
      message: "Roles created successfully.",
      data: createdRoles,
    });
  } catch (error) {
    console.error("Error creating roles:", error);
    return res.status(500).json({ message: "An error occurred while creating roles.", error: error.message });
  }
};


// Update a Role
export const updateRole = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRole = await Role.update(req.body, { where: { id } });
    if (updatedRole[0] === 0) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to update role", error: err.message });
  }
};

// Delete a Role
export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Role.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete role", error: err.message });
  }
};

// Default Role Seeding
export const seedDefaultRoles = async (req, res) => {
  const defaultRoles = [
    { name: "Super Admin", description: "Has access to all features and settings", isDefault: true },
    { name: "Admin", description: "Manages specific features and users", isDefault: true },
    { name: "Staff", description: "Limited access to assigned tasks and features", isDefault: true },
  ];

  try {
    for (const role of defaultRoles) {
      const [newRole, created] = await Role.findOrCreate({
        where: { name: role.name },
        defaults: role,
      });
      if (!created) {
        console.log(`Role '${role.name}' already exists.`);
      }
    }
    res.status(200).json({ message: "Default roles seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to seed default roles", error: err.message });
  }
};
