"use client";

import { useState } from "react";
import {
  BarChart,
  CreditCard,
  PieChart,
  TrendingUp,
  Bot,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function AboutContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div id="contact" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* About Section */}
        <div className="space-y-6 rounded-2xl bg-card p-8 shadow-lg">
          <h2 className="text-3xl font-bold tracking-tight">
            Smart Expense Management
          </h2>
          <p className="text-lg text-muted-foreground">
            Take control of your finances with our comprehensive expense tracking platform.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <BarChart className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Transactions</h3>
                <p className="text-sm text-muted-foreground">Track daily expenses</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <CreditCard className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">EMI Management</h3>
                <p className="text-sm text-muted-foreground">Monitor your loans</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <Bot className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">AI Assistant</h3>
                <p className="text-sm text-muted-foreground">Smart insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg border p-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium">Investments</h3>
                <p className="text-sm text-muted-foreground">Grow your wealth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-2xl bg-card p-8 shadow-lg">
          <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
          <p className="mt-2 text-muted-foreground">
            Have questions? We&apos;re here to help.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <Textarea
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>support@prosperify.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}