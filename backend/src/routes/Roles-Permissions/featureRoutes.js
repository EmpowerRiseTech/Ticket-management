import express from "express";
import {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
  seedDefaultFeatures,
} from "../../controllers/Roles&Permissions/featureController.js";

const router = express.Router();


router.get("/", getFeatures);


router.post("/", createFeature);


router.put("/:id", updateFeature);


router.delete("/:id", deleteFeature);


router.post("/seed", seedDefaultFeatures);

export default router;
