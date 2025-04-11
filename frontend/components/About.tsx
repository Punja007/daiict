import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1475503572774-15a45e5d60b9"
              alt="Financial planning session"
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Your Journey to Financial Freedom Starts Here
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Prosperify, we understand that managing finances can be overwhelming. That's why we've created an AI-powered platform that makes financial planning accessible and straightforward for middle-class families.
              </p>
              <p>
                Our advanced chatbot combines financial expertise with artificial intelligence to provide personalized guidance on investments, budgeting, and educational planning. We're here to help you make informed decisions about your family's financial future.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
