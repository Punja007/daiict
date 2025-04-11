"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { day: "1", amount: 1200 },
  { day: "2", amount: 800 },
  { day: "3", amount: 1500 },
  { day: "4", amount: 950 },
  { day: "5", amount: 1800 },
  { day: "6", amount: 2200 },
  { day: "7", amount: 3500 },
  { day: "8", amount: 1100 },
  { day: "9", amount: 900 },
  { day: "10", amount: 1300 },
  { day: "11", amount: 1600 },
  { day: "12", amount: 800 },
  { day: "13", amount: 1200 },
  { day: "14", amount: 2800 },
  { day: "15", amount: 1100 },
  { day: "16", amount: 1400 },
  { day: "17", amount: 900 },
  { day: "18", amount: 1200 },
  { day: "19", amount: 800 },
  { day: "20", amount: 1500 },
  { day: "21", amount: 1700 },
  { day: "22", amount: 1200 },
  { day: "23", amount: 900 },
  { day: "24", amount: 1100 },
  { day: "25", amount: 1300 },
  { day: "26", amount: 800 },
  { day: "27", amount: 1200 },
  { day: "28", amount: 1500 },
  { day: "29", amount: 1100 },
  { day: "30", amount: 1800 },
]

export function ExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tickLine={false} tickCount={10} />
        <YAxis tickFormatter={(value) => `₹${value}`} width={80} />
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]}
          labelFormatter={(label) => `Day: ${label}`}
        />
        <Area type="monotone" dataKey="amount" stroke="#f43f5e" fill="#fecdd3" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

