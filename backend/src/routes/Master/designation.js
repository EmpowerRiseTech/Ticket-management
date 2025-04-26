import express from 'express'
import { create, getAll, getById, remove, update } from '../../controllers/Master/designation.js';
const router = express.Router();
// const controller = require("../../controllers/Master/designation.js");
// router.get("/",protect,checkPermissions("Designation","read"), getAll);


router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
