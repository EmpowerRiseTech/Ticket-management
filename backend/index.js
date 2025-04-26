import express from 'express';
import dotenv from 'dotenv';
import http from "http";
import { Server } from "socket.io";
import './src/config/database.js';
import cors from 'cors';
import socketHandler from "./src/socket/socket.js";
import roleRoutes from "./src/routes/Roles-Permissions/roleRoutes.js"
import featureRoutes from "./src/routes/Roles-Permissions/featureRoutes.js";
import permissionRoutes from "./src/routes/Roles-Permissions/permissionRoutes.js";
import designationRoutes from "./src/routes/Master/designation.js";
import locationRoutes from "./src/routes/Master/locationRoutes.js";

import departmentRoutes from "./src/routes/Master/departmentRoutes.js";
import branchRoutes from "./src/routes/Master/branchRoutes.js"
import employeeRoutes from "./src/routes/Master/employeeRoutes.js"
import AuthRouter from "./src/routes/Master/auth.routes.js"
import ticketRoutes from "./src/routes/Ticket/ticketRoutes.js"
import chatRoutes from "./src/routes/socket/chatRoutes.js"





dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3001/" },
  methods: ["GET", "POST"],
});

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use("/api/roles", roleRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/branch",branchRoutes)
app.use("/api/auth",AuthRouter)
app.use("/api/tickets",ticketRoutes)
app.use("/api/chat", chatRoutes);


socketHandler(io);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
