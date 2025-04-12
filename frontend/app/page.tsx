"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { AboutContact } from "@/components/about-contact";
import FormWizard from "@/components/form-wizard";
import { FormProvider } from "@/context/FormContext";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";

interface Expense {
  _id: string;
  title: string;
  amount: number;
  date: string;
}

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Prosperify</h1>
      <p className="text-lg text-gray-600 mb-8">Your AI-powered personal finance manager</p>
      <div className="space-x-4">
        <a 
          href="/login" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Login
        </a>
        <a 
          href="/signup" 
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
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
      <Toaster />
      <Navbar />
      <main>
        <Hero />
        <div className="container mx-auto px-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Hide Form' : 'Add Financial Data'}
          </button>

          {showForm && (
            <FormProvider>
              <FormWizard />
            </FormProvider>
          )}

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
        </div>
        <Features />
        <About />
        <AboutContact />
      </main>
      <Footer />
    </div>
  );
}
