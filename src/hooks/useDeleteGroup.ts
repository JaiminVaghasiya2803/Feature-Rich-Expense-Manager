import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { apiClient } from '../api/client';
import { RootState } from '../store';
import { enqueueMutation } from '../queue/mutationQueue';

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const isOnline = useSelector((state: RootState) => state.network.isOnline);

  return useMutation({
    mutationFn: async (id: number) => {
      if (!isOnline) {
        await enqueueMutation({
          type: 'DELETE_GROUP',
          payload: { id },
        });
        return;
      }

      await apiClient.delete(`/groups/${id}`);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['groups'] });

      const previousGroups = queryClient.getQueryData(['groups']);

      queryClient.setQueryData(['groups'], (old: unknown) => {
        if (!old) return old;

        const newPages = old.pages.map((page: unknown[]) =>
          page.filter((group: unknown) => group.id !== id)
        );

        return {
          ...old,
          pages: newPages,
        };
      });

      return { previousGroups };
    },
    onError: (_err, _id, _context) => {
      if (context?.previousGroups) {
        queryClient.setQueryData(['groups'], context.previousGroups);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
};
