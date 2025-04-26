import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Role from "./role.js";
import Feature from "./feature.js";

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sequenceId: {
      type: DataTypes.STRING,
      unique: true,
    },
    actions: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    conditions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "permissions",
    timestamps: true,
  }
);


Permission.addHook("beforeCreate", async (permission) => {
  const count = await Permission.count();
  permission.sequenceId = `PERM-${String(count + 1).padStart(6, "0")}`;
});

Permission.belongsTo(Role, { foreignKey: "roleId", onDelete: "CASCADE" });
Permission.belongsTo(Feature, { foreignKey: "featureId", onDelete: "CASCADE" });

export default Permission;
