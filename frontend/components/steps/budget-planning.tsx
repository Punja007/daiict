"use client";
import { useFormContext } from '@/context/FormContext';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { useState } from 'react';

interface StepProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface CategoryAllocation {
  category: string;
  amount: number;
}

const BudgetPlanning = ({ onNext, onBack, isLastStep }: StepProps) => {
  const { formData, updateFormData } = useFormContext();
  const { toast } = useToast();
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleAddCategory = () => {
    if (!newCategory || !newAmount) return;

    const updatedAllocations = [
      ...(formData.categoryAllocations || []),
      { category: newCategory, amount: Number(newAmount) }
    ];

    updateFormData({ categoryAllocations: updatedAllocations });
    setNewCategory('');
    setNewAmount('');
  };

  const handleRemoveCategory = (index: number) => {
    const updatedAllocations = formData.categoryAllocations.filter((_, i) => i !== index);
    updateFormData({ categoryAllocations: updatedAllocations });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/budget-planning', {
        monthlyBudgetLimit: formData.monthlyBudgetLimit,
        budgetStartDate: formData.budgetStartDate,
        budgetEndDate: formData.budgetEndDate,
        categoryAllocations: formData.categoryAllocations
      });
      toast({
        title: "Success",
        description: "Budget plan saved successfully!"
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Monthly Budget Limit</label>
          <input
            type="number"
            value={formData.monthlyBudgetLimit || ''}
            onChange={(e) => updateFormData({ monthlyBudgetLimit: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={formData.budgetStartDate || ''}
            onChange={(e) => updateFormData({ budgetStartDate: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={formData.budgetEndDate || ''}
            onChange={(e) => updateFormData({ budgetEndDate: e.target.value })}
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Category Allocations</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category Name"
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Amount"
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="mt-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {formData.categoryAllocations?.map((allocation: CategoryAllocation, index: number) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <span>{allocation.category}</span>
              <div className="flex items-center gap-4">
                <span>₹{allocation.amount}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
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
          {isLastStep ? 'Complete' : 'Next'}
        </button>
      </div>
    </form>
  );
};

export default BudgetPlanning;