import express from "express";
import { getRoles, createRole, updateRole, deleteRole, seedDefaultRoles } from "../../controllers/Roles&Permissions/roleController.js";

const router = express.Router();

router.get("/", getRoles);

router.post("/", createRole);

router.put("/:id", updateRole);

router.delete("/:id", deleteRole);

router.post("/seed", seedDefaultRoles);

export default router;
