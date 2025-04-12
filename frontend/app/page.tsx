"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { AboutContact } from "@/components/about-contact";
import { useEffect, useState } from "react";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  date: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the backend
    fetch("http://localhost:5000/api/expenses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        return response.json();
      })
      .then((data) => setExpenses(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <AboutContact />

{/* Display Expenses */}
<section className="p-4">
          <h2 className="text-2xl font-bold mb-4">Expenses</h2>
          {error && <p className="text-red-500">Error: {error}</p>}
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id} className="mb-2 border-b pb-2">
                <div className="flex justify-between">
                  <span>{expense.title}</span>
                  <span>${expense.amount}</span>
                  <span>{new Date(expense.date).toLocaleDateString()}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
