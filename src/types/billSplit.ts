export interface Person {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  color?: string;
}

export interface SplitPerson extends Person {
  amount: number;
  percentage: number;
  isSelected: boolean;
}

export interface BillExpense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  paidBy: Person;
  splitType: 'equal' | 'percentage' | 'amount';
  splitPersons: SplitPerson[];
  date: Date;
  category?: string;
  receipt?: string;
  groupId?: string;
}

export interface BillGroup {
  id: string;
  name: string;
  description?: string;
  members: Person[];
  expenses: BillExpense[];
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  color?: string;
}

export interface Settlement {
  from: Person;
  to: Person;
  amount: number;
  currency: string;
}

export interface Balance {
  person: Person;
  balance: number; // positive = owes money, negative = is owed money
  currency: string;
}

export type SplitType = 'equal' | 'percentage' | 'amount';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
];