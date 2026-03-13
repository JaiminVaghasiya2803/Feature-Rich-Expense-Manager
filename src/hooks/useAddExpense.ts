import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { enqueueMutation } from '../queue/mutationQueue';
import { QueueActionType } from '../constants/queueTypes';

import { addExpense } from '../api/expense.api';
import { QUERY_KEYS } from '../constants/queryKeys';
import { Expense } from '../types/expense';

export const useAddExpense = () => {
  const queryClient = useQueryClient();
  const isOnline = useSelector((state: RootState) => state.network.isOnline);

  return useMutation({
    mutationFn: async (newExpense: Omit<Expense, 'id'> & { id: number }) => {
      if (!isOnline) {
        await enqueueMutation({
          type: QueueActionType.ADD_EXPENSE,
          payload: newExpense,
        });
        return newExpense;
      }
      return addExpense(newExpense);
    },

    onMutate: async newExpenseWithTempId => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.EXPENSES });

      const previousData = queryClient.getQueryData<any>(QUERY_KEYS.EXPENSES);

      const tempExpense: Expense = {
        ...newExpenseWithTempId,
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(QUERY_KEYS.EXPENSES, (old: unknown) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: unknown, index: number) =>
            index === 0
              ? {
                  ...page,
                  data: [tempExpense, ...page.data],
                  total: (page.total || 0) + 1,
                }
              : page,
          ),
        };
      });

      return { previousData, tempId: tempExpense.id };
    },

    onError: (_err, _newExpense, _context) => {
      queryClient.setQueryData(QUERY_KEYS.EXPENSES, context?.previousData);
    },

    onSuccess: (serverExpense, _variables, context: unknown) => {
      queryClient.setQueryData(QUERY_KEYS.EXPENSES, (old: unknown) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: unknown) => ({
            ...page,
            data: page.data.map((exp: Expense) =>
              exp.id === context.tempId ? serverExpense : exp,
            ),
          })),
        };
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXPENSES });
    },
  });
};
