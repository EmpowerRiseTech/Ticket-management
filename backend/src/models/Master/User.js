import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Role from "../../models/Roles and Permissions/role.js";
import Department from "../../models/Master/department.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  loginTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  logoutTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: "id",
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Department,
      key: "id",
    },
  },
}, {
  tableName: "users",
  timestamps: true,
});

// Associations
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });

User.belongsTo(Department, { foreignKey: "departmentId", as: "department" });
Department.hasMany(User, { foreignKey: "departmentId", as: "users" });

export default User;
