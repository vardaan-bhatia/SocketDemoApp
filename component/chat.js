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
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKey} // Attach the event handler
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
