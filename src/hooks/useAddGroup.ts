import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { apiClient } from '../api/client';
import { ExpenseGroup } from '../types/expense';
import { RootState } from '../store';
import { enqueueMutation } from '../queue/mutationQueue';

export const useAddGroup = () => {
  const queryClient = useQueryClient();
  const isOnline = useSelector((state: RootState) => state.network.isOnline);

  return useMutation({
    mutationFn: async (group: Omit<ExpenseGroup, 'id'> & { id: number }) => {
      if (!isOnline) {
        await enqueueMutation({
          type: 'CREATE_GROUP',
          payload: group,
        });
        return group;
      }

      const response = await apiClient.post<ExpenseGroup>('/groups', group);
      return response.data;
    },
    onMutate: async (newGroup) => {
      await queryClient.cancelQueries({ queryKey: ['groups'] });

      const previousGroups = queryClient.getQueryData(['groups']);

      queryClient.setQueryData(['groups'], (old: any) => {
        if (!old) return { pages: [[newGroup]], pageParams: [1] };
        
        const newPages = [...old.pages];
        newPages[0] = [newGroup, ...newPages[0]];
        
        return {
          ...old,
          pages: newPages,
        };
      });

      return { previousGroups };
    },
    onError: (err, newGroup, context) => {
      if (context?.previousGroups) {
        queryClient.setQueryData(['groups'], context.previousGroups);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
};