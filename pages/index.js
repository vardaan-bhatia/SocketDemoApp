// pages/index.js
import { useEffect } from "react";
import Chat from "/component/chat"; // Ensure the path is correct

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Real-Time Chat with Socket.IO
        </h1>
        <div className="flex items-center justify-center">
          <Chat />
        </div>
      </div>
    </div>
  );
}
