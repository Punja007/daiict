"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Housing", value: 15000, color: "#3b82f6" },
  { name: "Groceries", value: 8500, color: "#22c55e" },
  { name: "Transportation", value: 5500, color: "#eab308" },
  { name: "Utilities", value: 4200, color: "#a855f7" },
  { name: "Dining Out", value: 3800, color: "#ef4444" },
  { name: "Entertainment", value: 2500, color: "#f97316" },
  { name: "Others", value: 2850, color: "#14b8a6" },
]

export function ExpenseCategoryChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
      </PieChart>
    </ResponsiveContainer>
  )
}

