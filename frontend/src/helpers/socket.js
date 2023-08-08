// utils/socket.js
import { io } from "socket.io-client";

const setupSocket = (userId) => {
  // const serverURL = "http://localhost:3002"; //"https://sassy-apple-dev.dhoon.co";
  const serverURL = "https://sassy-apple-dev.dhoon.co";
  const socket = io(serverURL);

  socket.on("connect", () => {
    console.log("Connected to the server");
    socket.emit("join", userId);
  });

  socket.on("connect_error", (error) => {
    console.error("WebSocket connection error:", error);
  });

  return socket;
};

export default setupSocket;
