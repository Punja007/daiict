"use client";

import { useState, useEffect} from "react";
import Link from "next/link";
import {
  BarChart,
  CreditCard,
  HomeIcon,
  IndianRupee,
  Menu,
  PieChart,
  TrendingUp,
  User,
  X,
  LogOut,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseChart } from "@/components/expense-chart";
import { IncomeVsExpenseChart } from "@/components/income-vs-expense";
import { ExpenseCategoryChart } from "@/components/expense-category-chart";
import { EmiTracker } from "@/components/emi-tracker";
import { InvestmentTracker } from "@/components/investment-tracker";
import { BudgetTracker } from "@/components/budget-tracker";
import { ProfileSection } from "@/components/profile-section";

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

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/diana@example.com", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    
    <div className="flex min-h-screen bg-background">

      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-card shadow-lg transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b px-6">
          <IndianRupee className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-semibold">Prosperify</span>
        </div>
        <nav className="space-y-1 px-2 py-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              <HomeIcon className="mr-3 h-5 w-5" />
              Home
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setActiveTab("expenses")}
          >
            <BarChart className="mr-3 h-5 w-5" />
            Transactions
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setActiveTab("emis")}
          >
            <CreditCard className="mr-3 h-5 w-5" />
            EMIs
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setActiveTab("budget")}
          >
            <PieChart className="mr-3 h-5 w-5" />
            Budget
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setActiveTab("investments")}
          >
            <TrendingUp className="mr-3 h-5 w-5" />
            Investments
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setActiveTab("profile")}
          >
            <User className="mr-3 h-5 w-5" />
            Profile
          </Button>

          {/* Add a spacer and logout button */}
          <div className="mt-auto pt-6">
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={() => {
                // Add your logout logic here
                console.log("Logging out...");
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log Out
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Financial Dashboard</h1>
            <div className="text-sm text-muted-foreground">
              {format(new Date(), "MMMM yyyy")}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="emis">EMIs</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Financial Health Score */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Financial Health Score</CardTitle>
                  <CardDescription>
                    Based on your income, expenses, savings, and debt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">72/100</div>
                    <div className="text-sm text-muted-foreground">Good</div>
                  </div>
                  <Progress value={72} className="mt-2" />
                  <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs text-muted-foreground">
                    <div>Poor</div>
                    <div>Fair</div>
                    <div className="font-medium text-foreground">Good</div>
                    <div>Excellent</div>
                  </div>
                  <div className="mt-4 text-sm">
                    <p className="text-muted-foreground">Recommendations:</p>
                    <ul className="mt-1 list-inside list-disc">
                      <li>Reduce dining out expenses</li>
                      <li>Increase emergency fund savings</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Income vs Expense */}
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expense</CardTitle>
                  <CardDescription>
                    Monthly comparison for the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <IncomeVsExpenseChart />
                </CardContent>
              </Card>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {/* Total Income */}
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">Total Income (Last Month)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        ₹
        {user
          ? (() => {
              const lastMonth = Object.keys(user.monthlyIncomeVsExpenses).pop(); // Get the last month
              return lastMonth
                ? user.monthlyIncomeVsExpenses[lastMonth].income.toLocaleString()
                : 0;
            })()
          : 0}
      </div>
      <p className="text-xs text-muted-foreground">
        <span className="text-emerald-500">↑ 8%</span> from the previous month
      </p>
    </CardContent>
  </Card>

  {/* Total Expenses */}
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">Total Expenses (Last Month)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        ₹
        {user
          ? (() => {
              const lastMonth = Object.keys(user.monthlyIncomeVsExpenses).pop(); // Get the last month
              return lastMonth
                ? user.monthlyIncomeVsExpenses[lastMonth].expences.toLocaleString()
                : 0;
            })()
          : 0}
      </div>
      <p className="text-xs text-muted-foreground">
        <span className="text-rose-500">↑ 12%</span> from the previous month
      </p>
    </CardContent>
  </Card>

  {/* Savings */}
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">Savings (Last Month)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        ₹
        {user
          ? (() => {
              const lastMonth = Object.keys(user.monthlyIncomeVsExpenses).pop(); // Get the last month
              return lastMonth
                ? (
                    user.monthlyIncomeVsExpenses[lastMonth].income -
                    user.monthlyIncomeVsExpenses[lastMonth].expences
                  ).toLocaleString()
                : 0;
            })()
          : 0}
      </div>
      <p className="text-xs text-muted-foreground">
        <span className="text-emerald-500">↑ 3%</span> from the previous month
      </p>
    </CardContent>
  </Card>

  {/* EMI Burden */}
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">EMI Burden</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {user
          ? (() => {
              const lastMonth = Object.keys(user.monthlyIncomeVsExpenses).pop(); // Get the last month
              if (!lastMonth) return 0;
              const totalIncome = user.monthlyIncomeVsExpenses[lastMonth].income;
              const totalEmi = Object.values(user.emis).reduce(
                (sum, { price }) => sum + price,
                0
              );
              return ((totalEmi / totalIncome) * 100).toFixed(2); // EMI burden as a percentage
            })()
          : 0}
        %
      </div>
      <p className="text-xs text-muted-foreground">of monthly income</p>
    </CardContent>
  </Card>
</div>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              {/* Expense Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Expense Trend</CardTitle>
                  <CardDescription>
                    Daily expenses for the current month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseChart />
                </CardContent>
              </Card>

              {/* Expense Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Expense Categories</CardTitle>
                  <CardDescription>
                    Breakdown of your monthly expenses
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center md:flex-row md:justify-between">
                  <div className="w-full max-w-xs">
                    <ExpenseCategoryChart />
                  </div>
                  <div className="mt-4 w-full md:mt-0 md:max-w-sm">
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span className="ml-2">Housing</span>
                        </div>
                        <span>₹15,000 (35%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="ml-2">Groceries</span>
                        </div>
                        <span>₹8,500 (20%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <span className="ml-2">Transportation</span>
                        </div>
                        <span>₹5,500 (13%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          <span className="ml-2">Utilities</span>
                        </div>
                        <span>₹4,200 (10%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <span className="ml-2">Dining Out</span>
                        </div>
                        <span>₹3,800 (9%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                          <span className="ml-2">Entertainment</span>
                        </div>
                        <span>₹2,500 (6%)</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-teal-500"></div>
                          <span className="ml-2">Others</span>
                        </div>
                        <span>₹2,850 (7%)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emis" className="space-y-4">
              <EmiTracker />
            </TabsContent>
            <TabsContent value="investments" className="space-y-4">
              <InvestmentTracker />
            </TabsContent>
            <TabsContent value="budget" className="space-y-4">
              <BudgetTracker />
            </TabsContent>
            <TabsContent value="profile" className="space-y-4">
              <ProfileSection />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
    
  );
}
