"use client";
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import IncomeExpense from './steps/income-expense';
import TransactionEntry from './steps/transaction-entry';
import EMIDetails from './steps/emi-details';
import InvestmentEntry from './steps/investment-entry';
import BudgetPlanning from './steps/budget-planning';

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const steps = [
    IncomeExpense,
    TransactionEntry,
    EMIDetails,
    InvestmentEntry,
    BudgetPlanning
  ];

  const CurrentStepComponent = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      toast({
        title: "Success",
        description: "Step completed successfully!"
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 w-16 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <CurrentStepComponent
        onNext={handleNext}
        onBack={handleBack}
        isFirstStep={currentStep === 0}
        isLastStep={currentStep === steps.length - 1}
      />
    </div>
  );
};

export default FormWizard;