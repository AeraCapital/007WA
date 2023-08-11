// utils/socket.js
import { io } from "socket.io-client";
import { CONNECTION_STATE, qrDataReceived, udpateWhatsAppState } from "slices/whatsapp/reducer";
import { handleSocketMessage } from "slices/thunk";

const setupSocket = (userId, dispatch) => {
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
      console.log("Logged out");
      let authData = JSON.parse(localStorage.getItem("authUser"));
      authData.user.activeWhatsappSession = false;
      localStorage.setItem("authUser", JSON.stringify(authData));
      dispatch(udpateWhatsAppState(CONNECTION_STATE.DISCONNECTED));
    } else if (data.type === "authentication") {
      if (data.success) {
        let authData = JSON.parse(localStorage.getItem("authUser"));
        authData.user.activeWhatsappSession = true;
        localStorage.setItem("authUser", JSON.stringify(authData));
        dispatch(udpateWhatsAppState(CONNECTION_STATE.CONNECTED));
      }
    } else if (data.type === "chat") {
      if (data.data) {
        dispatch(handleSocketMessage(data.data));
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
