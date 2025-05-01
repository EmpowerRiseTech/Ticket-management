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

Feature.addHook("beforeBulkCreate", async (features) => {
  // Fetch the latest sequenceId to increment from the last record
  const lastFeature = await Feature.findOne({
    order: [['sequenceId', 'DESC']],
    attributes: ['sequenceId'],
  });

  let lastId = lastFeature?.sequenceId?.split('-')[1] || '000000';  // If no records, start from FEAT-000000
  
  // Update each feature's sequenceId before bulk insert
  features.forEach((feature) => {
    lastId = (parseInt(lastId, 10) + 1).toString().padStart(6, '0');
    feature.sequenceId = `FEAT-${lastId}`;
  });
});

// Feature.addHook("beforeCreate", async (feature) => {
//   const count = await Feature.count();
//   feature.sequenceId = `FEAT-${String(count + 1).padStart(6, "0")}`;
// });

export default Feature;
