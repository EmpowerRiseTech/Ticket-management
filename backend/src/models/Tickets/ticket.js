import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import Employee from "../Master/Employee.js";
import Department from "../Master/department.js";

const Ticket = sequelize.define("Ticket", {
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: "id",
    },
  },
  departmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: "id",
    },
  },
  assignToDepartmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Department,
      key: "id",
    },
  },
  priority: {
    type: DataTypes.ENUM("urgent", "less urgent", "general"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "in-progress", "closed"),
    allowNull: false,
    defaultValue: "open",
  },
  ticketType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: DataTypes.STRING,
  requestDetails: DataTypes.TEXT,
  attachment: DataTypes.STRING,
}, {
  tableName: "tickets",
  timestamps: true,
});

// Associations
Ticket.belongsTo(Employee, { foreignKey: "employeeId", as: "employee" });
Employee.hasMany(Ticket, { foreignKey: "employeeId", as: "tickets" });

Ticket.belongsTo(Department, { foreignKey: "departmentId", as: "department" });
Department.hasMany(Ticket, { foreignKey: "departmentId", as: "tickets" });

Ticket.belongsTo(Department, { foreignKey: "assignToDepartmentId", as: "assignTodepartment" });

export default Ticket;
