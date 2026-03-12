import { BillExpense, Balance, Settlement, Person } from '../types/billSplit';

export const calculateGroupBalances = (
  expenses: BillExpense[],
  members: Person[]
): Balance[] => {
  const memberBalances: { [key: string]: number } = {};
  
  // Initialize balances
  members.forEach(member => {
    memberBalances[member.id] = 0;
  });

  // Calculate what each person paid and owes
  expenses.forEach(expense => {
    // Add what the payer paid
    memberBalances[expense.paidBy.id] += expense.amount;
    
    // Subtract what each person owes
    expense.splitPersons.forEach(splitPerson => {
      if (splitPerson.isSelected) {
        memberBalances[splitPerson.id] -= splitPerson.amount;
      }
    });
  });

  // Convert to Balance objects
  return members.map(member => ({
    person: member,
    balance: memberBalances[member.id],
    currency: expenses[0]?.currency || 'INR',
  }));
};

export const calculateSettlements = (balances: Balance[]): Settlement[] => {
  const settlements: Settlement[] = [];
  const debtors = balances.filter(b => b.balance < -0.01).sort((a, b) => a.balance - b.balance);
  const creditors = balances.filter(b => b.balance > 0.01).sort((a, b) => b.balance - a.balance);

  // Create working copies
  const workingDebtors = debtors.map(d => ({ ...d }));
  const workingCreditors = creditors.map(c => ({ ...c }));

  let i = 0, j = 0;
  while (i < workingDebtors.length && j < workingCreditors.length) {
    const debt = Math.abs(workingDebtors[i].balance);
    const credit = workingCreditors[j].balance;
    const amount = Math.min(debt, credit);

    if (amount > 0.01) { // Avoid tiny amounts
      settlements.push({
        from: workingDebtors[i].person,
        to: workingCreditors[j].person,
        amount: Math.round(amount * 100) / 100, // Round to 2 decimal places
        currency: workingDebtors[i].currency,
      });
    }

    workingDebtors[i].balance += amount;
    workingCreditors[j].balance -= amount;

    if (Math.abs(workingDebtors[i].balance) < 0.01) i++;
    if (Math.abs(workingCreditors[j].balance) < 0.01) j++;
  }

  return settlements;
};

export const validateSplitAmounts = (
  totalAmount: number,
  splitPersons: { amount: number; percentage: number; isSelected: boolean }[],
  splitType: 'equal' | 'percentage' | 'amount'
): { isValid: boolean; error?: string } => {
  const selectedPersons = splitPersons.filter(p => p.isSelected);
  
  if (selectedPersons.length === 0) {
    return { isValid: false, error: 'At least one person must be selected' };
  }

  if (splitType === 'percentage') {
    const totalPercentage = selectedPersons.reduce((sum, p) => sum + p.percentage, 0);
    if (Math.abs(totalPercentage - 100) > 0.01) {
      return { isValid: false, error: 'Percentages must total 100%' };
    }
  } else if (splitType === 'amount') {
    const totalSplit = selectedPersons.reduce((sum, p) => sum + p.amount, 0);
    if (Math.abs(totalSplit - totalAmount) > 0.01) {
      return { isValid: false, error: 'Split amounts must equal total amount' };
    }
  }

  return { isValid: true };
};

export const calculateEqualSplit = (
  totalAmount: number,
  selectedPersonsCount: number
): number => {
  if (selectedPersonsCount === 0) return 0;
  return Math.round((totalAmount / selectedPersonsCount) * 100) / 100;
};

export const calculatePercentageSplit = (
  totalAmount: number,
  percentage: number
): number => {
  return Math.round((totalAmount * percentage / 100) * 100) / 100;
};

export const normalizePercentages = (
  percentages: number[]
): number[] => {
  const total = percentages.reduce((sum, p) => sum + p, 0);
  if (total === 0) return percentages;
  
  const factor = 100 / total;
  return percentages.map(p => Math.round(p * factor * 100) / 100);
};

export const formatCurrency = (
  amount: number,
  currency: string = 'INR'
): string => {
  const currencySymbols: { [key: string]: string } = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    CHF: 'CHF',
    CNY: '¥',
    BRL: 'R$',
  };

  const symbol = currencySymbols[currency] || '₹';
  return `${symbol}${Math.abs(amount).toFixed(2)}`;
};

export const getPersonInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

export const generatePersonColor = (index: number): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#AED6F1', '#F1948A', '#D7BDE2'
  ];
  return colors[index % colors.length];
};

export const calculatePersonShare = (
  expense: BillExpense,
  personId: string
): number => {
  const splitPerson = expense.splitPersons.find(sp => sp.id === personId);
  return splitPerson?.isSelected ? splitPerson.amount : 0;
};

export const getExpensesByPerson = (
  expenses: BillExpense[],
  personId: string
): BillExpense[] => {
  return expenses.filter(expense => 
    expense.paidBy.id === personId || 
    expense.splitPersons.some(sp => sp.id === personId && sp.isSelected)
  );
};

export const calculateTotalPaid = (
  expenses: BillExpense[],
  personId: string
): number => {
  return expenses
    .filter(expense => expense.paidBy.id === personId)
    .reduce((sum, expense) => sum + expense.amount, 0);
};

export const calculateTotalOwed = (
  expenses: BillExpense[],
  personId: string
): number => {
  return expenses.reduce((sum, expense) => {
    const splitPerson = expense.splitPersons.find(sp => sp.id === personId);
    return sum + (splitPerson?.isSelected ? splitPerson.amount : 0);
  }, 0);
};