// routes/Master/employee.routes.js
import express from "express";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "../../controllers/Master/EmployeeController.js";


const router = express.Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
