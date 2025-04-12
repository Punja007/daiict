"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, Sparkles, Coins, ChevronDown, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Prosperify, your AI financial assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-[url('/assets/finance-pattern.png')] bg-cover bg-center bg-black/95">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between p-6 border-b border-amber-500/20 bg-gradient-to-r from-black via-amber-950 to-black"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-md"
            />
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="relative bg-black p-3 rounded-full border-2 border-amber-500"
            >
              <Crown className="w-6 h-6 text-amber-500" />
            </motion.div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Prosperify
            </h1>
            <p className="text-amber-200/70">Wealth Management AI</p>
          </div>
        </div>
        <Coins className="w-8 h-8 text-amber-500 animate-bounce" />
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-12"
        >
          <div className="text-center max-w-2xl p-8 rounded-3xl bg-gradient-to-b from-amber-950 to-black border border-amber-500/20">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-24 h-24 mx-auto mb-6"
            >
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-20" />
              <div className="relative bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full p-6 shadow-lg shadow-amber-500/20">
                <Sparkles className="w-12 h-12 text-black" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-amber-500 mb-4">Financial Excellence Awaits</h2>
            <p className="text-amber-200/70 text-lg leading-relaxed">
              Your personal gateway to financial wisdom. Let's build your prosperity together.
            </p>
          </div>
        </motion.div>

        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ x: message.role === "user" ? 20 : -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 p-2">
                <Crown className="w-4 h-4 text-black" />
              </div>
            )}
            <div
              className={`max-w-[70%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black"
                  : "bg-gradient-to-b from-amber-950 to-black border border-amber-500/20 text-amber-100"
              }`}
            >
              <p className="leading-relaxed">{message.content}</p>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-6 bg-gradient-to-t from-black via-amber-950 to-black border-t border-amber-500/20"
      >
        <div className="flex items-center gap-3 max-w-4xl mx-auto bg-black/50 p-2 rounded-2xl border border-amber-500/20">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your financial future..."
            className="flex-1 bg-transparent border-0 text-amber-100 placeholder-amber-500/50 focus:ring-0"
          />
          <Button
            onClick={handleSend}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 text-black rounded-xl px-6 py-6"
            disabled={!input.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
          <Button className="bg-black hover:bg-amber-950 text-amber-500 rounded-xl p-6 border border-amber-500/20">
            <Mic className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}