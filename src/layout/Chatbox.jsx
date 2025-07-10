import React, { useEffect, useState } from "react";
import { SendHorizonal, MessageCircle } from "lucide-react";
import { sendChatMessage } from "../model/Model";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [{ text: "Hi! I'm your assistant. Ask me about any product.", sender: "bot" }];
  });
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMsg].slice(-20);
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const reply = await sendChatMessage(input, updatedMessages);

    const botMsg = { text: reply, sender: "bot" };
    const finalMessages = [...updatedMessages, botMsg].slice(-20); 
    setMessages(finalMessages);
    setLoading(false);
  };


  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-lg flex flex-col">
          <div className="bg-green-600 text-white rounded-t-2xl px-4 py-2 flex justify-between items-center">
            <span>Assistant</span>
            <button onClick={toggleChat} className="text-white text-sm">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${msg.sender === "user"
                  ? "bg-green-100 ml-auto text-right"
                  : "bg-gray-200 mr-auto"
                  }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-500">Typing...</div>
            )}
          </div>
          <div className="flex border-t px-2 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 outline-none px-2 py-1 text-sm border rounded-l-lg"
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 text-white px-3 rounded-r-lg hover:bg-green-600"
            >
              <SendHorizonal size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
        >
          <MessageCircle size={20} />
        </button>
      )}
    </div>
  );
};

export default Chatbox;
