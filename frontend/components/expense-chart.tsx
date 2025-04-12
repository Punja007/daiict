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
    <div className="w-full h-[400px] p-4 rounded-lg bg-card">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="0" 
            stroke="#e2e8f0" 
            vertical={false}
          />
          <XAxis 
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            tickFormatter={(value) => `₹${value}`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => [`₹${value.toLocaleString()}`, "Daily Expense"]}
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              padding: '12px'
            }}
            cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
          />
          <Area 
            type="natural"
            dataKey="amount" 
            stroke="#3b82f6" 
            fill="url(#expenseGradient)"
            strokeWidth={3}
            dot={{ stroke: '#3b82f6', fill: 'white', strokeWidth: 2, r: 4 }}
            activeDot={{ stroke: '#3b82f6', fill: '#3b82f6', strokeWidth: 2, r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

