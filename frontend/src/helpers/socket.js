// utils/socket.js
import newMessageAudio from "assets/sound/newMessage.mp3";
import { udpateWhatsappSession } from "slices/auth/login/reducer";
import { handleSocketMessage } from "slices/thunk";
import { CONNECTION_STATE, qrDataReceived, udpateWhatsAppState } from "slices/whatsapp/reducer";
import { io } from "socket.io-client";

const setupSocket = (userId, dispatch) => {
  const newMessageSound = new Audio(newMessageAudio);
  console.log("setupSocket success");
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

  socket.on(userId, (data) => {
    if (data.type === "qr") {
      console.log("QR received");
      dispatch(qrDataReceived(data.qr));
    } else if (data.type === "logout") {
      dispatch(udpateWhatsappSession(false));
      dispatch(udpateWhatsAppState(CONNECTION_STATE.DISCONNECTED));
    } else if (data.type === "authentication") {
      if (data.success) {
        dispatch(udpateWhatsappSession(true));
        dispatch(udpateWhatsAppState(CONNECTION_STATE.CONNECTED));
      }
    } else if (data.type === "chat") {
      if (data.data) {
        dispatch(handleSocketMessage(data.data));
        if (data.data.type === "in") {
          newMessageSound.play();
        }
      } else {
        console.log("New message received", data);
      }
    } else {
      console.log(data);
    }
  });

  return socket;
};

export default setupSocket;
