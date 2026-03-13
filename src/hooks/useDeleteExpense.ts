import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { enqueueMutation } from '../queue/mutationQueue';
import { QueueActionType } from '../constants/queueTypes';

import { deleteExpense } from '../api/expense.api';
import { QUERY_KEYS } from '../constants/queryKeys';
import { Expense } from '../types/expense';

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const isOnline = useSelector((state: RootState) => state.network.isOnline);

  return useMutation({
    mutationFn: async (id: number) => {
      if (!isOnline) {
        await enqueueMutation({
          type: QueueActionType.DELETE_EXPENSE,
          payload: { id },
        });
        return id;
      }
      return deleteExpense(id);
    },

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.EXPENSES });

      const previousData = queryClient.getQueryData<any>(QUERY_KEYS.EXPENSES);

      queryClient.setQueryData(QUERY_KEYS.EXPENSES, (old: unknown) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: unknown) => ({
            ...page,
            data: page.data.filter((expense: Expense) => expense.id !== id),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _id, _context) => {
      queryClient.setQueryData(QUERY_KEYS.EXPENSES, context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EXPENSES });
    },
  });
};
