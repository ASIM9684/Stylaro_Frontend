import React, { useEffect, useRef, useState } from "react";
import { SendHorizonal, MessageCircle, Mic, X } from "lucide-react";
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
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

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

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInput(speechText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-lg flex flex-col">
          <div className="bg-green-600 text-white rounded-t-2xl px-4 py-2 flex justify-between items-center">
            <span>Assistant</span>
            <button onClick={toggleChat} className="text-white text-sm">
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-sm">
 {messages.map((msg, index) => {
  return msg.sender === "user" ? (
    <div
      key={index}
      className="p-2 bg-green-100 rounded-lg max-w-[80%] ml-auto text-right"
    >
      {msg.text}
    </div>
  ) : (
    <div
      key={index}
      className="bg-gray-200 p-2 rounded-lg max-w-[80%] mr-auto whitespace-pre-line"
    >
      {(() => {
        const blocks = msg.text.split("\n\n");
        const productBlocks = blocks.filter(b => b.includes("Product:"));
        const messageTextOnly = blocks
          .filter(b => !b.includes("Product:"))
          .join("\n\n");

        return (
          <>
            {/* Show only the message text */}
            {messageTextOnly && (
              <div className="mb-2 whitespace-pre-line text-sm">
                {messageTextOnly}
              </div>
            )}

            {/* Render product cards below */}
            {productBlocks.map((productBlock, idx) => {
              const lines = productBlock.split("\n");
              const productData = {};
              lines.forEach(line => {
                const [key, ...rest] = line.split(": ");
                productData[key?.trim()] = rest.join(": ").trim();
              });

              return (
                <div
                  key={idx}
                  className="mb-2 p-2 border rounded bg-white shadow text-left text-xs"
                >
                  <div>
                    <strong>{productData["Product"]}</strong>
                  </div>

                  {productData["Image"]?.startsWith("http") && (
                    <img
                      src={productData["Image"]}
                      alt={productData["Product"] || "Product Image"}
                      className="w-24 h-24 object-contain rounded my-2"
                    />
                  )}

                  <div>
                     Price: {productData["Price"]}
                  </div>

                  <div> Rating: {productData["Rating"]}</div>
                  <div> Gender: {productData["Gender"]}</div>
                  <div> Category: {productData["Category"]}</div>
                  <div> Color: {productData["Color"]}</div>
                  <div> Quantity: {productData["Quantity"]}</div>
                  <div> Discount: %{productData["Discount"]}</div>
                </div>
              );
            })}
          </>
        );
      })()}
    </div>
  );
})}

            {loading && <div className="text-xs text-gray-500">Typing...</div>}
          </div>
       <div className="flex border-t px-2 py-2 items-center">
  <button
    onClick={startListening}
    className={`w-9 h-9 flex items-center justify-center rounded-full mr-2 ${
      isListening ? "bg-red-100" : "bg-gray-100"
    }`}
    title="Click to speak"
  >
    <Mic className={isListening ? "text-red-600" : "text-gray-600"} size={16} />
  </button>

  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    placeholder="Type a message..."
    className="flex-1 outline-none px-2 py-1 text-sm border rounded-l-lg h-9"
  />

  <button
    onClick={sendMessage}
    className="h-9 bg-green-500 text-white px-3 rounded-r-lg hover:bg-green-600"
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
