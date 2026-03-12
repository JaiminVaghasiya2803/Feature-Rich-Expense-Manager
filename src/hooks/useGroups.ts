import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { ExpenseGroup } from '../types/expense';

export const useGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      console.log('🔍 Fetching groups...');
      console.log('🌐 API Base URL:', apiClient.defaults.baseURL);
      
      try {
        const response = await apiClient.get<ExpenseGroup[]>('/groups');
        console.log('📊 Groups API response status:', response.status);
        console.log('📊 Groups API response data:', response.data);
        
        if (Array.isArray(response.data)) {
          console.log('✅ Successfully fetched', response.data.length, 'groups');
          return response.data;
        } else {
          console.warn('⚠️ Unexpected response format:', response.data);
          return [];
        }
      } catch (error) {
        console.error('❌ Error fetching groups:', error);
        if (error && typeof error === 'object' && 'response' in error) {
          console.error('❌ Response error:', error.response);
        }
        if (error && typeof error === 'object' && 'code' in error) {
          console.error('❌ Error code:', error.code);
        }
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
};