import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Feature = sequelize.define(
  "Feature",
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
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    groupName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "features",
    timestamps: true,
  }
);

Feature.addHook("beforeCreate", async (feature) => {
  const count = await Feature.count();
  feature.sequenceId = `FEAT-${String(count + 1).padStart(6, "0")}`;
});

export default Feature;
