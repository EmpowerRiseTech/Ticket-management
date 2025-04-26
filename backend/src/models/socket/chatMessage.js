import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../Master/User.js";

const ChatMessage = sequelize.define("ChatMessage", {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "chat_messages",
  timestamps: false,
});

ChatMessage.belongsTo(User, { foreignKey: "senderId", as: "sender" });
ChatMessage.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

export default ChatMessage;
