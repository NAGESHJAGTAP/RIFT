import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import app from './app.js';
import connectDB from './config/db.js';
import { socketService } from './services/socketService.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const server = http.createServer(app);

// Initialize Socket.io Server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Basic Socket connection handler
io.on('connection', (socket) => {
  console.log(`Socket Client connected: ${socket.id}`);

  socket.on('activityResponse', (data) => {
    socketService.handleResponse(data, socket);
  });

  socket.on('disconnect', () => {
    console.log(`Socket Client disconnected: ${socket.id}`);
  });
});

// Export Socket.io instance to be used across modules later
export { io };

const PORT = process.env.PORT || 5000;

// Start Server
const serverInstance = server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` AI Passport Backend Server running in ${process.env.NODE_ENV} mode`);
  console.log(` Listening on: http://localhost:${PORT}`);
  console.log(`===================================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  serverInstance.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception Error: ${err.message}`);
  serverInstance.close(() => process.exit(1));
});
