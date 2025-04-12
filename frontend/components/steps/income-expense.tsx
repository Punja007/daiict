"use client";
import { useFormContext } from '@/context/FormContext';
import { useToast } from "@/components/ui/use-toast";

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const IncomeExpense = ({ onNext }: StepProps) => {
  const { formData, updateFormData } = useFormContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.totalIncome || !formData.totalExpenses) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">
          Total Monthly Income
        </label>
        <input
          type="number"
          value={formData.totalIncome || ''}
          onChange={(e) => updateFormData({ totalIncome: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
          placeholder="Enter your total monthly income"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Total Monthly Expenses
        </label>
        <input
          type="number"
          value={formData.totalExpenses || ''}
          onChange={(e) => updateFormData({ totalExpenses: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="0"
          placeholder="Enter your total monthly expenses"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
      >
        Next
      </button>
    </form>
  );
};

export default IncomeExpense; 