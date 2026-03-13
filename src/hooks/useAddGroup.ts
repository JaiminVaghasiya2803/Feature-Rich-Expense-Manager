import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { ExpenseGroup } from '../types/expense';

export const useAddGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (group: Omit<ExpenseGroup, 'id'> & { id: number | string }) => {
      try {
        const response = await apiClient.post<ExpenseGroup>('/groups', group);
        return response.data;
      } catch (error) {
        console.error('❌ API Error in useAddGroup:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: error => {
      console.error('❌ Mutation failed:', error);
    },
  });
};
