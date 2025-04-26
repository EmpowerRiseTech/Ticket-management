import express from "express";
import {
  getAllLocation,
  getByIdLocation,
  createLocation,
  updateLocation,
  removeLocation,
} from "../../controllers/Master/locationController.js";

const router = express.Router();

router.get("/", getAllLocation); // supports ?search=&industry=&page=&limit=
router.get("/:id", getByIdLocation);
router.post("/", createLocation);
router.put("/:id", updateLocation);
router.delete("/:id", removeLocation);

export default router;
