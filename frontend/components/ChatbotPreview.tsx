import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

export default function ChatbotPreview() {
  const sampleMessages = [
    {
      type: "bot",
      content: "Hello! I'm your Prosperify AI assistant. How can I help you with your financial planning today?",
    },
    {
      type: "user",
      content: "I need help planning for my child's college education.",
    },
    {
      type: "bot",
      content: "I'll help you create a personalized education savings plan. What's your child's current age and when do you plan to start college savings?",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience Smart Financial Guidance</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI chatbot provides instant, personalized financial advice 24/7.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="space-y-4">
                {sampleMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Type your financial question..."
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
                <Button size="icon">
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
