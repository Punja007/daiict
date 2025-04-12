"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/dashboard";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
