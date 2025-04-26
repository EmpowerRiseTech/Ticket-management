
import { DataTypes } from "sequelize";
import sequelize from "../../../src/config/database.js";

const Location = sequelize.define("Location", {
  name: DataTypes.STRING,
  country: DataTypes.STRING,
  state: DataTypes.STRING,
  city: DataTypes.STRING,
  industries: DataTypes.STRING,
}, {
  tableName: "location",
  timestamps: false,
});

export default Location;
