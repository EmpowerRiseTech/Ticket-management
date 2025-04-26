import { DataTypes } from "sequelize";
import sequelize from "../../../src/config/database.js";

const Department = sequelize.define("Department", {
  name: DataTypes.STRING,
}, {
  tableName: "department",
  timestamps: false,
});

export default Department;
