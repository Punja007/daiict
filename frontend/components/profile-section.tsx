"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  Bell,
  Moon,
  Bot,
  Camera,
  Edit,
  Target,
  CreditCard,
  Building, // Replace Bank with Building
  Shield,
  Globe,
  Languages,
  Download,
  Trash2,
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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// Dummy user data
const userData = {
  name: "Raj Patel",
  email: "raj.patel@example.com",
  avatar: "/avatars/default.png",
  monthlyIncome: 58500,
  totalSavings: 245000,
  memberSince: new Date("2023-01-15"),
  dob: new Date("1995-06-20"),
  phone: "+91 98765 43210",
  address: "123 Green Park, Ahmedabad, Gujarat",
  profession: "Software Engineer",
};

// Add new dummy data
const financialGoals = [
  {
    title: "Emergency Fund",
    target: 100000,
    current: 65000,
    deadline: "2024-06-30",
  },
  {
    title: "New Car",
    target: 800000,
    current: 200000,
    deadline: "2024-12-31",
  },
];

const linkedAccounts = [
  {
    name: "HDFC Bank",
    type: "Savings Account",
    lastSync: "2024-01-15",
    icon: Building, // Update icon here
  },
  {
    name: "SBI Credit Card",
    type: "Credit Card",
    lastSync: "2024-01-15",
    icon: CreditCard,
  },
];

export function ProfileSection() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [aiAssistant, setAiAssistant] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Profile Overview</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your personal information
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={userData.name} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={userData.email} type="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={userData.phone} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="income">Monthly Income</Label>
                    <Input
                      id="income"
                      defaultValue={userData.monthlyIncome}
                      type="number"
                    />
                  </div>
                </div>
                <Button className="w-full">Save Changes</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback>{userData.name[0]}</AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Monthly Income</p>
              <p className="text-2xl font-bold">₹{userData.monthlyIncome}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Savings</p>
              <p className="text-2xl font-bold">₹{userData.totalSavings}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Member since {format(userData.memberSince, "MMMM yyyy")}
          </p>
        </CardContent>
      </Card>

      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium">
                {format(userData.dob, "dd MMMM yyyy")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="font-medium">{userData.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{userData.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Profession</p>
              <p className="font-medium">{userData.profession}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts and reminders
                </p>
              </div>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle dark/light theme
                </p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Bot className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">AI Assistant</p>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered insights
                </p>
              </div>
            </div>
            <Switch
              checked={aiAssistant}
              onCheckedChange={setAiAssistant}
            />
          </div>
        </CardContent>
      </Card>

      {/* Financial Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Financial Goals</CardTitle>
              <CardDescription>Track your savings targets</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Target className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {financialGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={goal.title} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{goal.title}</h4>
                  <span className="text-sm text-muted-foreground">
                    Due {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>₹{goal.current.toLocaleString()}</span>
                  <span className="text-muted-foreground">
                    of ₹{goal.target.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Linked Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Linked Accounts</CardTitle>
          <CardDescription>Manage your connected accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {linkedAccounts.map((account) => {
            const Icon = account.icon;
            return (
              <div
                key={account.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-4">
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {account.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            );
          })}
          <Button className="w-full">
            <Building className="mr-2 h-4 w-4" /> {/* Update icon here */}
            Link New Account
          </Button>
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred language
                </p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-md border px-2 py-1"
            >
              <option>English</option>
              <option>हिंदी</option>
              <option>ગુજરાતી</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}