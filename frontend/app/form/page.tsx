"use client";
import { useEffect} from "react";
import { FormProvider } from "@/context/FormContext";
import FormWizard from "@/components/form-wizard";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/dashboard";

export default function DashboardPage() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Complete Your Financial Profile
        </h1>
        
        <FormProvider>
          <FormWizard />
        </FormProvider>
        
      </div>
    </div>
  );
}