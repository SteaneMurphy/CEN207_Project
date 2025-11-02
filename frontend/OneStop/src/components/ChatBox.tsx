import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

/*
  Types required for the chatbox, includes the AI assistant endpoint URL ('/chat')
  and a an array of matched products returned by the assistant
*/
interface ChatBoxProps {
  apiUrl?: string;
  onProductsMatched?: (products: any[]) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  apiUrl = "http://127.0.0.1:8000/chat",
  onProductsMatched,
}) => {
  const [isOpen, setIsOpen] = useState(false);                                            // sets state on chatbox being open or closed
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);       // adds any messages from the conversation to the message chain
  const [input, setInput] = useState("");                                                 // resets the input field
  const [loading, setLoading] = useState(false);                                          // displays the loading state (...)
  const messagesEndRef = useRef<HTMLDivElement | null>(null);                             // keeps a reference to the last message for chatbox scrolling

  /*
    Retrieves chat messages from local storage for further queries
  */
  useEffect(() => {
    const stored = localStorage.getItem("chatHistory");
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  /*
    Adds each chat message to local storage for retrieval on further queries
  */
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  /*
    Updates the reference to the last message for use in chatbox scrolling
  */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /*
    If the user input is not empty, takes the input and sends this to the backend
    endpoint (/chat). The last message is appended to the local storage of the
    chat history.

    Fetch call is sent to the endpoint with the message content and awaits the
    reply from the AI assistant. The response includes:

    - a personalised customer service message to the customer
    - an array of matched products determined by the AI

    The array of matched products is updated with this list and is rendered
    by the SendGrid.tsx component.

    Standard error message if no response is returned.
  */
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");                                               // reset the user input field
    setLoading(true);                                           // display the loading message (...)

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

  /*
    Detect if user hit the 'enter' button instead of clicking the 
    'send' UI element. Triggers the 'sendMessage' hook.
  */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  /*
    All messages are looped over and printed to the chatbox element. The final <div>
    element is used to indicate the last message reference that the chatbox should
    automatically scroll to.

    Standard boolean check on whether the chatbox is open or closed (setIsOpen)

    Standard onClick assignment to 'sendMessage' on the 'send' button
    element.
  */
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
            {messages.length === 0 ? (
              <div className="placeholderMessage">
                <p>Welcome to OneStop! How can I help you today?</p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chatMessage ${msg.sender === "user" ? "user" : "bot"}`}
                  >
                    <div className={`chatBubble ${msg.sender}`}>{msg.text}</div>
                  </div>
                ))}
                {loading && <p>...</p>}
                <div ref={messagesEndRef} />
              </>
            )}
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

export default ChatBox;
