"use client";
aaa
import Dashboard from "@/components/dashboard";

import { useRouter } from "next/navigation";
import { FormProvider } from "@/context/FormContext";
import FormWizard from "@/components/form-wizard";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Dashboard</h1>
      <Dashboard />
    </div>
  );
}
xffkndsvm