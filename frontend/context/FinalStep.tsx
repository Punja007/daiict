"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/FormContext";

export default function FinalStep() {
  const router = useRouter();
  const { resetForm } = useFormContext();

  const handleComplete = () => {
    // Optional: Clear form data
    resetForm();

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-2xl font-bold">You're all set! 🎉</h2>
      <p className="text-muted-foreground">Your financial details are saved successfully.</p>
      <Button onClick={handleComplete} className="mt-6">
        Go to Dashboard
      </Button>
    </div>
    </>
  );
}
