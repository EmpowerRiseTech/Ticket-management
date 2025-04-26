import User from "../../models/Master/User.js";
import Chat from "../../models/socket/chat.js";
import ChatMessage from "../../models/socket/chatMessage.js";

// Fetch chat history between 2 users
export const getChatHistory = async (req, res) => {
  const { senderId, receiverId } = req.query;

  try {
    const messages = await ChatMessage.findAll({
      where: {
        senderId,
        receiverId,
      },
      order: [["timestamp", "ASC"]],
    });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
    try {
      const { senderId, receiverId, message } = req.body;
  
      if (!senderId || !receiverId || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const chat = await Chat.create({ senderId, receiverId, message });
  
      res.status(201).json({
        message: "Message sent successfully",
        data: chat,
      });
    } catch (error) {
      res.status(500).json({ message: "Error sending message", error: error.message });
    }
  };
