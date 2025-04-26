import ChatMessage from "../models/socket/chatMessage.js";
import User from "../models/Master/User.js";
import Department from "../models/Master/department.js";

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ userId }) => {
      socket.join(`user_${userId}`);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
      try {
        const sender = await User.findByPk(senderId, {
          include: [{ association: "role" }, { association: "department" }]
        });
        const receiver = await User.findByPk(receiverId, {
          include: [{ association: "role" }, { association: "department" }]
        });

        const allowed = isAllowedToChat(
          sender.role.roleName,
          receiver.role.roleName,
          sender.departmentId,
          receiver.departmentId
        );

        if (!allowed) {
          socket.emit("error", "Unauthorized chat attempt");
          return;
        }

        const newMsg = await ChatMessage.create({ senderId, receiverId, message });

        io.to(`user_${receiverId}`).emit("receiveMessage", newMsg);
        socket.emit("messageSent", newMsg);
      } catch (err) {
        console.error("Chat error:", err.message);
        socket.emit("error", "Server error in chat");
      }
    });
  });
}

// ✅ Enhanced permission logic with department match
function isAllowedToChat(senderRole, receiverRole, senderDeptId, receiverDeptId) {
  const sameDept = senderDeptId === receiverDeptId;

  const allowedCombinations = [
    ["Department Admin", "Staff"],
    ["Staff", "Department Admin"],
    ["Department Admin", "Vendors"],
    ["Vendors", "Department Admin"]
  ];

  const crossDeptCombinations = [
    ["Department Admin", "Admin"],
    ["Admin", "Department Admin"],
    ["Department Admin", "Super Admin"],
    ["Super Admin", "Department Admin"]
  ];

  return (
    allowedCombinations.some(([from, to]) => from === senderRole && to === receiverRole && sameDept) ||
    crossDeptCombinations.some(([from, to]) => from === senderRole && to === receiverRole)
  );
}
