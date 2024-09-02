// components/Chat.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  typeof window !== "undefined"
    ? process.env.NODE_ENV === "development"
      ? "http://localhost:3002" // Local development URL
      : "https://socketdemochat.onrender.com" // Production URL
    : ""
);

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage); // Clean up the event listener
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Messages</h1>
          {messages.map((msg, index) => (
            <div key={index} className="p-2 bg-blue-100 rounded-lg">
              <p>{msg}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center border-t border-gray-200 bg-white p-2 ml-12">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKey}
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
