// pages/index.js
import { useEffect } from "react";
import Chat from "/component/chat"; // Correct import path

export default function Home() {
  useEffect(() => {
    // Initialize the Socket.IO server
    fetch("/api/socket")
      .then(() => {
        console.log("Socket.IO server initialized");
      })
      .catch((error) => {
        console.error("Error initializing Socket.IO server:", error);
      });
  }, []);

  return (
    <div>
      <h1>Real-Time Chat with Socket.IO</h1>
      <Chat />
    </div>
  );
}
