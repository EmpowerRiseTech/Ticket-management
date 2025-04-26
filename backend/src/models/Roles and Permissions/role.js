import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sequenceId: {
      type: DataTypes.STRING,
      // unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    parentRoleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "roles",
    timestamps: true,
  }
);

// Role.addHook("beforeCreate", async (role) => {
//   const count = await Role.count();
//   role.sequenceId = `ROLE-${String(count + 1).padStart(6, "0")}`;
// });

export default Role;
