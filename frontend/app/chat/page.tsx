"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Copy, Volume2, Mic, MicOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function ChatApp() {
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId") || Date.now().toString();
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

  const sendMessage = async (voiceInput: string = "") => {
    const finalInput = voiceInput || input;
    if (!finalInput.trim()) return;

    setLoading(true);
    const userMessage: Message = { role: "user", content: finalInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        session_id: sessionId,
        query: finalInput,
      });

      const botMessage: Message = { role: "assistant", content: response.data.response };
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

  const toggleListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-IN";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onresult = (event: { results: { transcript: any; }[][]; }) => {
        const transcript = event.results[0][0].transcript;
        sendMessage(transcript);
      };

      recognitionRef.current.onerror = (event: { error: any; }) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
        <Card className="w-full max-w-3xl bg-white shadow-lg border border-gray-200">
          <CardHeader className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-full p-2 w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Prosperify</h1>
            </div>
          </CardHeader>

          <CardContent className="h-[500px] overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-xs break-words ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                  {msg.role === "assistant" && (
                    <div className="flex space-x-2 mt-1">
                      <Button variant="ghost" size="icon" onClick={() => copyToClipboard(msg.content)}>
                        <Copy size={16} className="text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => speakText(msg.content)}>
                        <Volume2 size={16} className="text-gray-600" />
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
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-gray-500 flex items-center space-x-2"
              >
                <Loader2 className="animate-spin" size={18} />
                <p>Typing...</p>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardContent className="flex items-center p-4 border-t bg-gray-50">
            <Input
              type="text"
              className="flex-grow bg-white border-gray-200 text-gray-900"
              placeholder="Ask Prosperify about your finances..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <Button
              onClick={() => sendMessage()}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading || !input.trim()}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Send"}
            </Button>
            <Button
              onClick={toggleListening}
              className={`ml-2 ${
                isListening ? "bg-red-500" : "bg-green-500"
              } hover:opacity-90 text-white`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
