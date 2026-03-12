import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { ExpenseGroup } from '../types/expense';

export const useEditGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: number | string; updates: Partial<ExpenseGroup> }) => {
      console.log('🔧 useEditGroup - Updating group:', id, updates);
      
      try {
        const response = await apiClient.patch<ExpenseGroup>(`/groups/${id}`, updates);
        console.log('✅ useEditGroup - Group updated successfully:', response.data);
        return response.data;
      } catch (error) {
        console.error('❌ useEditGroup - Error updating group:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('✅ useEditGroup - Invalidating groups query');
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (error) => {
      console.error('❌ useEditGroup - Mutation failed:', error);
    },
  });
};