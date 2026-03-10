import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchExpenses } from '../api/expense.api';
import { QUERY_KEYS } from '../constants/queryKeys';
import { PAGINATION_LIMIT } from '../constants/pagination';

export const useExpenses = () => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.EXPENSES,

    queryFn: ({ pageParam = 1 }) => fetchExpenses(pageParam, PAGINATION_LIMIT),

    getNextPageParam: lastPage => {
      const { page, limit, total } = lastPage;
      const totalLoaded = page * limit;
      return totalLoaded < total ? page + 1 : undefined;
    },

    initialPageParam: 1,
  });
};
