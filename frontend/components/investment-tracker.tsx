"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, Calendar, Bell } from "lucide-react";

// Dummy data
const investmentSummary = {
  totalInvested: 500000,
  currentValue: 575000,
  gainLoss: 75000,
  gainLossPercentage: 15,
};

const investmentsByCategory = [
  { category: "Stocks", value: 250000, percentage: 40 },
  { category: "Mutual Funds", value: 150000, percentage: 30 },
  { category: "Fixed Deposits", value: 100000, percentage: 20 },
  { category: "Crypto", value: 75000, percentage: 10 },
];

const investments = [
  {
    name: "HDFC Bank Ltd.",
    category: "Stocks",
    invested: 50000,
    currentValue: 65000,
    return: 30,
  },
  {
    name: "SBI Blue Chip Fund",
    category: "Mutual Funds",
    invested: 25000,
    currentValue: 28000,
    return: 12,
  },
  {
    name: "ICICI FD",
    category: "Fixed Deposits",
    invested: 100000,
    currentValue: 106000,
    return: 6,
  },
  {
    name: "Bitcoin",
    category: "Crypto",
    invested: 25000,
    currentValue: 32000,
    return: 28,
  },
];

const reminders = [
  {
    type: "SIP",
    name: "NIFTY Index Fund",
    date: "5th of every month",
    amount: 5000,
  },
  {
    type: "Maturity",
    name: "HDFC Bank FD",
    date: "December 15, 2024",
    amount: 100000,
  },
];

export function InvestmentTracker() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{investmentSummary.totalInvested.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{investmentSummary.currentValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              ₹{investmentSummary.gainLoss.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{investmentSummary.gainLossPercentage}% overall
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Investment Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Distribution</CardTitle>
          <CardDescription>Portfolio allocation by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investmentsByCategory.map((item) => (
              <div key={item.category} className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm text-muted-foreground">
                      ₹{item.value.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment List */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
          <CardDescription>List of all investments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investment Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Invested Amount</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead className="text-right">Return</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => (
                <TableRow key={investment.name}>
                  <TableCell className="font-medium">{investment.name}</TableCell>
                  <TableCell>{investment.category}</TableCell>
                  <TableCell className="text-right">
                    ₹{investment.invested.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{investment.currentValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-emerald-600">
                    +{investment.return}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Investment Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Reminders</CardTitle>
          <CardDescription>SIP and maturity dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.name}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {reminder.type === "SIP" ? (
                    <Calendar className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Bell className="h-5 w-5 text-orange-500" />
                  )}
                  <div>
                    <p className="font-medium">{reminder.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {reminder.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{reminder.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{reminder.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}