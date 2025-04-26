import Feature from "../models/Roles and Permissions/feature.js";
import Permission from "../models/Roles and Permissions/permission.js";

export const allowRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    };
  };
  
  
  export const checkPermissions = (featureName, action) => async (req, res, next) => {
    try {
      const roleId = req.user?.roleId;
  
      if (!roleId) {
        return res.status(403).json({ error: "Unauthorized: Role not found" });
      }
  
      // 1. Find the feature by name
      const feature = await Feature.findOne({ where: { name: featureName } });
  
      if (!feature) {
        return res.status(404).json({ error: `Feature "${featureName}" not found` });
      }
  
      // 2. Find the permission for the user's role and feature
      const permission = await Permission.findOne({
        where: {
          roleId,
          featureId: feature.id,
        },
      });
  
      if (!permission) {
        return res.status(403).json({ error: "Permission not found for this feature" });
      }
  
      // 3. Check if the action is allowed
      const isAllowed = Array.isArray(permission.actions) && permission.actions.includes(action);
  
      if (!isAllowed) {
        return res.status(403).json({ error: `Action "${action}" is not permitted for this feature` });
      }
  
      // All good, move forward
      next();
    } catch (error) {
      console.error("Permission Check Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  