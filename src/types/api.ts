import { Expense } from './expense';

export type PaginatedExpensesResponse = {
  data: Expense[];
  page: number;
  limit: number;
  total: number;
};
