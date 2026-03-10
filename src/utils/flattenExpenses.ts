import { Expense } from '../types/expense';

export const flattenExpenses = (pages: any[]): Expense[] => {
  return pages.flatMap(page => page.data);
};
