import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../Master/Employee.js";

const Chat = sequelize.define("Chat", {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id"
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "chats",
  timestamps: true
});

// Relationships
Chat.belongsTo(User, { as: "sender", foreignKey: "senderId" });
Chat.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });

export default Chat;
