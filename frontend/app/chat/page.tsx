"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Copy, Volume2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function ChatApp() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSessionId =
      localStorage.getItem("sessionId") || Date.now().toString();
    setSessionId(storedSessionId);
    setMessages(JSON.parse(localStorage.getItem("messages") || "[]"));
  }, []);

  useEffect(() => {
    if (sessionId) localStorage.setItem("sessionId", sessionId);
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages, sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        session_id: sessionId,
        query: input,
      });

      const botMessage = { role: "assistant", content: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-2xl shadow-lg rounded-lg bg-white border border-gray-300">
          <CardHeader className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
            <h1 className="text-lg font-semibold">Prosperify 💰</h1>
          </CardHeader>

          <CardContent className="h-96 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-3 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs flex flex-col items-center space-x-2 ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                  {msg.role === "assistant" && (
                    <div className="flex space-x-2 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(msg.content)}
                      >
                        <Copy size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => speakText(msg.content)}
                      >
                        <Volume2 size={18} />
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-gray-400 flex items-center space-x-2"
              >
                <Loader2 className="animate-spin" size={18} />
                <p>Typing...</p>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardContent className="flex items-center p-4 border-t bg-gray-50 rounded-b-lg">
            <Input
              type="text"
              className="flex-grow border-gray-300"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white"
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Send"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
