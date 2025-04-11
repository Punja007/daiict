"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

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

