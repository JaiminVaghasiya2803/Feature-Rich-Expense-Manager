import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { ExpenseGroup } from '../types/expense';

export const useGroups = () => {
  return useInfiniteQuery({
    queryKey: ['groups'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<ExpenseGroup[]>('/groups', {
        params: {
          _page: pageParam,
          _limit: 20,
          _sort: 'updatedAt',
          _order: 'desc',
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === 20 ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
};