import React, { useState, useEffect } from "react";
import "./ChatBox.css";

interface ChatWidgetProps {
  apiUrl?: string;
  onProductsMatched?: (products: any[]) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  apiUrl = "http://127.0.0.1:8000/chat",
  onProductsMatched,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("chatHistory");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botReply = { sender: "bot", text: data.reply || "No response." };
      setMessages((prev) => [...prev, botReply]);
      if (data.matched_products && onProductsMatched) {
        onProductsMatched(data.matched_products);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div>
      {!isOpen && (
        <button className="chatButton" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatContainer">
          <div className="chatHeader">
            <span>OneStop Assistant</span>
            <button className="chatClose" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          <div className="chatMessages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatMessage ${msg.sender === "user" ? "user" : "bot"}`}
              >
                <div className={`chatBubble ${msg.sender}`}>{msg.text}</div>
              </div>
            ))}
            {loading && <p>...</p>}
          </div>

          <div className="chatInputContainer">
            <input
              className="chatInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button className="chatSend" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
