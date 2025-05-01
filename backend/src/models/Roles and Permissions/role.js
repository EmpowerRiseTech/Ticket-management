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

Role.addHook("beforeBulkCreate", async (roles) => {
  const lastRole = await Role.findOne({
    order: [['sequenceId', 'DESC']],
    attributes: ['sequenceId'],
  });

  let lastId = lastRole?.sequenceId?.split('-')[1] || '000000';

  roles.forEach((role) => {
    lastId = (parseInt(lastId, 10) + 1).toString().padStart(6, '0');
    role.sequenceId = `ROLE-${lastId}`;
  });
});


export default Role;
