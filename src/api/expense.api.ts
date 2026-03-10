import { apiClient } from './client';
import { Expense } from '../types/expense';

type PaginatedExpenses = {
  data: Expense[];
  page: number;
  limit: number;
  total: number;
};

export const fetchExpenses = async (
  page: number,
  limit: number,
): Promise<PaginatedExpenses> => {
  const response = await apiClient.get(`/expenses`, {
    params: { _page: page, _per_page: limit },
  });

  const { data, items } = response.data;

  return {
    data: data || response.data,
    page,
    limit,
    total: items || (Array.isArray(response.data) ? response.data.length : 0),
  };
};

export const addExpense = async (
  expense: Omit<Expense, 'id'> & { id?: number },
): Promise<Expense> => {
  const response = await apiClient.post(`/expenses`, expense);

  return response.data;
};

export const updateExpense = async (
  id: number,
  updates: Partial<Expense>,
): Promise<Expense> => {
  const response = await apiClient.patch(`/expenses/${id}`, updates);

  return response.data;
};

export const deleteExpense = async (id: number): Promise<void> => {
  await apiClient.delete(`/expenses/${id}`);
};
