"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  totalIncome?: number;
  totalExpenses?: number;
  // Auth
  fullName: string;
  email: string;
  password: string;
  // Financial
  monthlyIncome: number;
  fixedExpenses: number;
  currentSavings: number;
  // Transaction
  amount: number;
  date: string;
  category: string;
  type: 'Income' | 'Expense';
  paymentMethod: string;
  note: string;
  // EMI
  hasEMIs: boolean;
  emiAmount?: number;
  emiStartDate?: string;
  emiEndDate?: string;
  frequency?: 'Monthly' | 'Quarterly';
  linkedTo?: string;
  // Investment
  hasInvestments: boolean;
  investmentType?: string;
  amountInvested?: number;
  investmentDate?: string;
  platform?: string;
  expectedROI?: number;
  maturityDate?: string;
  // Budget
  monthlyBudgetLimit: number;
  budgetStartDate: string;
  budgetEndDate: string;
  categoryAllocations: Array<{
    category: string;
    amount: number;
  }>;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

const initialFormData: FormData = {
  totalIncome: undefined,
  totalExpenses: undefined,
  fullName: '',
  email: '',
  password: '',
  monthlyIncome: 0,
  fixedExpenses: 0,
  currentSavings: undefined,
  amount: 0,
  date: '',
  category: '',
  type: 'Expense',
  paymentMethod: '',
  note: '',
  hasEMIs: false,
  hasInvestments: false,
  monthlyBudgetLimit: undefined,
  budgetStartDate: '',
  budgetEndDate: '',
  expectedROI: undefined,
  maturityDate: '',
  categoryAllocations: []
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};