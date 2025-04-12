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

const InvestmentEntry = ({ onNext, onBack }: StepProps) => {
  const { formData, updateFormData } = useFormContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hasInvestments) {
      onNext();
      return;
    }

    try {
      await axios.post('/api/investment-entry', {
        investmentType: formData.investmentType,
        amountInvested: formData.amountInvested,
        investmentDate: formData.investmentDate,
        platform: formData.platform,
        expectedROI: formData.expectedROI,
        maturityDate: formData.maturityDate
      });
      toast({
        title: "Success",
        description: "Investment details saved successfully!"
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
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.hasInvestments}
            onChange={(e) => updateFormData({ hasInvestments: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">I have investments</span>
        </label>
      </div>

      {formData.hasInvestments && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Investment Type</label>
              <select
                value={formData.investmentType}
                onChange={(e) => updateFormData({ investmentType: e.target.value })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Stocks">Stocks</option>
                <option value="FD">Fixed Deposit</option>
                <option value="Crypto">Cryptocurrency</option>
                <option value="MutualFunds">Mutual Funds</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Amount Invested</label>
              <input
                type="number"
                value={formData.amountInvested || ''}
                onChange={(e) => updateFormData({ amountInvested: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Investment Date</label>
              <input
                type="date"
                value={formData.investmentDate || ''}
                onChange={(e) => updateFormData({ investmentDate: e.target.value })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Platform</label>
              <input
                type="text"
                value={formData.platform || ''}
                onChange={(e) => updateFormData({ platform: e.target.value })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Expected ROI (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.expectedROI || ''}
                onChange={(e) => updateFormData({ expectedROI: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Maturity Date (Optional)</label>
              <input
                type="date"
                value={formData.maturityDate || ''}
                onChange={(e) => updateFormData({ maturityDate: e.target.value })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </>
      )}

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

export default InvestmentEntry;