export const QUERY_KEYS = {
  EXPENSES: ['expenses'] as const,
  EXPENSE_DETAIL: (id: number) => ['expense', id] as const,
};
