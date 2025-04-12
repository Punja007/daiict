export interface FormData {
  // User Data
  fullName: string;
  email: string;
  password: string;

  // Financial Overview
  monthlyIncome: number;
  fixedExpenses: number;
  currentSavings: number;

  // Transaction
  amount: number;
  date: string;
  category: string;
  type: 'Income' | 'Expense';
  paymentMethod: string;
  note?: string;

  // EMI Details
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

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}