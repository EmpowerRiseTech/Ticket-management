import express from "express";
import { getChatHistory, sendMessage } from "../../controllers/socket/chatController.js";

const router = express.Router();

router.get("/history", getChatHistory);
router.post("/send", sendMessage);
export default router;
