import { Expense } from '../types/expense';

export const flattenExpenses = (pages: unknown[]): Expense[] => {
  return pages.flatMap(page => page.data);
};
