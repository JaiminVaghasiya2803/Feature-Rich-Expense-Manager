export type ExpenseCategory = 'food' | 'travel' | 'shopping' | 'other';

export type Expense = {
  id: number;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  updatedAt: string;
};
