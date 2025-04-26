import express from "express";
import upload from "../../middlewares/upload.js";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../../controllers/Ticket/ticketController.js";

const router = express.Router();

router.post("/", upload.single("attachment"), createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.put("/:id", upload.single("attachment"), updateTicket);
router.delete("/:id", deleteTicket);

export default router;
