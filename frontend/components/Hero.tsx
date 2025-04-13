"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold leading-tight mb-6">
              Your AI Financial Advisor for a{" "}
              <span className="text-primary dark:text-slate-200">Prosperous</span> Future
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Personalized financial guidance for middle-class families. Plan your investments, budget, and secure your children's education with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Planning Now
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video rounded-lg overflow-hidden"
          >
            <img
              src="https://st.depositphotos.com/1006318/4174/i/450/depositphotos_41744289-stock-photo-family-lying-on-grass.jpg"
              alt="Family planning their finances"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}