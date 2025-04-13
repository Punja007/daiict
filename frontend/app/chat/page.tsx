"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, Copy, Volume2, Mic } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function ChatApp() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
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

  const handleVoiceInput = () => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

<<<<<<< HEAD
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
=======
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
>>>>>>> 57df807e100459e740783bc0046f9e0fb89aee01
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
    setListening(true);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <Card className="w-full max-w-4xl h-full flex flex-col shadow-2xl rounded-3xl bg-white border border-gray-200">
          <CardHeader className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-3xl">
            <h1 className="text-xl font-bold text-blue-700">Prosperify 💰</h1>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-5 py-3 max-w-sm shadow-md ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="prose prose-sm">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                  {msg.role === "assistant" && (
                    <div className="flex space-x-2 mt-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(msg.content)}
                        className="hover:text-blue-500"
                      >
                        <Copy size={18} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => speakText(msg.content)}
                        className="hover:text-blue-500"
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
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
                className="text-gray-400 flex items-center space-x-2"
              >
                <Loader2 className="animate-spin" size={18} />
                <p>Typing...</p>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardContent className="flex items-center gap-3 p-6 border-t bg-gray-50 rounded-b-3xl">
            <Button
              onClick={handleVoiceInput}
              className={`bg-white border hover:bg-blue-100 text-blue-600 rounded-full px-4 py-2 ${listening ? "animate-pulse" : ""}`}
              title="Speak"
            >
              <Mic size={20} />
            </Button>
            <Input
              type="text"
              className="flex-grow border-gray-300 bg-white px-4 py-2 rounded-full shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <Button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2"
              disabled={loading || !input.trim()}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Send"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
