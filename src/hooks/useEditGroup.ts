import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { apiClient } from '../api/client';
import { ExpenseGroup } from '../types/expense';
import { RootState } from '../store';
import { enqueueMutation } from '../queue/mutationQueue';

export const useEditGroup = () => {
  const queryClient = useQueryClient();
  const isOnline = useSelector((state: RootState) => state.network.isOnline);

  return useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<ExpenseGroup> }) => {
      if (!isOnline) {
        await enqueueMutation({
          type: 'UPDATE_GROUP',
          payload: { id, updates },
        });
        return { id, ...updates };
      }

      const response = await apiClient.patch<ExpenseGroup>(`/groups/${id}`, updates);
      return response.data;
    },
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['groups'] });

      const previousGroups = queryClient.getQueryData(['groups']);

      queryClient.setQueryData(['groups'], (old: any) => {
        if (!old) return old;

        const newPages = old.pages.map((page: ExpenseGroup[]) =>
          page.map((group: ExpenseGroup) =>
            group.id === id ? { ...group, ...updates } : group
          )
        );

        return {
          ...old,
          pages: newPages,
        };
      });

      return { previousGroups };
    },
    onError: (err, variables, context) => {
      if (context?.previousGroups) {
        queryClient.setQueryData(['groups'], context.previousGroups);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};