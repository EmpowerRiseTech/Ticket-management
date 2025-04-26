import express from "express";
import {
  getAllDepartment,
  getByIdDepartment,
  createDepartment,
  updateDepartment,
  removeDepartment,
} from "../../controllers/Master/departmentController.js";

const router = express.Router();

router.get("/", getAllDepartment);            // ?search= &name= &page=1 &limit=10
router.get("/:id", getByIdDepartment);
router.post("/", createDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", removeDepartment);

export default router;
