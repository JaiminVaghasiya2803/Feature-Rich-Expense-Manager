import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { ExpenseGroup } from '../types/expense';

export const useEditGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number | string;
      updates: Partial<ExpenseGroup>;
    }) => {
      try {
        const response = await apiClient.patch<ExpenseGroup>(`/groups/${id}`, updates);
        return response.data;
      } catch (error) {
        if (__DEV__) {
          console.error('❌ useEditGroup - Error updating group:', error);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: error => {
      if (__DEV__) {
        console.error('❌ useEditGroup - Mutation failed:', error);
      }
    },
  });
};
