"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Settings,
  ShoppingCart,
  Home,
  Car,
  Coffee,
  Utensils,
  Wifi,
  Film,
  Plus,
} from "lucide-react";

// Dummy data
const budgetSummary = {
  monthlyLimit: 50000,
  totalSpent: 42350,
  remaining: 7650,
  percentageUsed: 84.7,
};

const categoryBudgets = [
  {
    name: "Housing",
    icon: Home,
    budget: 15000,
    spent: 15000,
    remaining: 0,
    color: "bg-blue-500",
  },
  {
    name: "Groceries",
    icon: ShoppingCart,
    budget: 10000,
    spent: 8500,
    remaining: 1500,
    color: "bg-green-500",
  },
  {
    name: "Transport",
    icon: Car,
    budget: 6000,
    spent: 5500,
    remaining: 500,
    color: "bg-yellow-500",
  },
  {
    name: "Dining",
    icon: Utensils,
    budget: 5000,
    spent: 3800,
    remaining: 1200,
    color: "bg-red-500",
  },
  {
    name: "Utilities",
    icon: Wifi,
    budget: 5000,
    spent: 4200,
    remaining: 800,
    color: "bg-purple-500",
  },
  {
    name: "Entertainment",
    icon: Film,
    budget: 3000,
    spent: 2500,
    remaining: 500,
    color: "bg-orange-500",
  },
];

export function BudgetTracker() {
  return (
    <div className="space-y-6">
      {/* Budget Summary */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Monthly Budget Overview</CardTitle>
              <CardDescription>Budget usage for current month</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Monthly Limit
              </p>
              <p className="text-2xl font-bold">
                ₹{budgetSummary.monthlyLimit.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Spent
              </p>
              <p className="text-2xl font-bold">
                ₹{budgetSummary.totalSpent.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Remaining
              </p>
              <p className="text-2xl font-bold">
                ₹{budgetSummary.remaining.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Budget Used</span>
              <span className="font-medium">{budgetSummary.percentageUsed}%</span>
            </div>
            <Progress value={budgetSummary.percentageUsed} />
          </div>
        </CardContent>
      </Card>

      {/* Category Budgets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Category Budgets</CardTitle>
              <CardDescription>Track spending by category</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          {categoryBudgets.map((category) => {
            const Icon = category.icon;
            const percentageUsed = (category.spent / category.budget) * 100;
            const isOverBudget = percentageUsed >= 100;

            return (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {isOverBudget && (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Budget</span>
                    <p className="font-medium">
                      ₹{category.budget.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Spent</span>
                    <p className="font-medium">
                      ₹{category.spent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Remaining</span>
                    <p className="font-medium">
                      ₹{category.remaining.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Progress
                  value={percentageUsed}
                  className={`h-2 ${category.color}`}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}