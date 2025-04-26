
import { DataTypes } from "sequelize";
import sequelize from "../../../src/config/database.js";

const Branch = sequelize.define("Branch", {
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  manager_name: DataTypes.STRING,
  no_employee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },  industries: DataTypes.STRING,
}, {
  tableName: "branch",
  timestamps: false,
});

export default Branch;
