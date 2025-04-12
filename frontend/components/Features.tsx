import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, Lightbulb, GraduationCap } from "lucide-react";

const features = [
  {
    title: "Smart Budgeting",
    description: "AI-powered analysis of your spending patterns to create personalized budget plans.",
    icon: PiggyBank,
  },
  {
    title: "Investment Guidance",
    description: "Data-driven investment recommendations tailored to your risk profile and goals.",
    icon: TrendingUp,
  },
  {
    title: "Financial Planning",
    description: "Comprehensive future planning for retirement, emergency funds, and major life events.",
    icon: Lightbulb,
  },
  {
    title: "Education Planning",
    description: "Strategic planning for your children's education expenses and savings goals.",
    icon: GraduationCap,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 py-30">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-slate-100">Why Choose Prosperify?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto dark:text-slate-300 ">
            Our AI-powered platform provides comprehensive financial guidance tailored to your family's needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full dark:bg-slate-700 dark:border-slate-600">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary dark:text-slate-200 mb-4" />
                  <CardTitle className="dark:text-slate-100">{feature.title}</CardTitle>
                  <CardDescription className="dark:text-slate-300 py-[17px]">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}