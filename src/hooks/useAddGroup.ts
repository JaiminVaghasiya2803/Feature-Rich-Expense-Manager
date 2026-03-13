import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { ExpenseGroup } from '../types/expense';

export const useAddGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (group: Omit<ExpenseGroup, 'id'> & { id: number | string }) => {
      console.log('📊 Group data received in hook:', group);
      console.log('🚀 Making API call to create group...');
      console.log('🔗 API URL:', `${apiClient.defaults.baseURL}/groups`);
      
      try {
        const response = await apiClient.post<ExpenseGroup>('/groups', group);
        console.log('✅ API Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('❌ API Error in useAddGroup:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('✅ Mutation successful, invalidating queries');
      console.log('💾 Created group with members:', data.members?.length || 0);
      // Simply invalidate and refetch instead of optimistic updates
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (error) => {
      console.error('❌ Mutation failed:', error);
    },
  });
};