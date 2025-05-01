import express from "express";
import {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
  seedDefaultFeatures,mutipleFeatures
} from "../../controllers/Roles&Permissions/featureController.js";

const router = express.Router();


router.get("/", getFeatures);


router.post("/", createFeature);

router.post('/mutiple',mutipleFeatures)

router.put("/:id", updateFeature);


router.delete("/:id", deleteFeature);


router.post("/seed", seedDefaultFeatures);

export default router;
