import express from "express";
import {
  masterAdminLogin,
  // adminLogin,
  // departmentAdminLogin,
  // staffLogin,
  register,
  forgotPassword
} from "../../controllers/Master/auth.controllers.js";

const router = express.Router();

router.post("/master-admin/login", masterAdminLogin);
// router.post("/admin/login", adminLogin);
// router.post("/department-admin/login", departmentAdminLogin);
// router.post("/staff/login", staffLogin);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);

export default router;
