// models/Master/Employee.js
import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Designation from "./Designation.js";

const Employee = sequelize.define("Employee", {
  employeeId: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Designation,
      key: "id",
    },
  },
}, {
  tableName: "employee",
  timestamps: false,
});

// Auto-generate employeeId before creation
Employee.addHook("beforeCreate", async (employee) => {
  const count = await Employee.count();
  const sequence = String(count + 1).padStart(3, "0");
  employee.employeeId = `EMP${sequence}`;
});

// Setup association
Employee.belongsTo(Designation, { foreignKey: "designationId", as: "designation" });
Designation.hasMany(Employee, { foreignKey: "designationId", as: "employee" });

export default Employee;
