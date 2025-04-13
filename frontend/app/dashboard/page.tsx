"use client";
import Dashboard from "@/components/dashboard";
import GoogleTranslate from "@/components/GoogleTranslate";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>
      <GoogleTranslate />
      <Dashboard />
    </div>
  );
}
