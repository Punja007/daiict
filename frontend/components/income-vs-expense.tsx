"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

interface MonthlyIncomeVsExpenses {
  [month: string]: {
    income: number;
    expences: number;
  };
}

interface User {
  name: string;
  email: string;
  profilePicture: string;
  monthlyIncomeVsExpenses: MonthlyIncomeVsExpenses; // Monthly income and expenses (e.g., { "January 2025": { income: 50000, expense: 40000 } })
  investmentDistribution: Record<string, { invested: number; currentValue: number }>;
  emis: Record<string, { price: number; dueDate: string }>;
}

export function IncomeVsExpenseChart() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ name: string; income: number; expense: number }[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/bob.smith@example.com");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData: User = await response.json();
        setUser(userData);

        // Ensure monthlyIncomeVsExpenses exists
        if (!userData.monthlyIncomeVsExpenses) {
          throw new Error("User data is missing monthlyIncomeVsExpenses");
        }

        // Transform the data for the chart
        const chartData = Object.entries(userData.monthlyIncomeVsExpenses).map(([month, values]) => ({
          name: month, // Month name
          income: values.income, // Income for the month
          expense: values.expences, // Expense for the month
        }));
        setData(chartData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

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
  );
}