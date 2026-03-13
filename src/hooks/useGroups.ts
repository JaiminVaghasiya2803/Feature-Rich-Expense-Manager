import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { ExpenseGroup } from '../types/expense';

export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      try {
        const response = await apiClient.get<ExpenseGroup[]>('/groups');

        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          if (__DEV__) {
            console.warn('⚠️ Unexpected response format:', response.data);
          }
          return [];
        }
      } catch (error) {
        if (__DEV__) {
          console.error('❌ Error fetching groups:', error);
          if (error && typeof error === 'object' && 'response' in error) {
            console.error('❌ Response error:', error.response);
          }
          if (error && typeof error === 'object' && 'code' in error) {
            console.error('❌ Error code:', error.code);
          }
        }
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
};
