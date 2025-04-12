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

const EMIDetails = ({ onNext, onBack }: StepProps) => {
  const { formData, updateFormData } = useFormContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hasEMIs) {
      onNext();
      return;
    }

    try {
      await axios.post('/api/emi-entry', {
        emiAmount: formData.emiAmount,
        startDate: formData.emiStartDate,
        endDate: formData.emiEndDate,
        frequency: formData.frequency,
        linkedTo: formData.linkedTo
      });
      toast({
        title: "Success",
        description: "EMI details saved successfully!"
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
            checked={formData.hasEMIs}
            onChange={(e) => updateFormData({ hasEMIs: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">I have EMIs</span>
        </label>
      </div>

      {formData.hasEMIs && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">EMI Amount</label>
              <input
                type="number"
                value={formData.emiAmount}
                onChange={(e) => updateFormData({ emiAmount: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => updateFormData({ frequency: e.target.value as 'Monthly' | 'Quarterly' })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={formData.emiStartDate}
                onChange={(e) => updateFormData({ emiStartDate: e.target.value })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="date"
                value={formData.emiEndDate}
                onChange={(e) => updateFormData({ emiEndDate: e.target.value })}
                className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Linked To</label>
            <select
              value={formData.linkedTo}
              onChange={(e) => updateFormData({ linkedTo: e.target.value })}
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Type</option>
              <option value="Loan">Loan</option>
              <option value="Subscription">Subscription</option>
              <option value="Other">Other</option>
            </select>
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

export default EMIDetails;