import { Expense } from '../types/expense';

export const calculateTotal = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
};
