import Permission from "../../models/Roles and Permissions/permission.js";


export const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve permissions", error: err.message });
  }
};


export const createPermission = async (req, res) => {
  const { actions, conditions, roleId, featureId } = req.body;
  try {
    const newPermission = await Permission.create({ actions, conditions, roleId, featureId });
    res.status(201).json(newPermission);
  } catch (err) {
    res.status(400).json({ message: "Failed to create permission", error: err.message });
  }
};


export const updatePermission = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPermission = await Permission.update(req.body, { where: { id } });
    if (updatedPermission[0] === 0) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json({ message: "Permission updated successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to update permission", error: err.message });
  }
};


export const deletePermission = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Permission.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete permission", error: err.message });
  }
};


export const seedDefaultPermissions = async (req, res) => {
  const defaultPermissions = [
    { actions: ["read", "write", "delete"], conditions: {}, roleId: 1, featureId: 1 },
    { actions: ["read", "write"], conditions: { country: "US" }, roleId: 2, featureId: 2 },
    { actions: ["read"], conditions: { country: "IN" }, roleId: 3, featureId: 3 },
  ];

  try {
    for (const permission of defaultPermissions) {
      const [newPermission, created] = await Permission.findOrCreate({
        where: { roleId: permission.roleId, featureId: permission.featureId },
        defaults: permission,
      });
      if (!created) {
        console.log(`Permission for role ${permission.roleId} and feature ${permission.featureId} already exists.`);
      }
    }
    res.status(200).json({ message: "Default permissions seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to seed default permissions", error: err.message });
  }
};
