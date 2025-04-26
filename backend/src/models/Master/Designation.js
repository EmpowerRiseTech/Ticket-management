// models/Master/Designation.js
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Role from "../Roles and Permissions/role.js";

const Designation = sequelize.define("Designation", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  city: DataTypes.STRING,
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id",
    }
  }
}, {
  tableName: "designations",
  timestamps: false,
});

// Setup association
Designation.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(Designation, { foreignKey: "roleId", as: "designations" });

export default Designation;
