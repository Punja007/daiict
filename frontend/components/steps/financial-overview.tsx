"use client";
import { useFormContext } from '@/context/FormContext';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const FinancialOverview = ({ onNext, onBack }: StepProps) => {
  const { formData, updateFormData } = useFormContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/financial-overview', {
        monthlyIncome: formData.monthlyIncome,
        fixedExpenses: formData.fixedExpenses,
        currentSavings: formData.currentSavings
      });
      toast({
        title: "Success",
        description: "Financial overview saved!"
      });
      onNext();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || 'An error occurred'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">
          Monthly Income
        </label>
        <input
          type="number"
          value={formData.monthlyIncome}
          onChange={(e) => updateFormData({ monthlyIncome: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Fixed Monthly Expenses
        </label>
        <input
          type="number"
          value={formData.fixedExpenses}
          onChange={(e) => updateFormData({ fixedExpenses: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Current Savings
        </label>
        <input
          type="number"
          value={formData.currentSavings}
          onChange={(e) => updateFormData({ currentSavings: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default FinancialOverview;