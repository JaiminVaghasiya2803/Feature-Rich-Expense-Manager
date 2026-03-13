import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { enqueueMutation } from '../queue/mutationQueue';
import { QueueActionType } from '../constants/queueTypes';
import { updateExpense } from '../api/expense.api';
import { QUERY_KEYS } from '../constants/queryKeys';
import { Expense } from '../types/expense';

export const useEditExpense = () => {
  const queryClient = useQueryClient();
  const isOnline = useSelector((state: RootState) => state.network.isOnline);

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<Expense>;
    }) => {
      if (!isOnline) {
        await enqueueMutation({
          type: QueueActionType.UPDATE_EXPENSE,
          payload: { id, ...updates },
        });
        return { id, ...updates } as Expense;
      }
      return updateExpense(id, updates);
    },

    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.EXPENSES });

      const previousData = queryClient.getQueryData<any>(QUERY_KEYS.EXPENSES);

      queryClient.setQueryData(QUERY_KEYS.EXPENSES, (old: unknown) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: unknown) => ({
            ...page,
            data: page.data.map((expense: Expense) =>
              expense.id === id ? { ...expense, ...updates } : expense,
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _variables, _context) => {
      queryClient.setQueryData(QUERY_KEYS.EXPENSES, context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXPENSES });
    },
  });
};
