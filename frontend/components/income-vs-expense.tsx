"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useState, useEffect} from "react";

interface User {
  name: string;
  email: string;
  profilePicture: string;
  totalIncome: Record<string, number>;
  totalExpenses: Record<string, number>;
  investmentDistribution: Record<string, { invested: number; currentValue: number }>;
  emis: Record<string, { price: number; dueDate: string }>;
}
const data = [
  {
    name: "Jan",
    income: 52000,
    expense: 38000,
  },
  {
    name: "Feb",
    income: 54000,
    expense: 39500,
  },
  {
    name: "Mar",
    income: 54000,
    expense: 41200,
  },
  {
    name: "Apr",
    income: 56000,
    expense: 40800,
  },
  {
    name: "May",
    income: 54000,
    expense: 37500,
  },
  {
    name: "Jun",
    income: 58500,
    expense: 42350,
  },
]

export function IncomeVsExpenseChart() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/user/alice.johnson@example.com")
    .then((response) => {
      console.log(response); // Log the response
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    })
    .then((data) => setUser(data))
    .catch((err) => {
      console.error(err); // Log the error
      setError(err.message);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `₹${value / 1000}K`} width={80} />
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString()}`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Bar dataKey="income" name="Income" fill="#4ade80" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expense" name="Expense" fill="#f87171" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

