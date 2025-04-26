import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateLoginTime, updateUser } from "../../controllers/Master/userController";


const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/login-time/:id", updateLoginTime);

export default router;
