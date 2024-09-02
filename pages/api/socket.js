// pages/api/socket.js
import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("A user connected");
      socket.on("message", (msg) => io.emit("message", msg));
    });

    res.socket.server.io = io; // Attach the server instance to Next.js res object.
  }
  res.end();
}
