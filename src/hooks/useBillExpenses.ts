import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { BillExpense } from '../types/billSplit';

// Hook to get all bill expenses for a group
export const useBillExpenses = (groupId: string | number) => {
  const groupIdString = groupId.toString();

  return useQuery({
    queryKey: ['billExpenses', groupIdString],
    queryFn: async () => {
      try {
        const response = await apiClient.get<BillExpense[]>(
          `/billExpenses?groupId=${groupIdString}`
        );

        // Log each expense for debugging
        response.data.forEach((expense, index) => {
          if (__DEV__) {
            console.log(`📊 Expense ${index + 1}:`, {
              id: expense.id,
              title: expense.title,
              amount: expense.amount,
              groupId: expense.groupId,
              groupIdType: typeof expense.groupId,
            });
          }
        });

        // Convert date strings back to Date objects
        const expenses = response.data.map(expense => ({
          ...expense,
          date: new Date(expense.date),
        }));

        return expenses;
      } catch (error) {
        if (__DEV__) {
          console.error('❌ Error fetching bill expenses:', error);
        }
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
};

// Hook to add a new bill expense
export const useAddBillExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: Omit<BillExpense, 'id'>) => {
      try {
        const expenseData = {
          ...expense,
          id: Date.now().toString(),
          date: expense.date.toISOString(),
        };

        const response = await apiClient.post<BillExpense>('/billExpenses', expenseData);

        // Convert date string back to Date object
        return {
          ...response.data,
          date: new Date(response.data.date),
        };
      } catch (error) {
        if (__DEV__) {
          console.error('❌ API Error in useAddBillExpense:', error);
        }
        throw error;
      }
    },
    onSuccess: data => {
      // Invalidate and refetch bill expenses for the group
      queryClient.invalidateQueries({ queryKey: ['billExpenses', data.groupId] });
      // Also invalidate group balances if we have that query
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: error => {
      if (__DEV__) {
        console.error('❌ Bill expense creation failed:', error);
      }
    },
  });
};

// Hook to update a bill expense
export const useUpdateBillExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: BillExpense) => {
      try {
        const expenseData = {
          ...expense,
          date: expense.date.toISOString(),
        };

        const response = await apiClient.put<BillExpense>(
          `/billExpenses/${expense.id}`,
          expenseData
        );

        return {
          ...response.data,
          date: new Date(response.data.date),
        };
      } catch (error) {
        console.error('❌ Error updating bill expense:', error);
        throw error;
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['billExpenses', data.groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: error => {
      if (__DEV__) {
        console.error('❌ Bill expense update failed:', error);
      }
    },
  });
};

// Hook to delete a bill expense
export const useDeleteBillExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ expenseId, groupId }: { expenseId: string; groupId: string }) => {
      try {
        await apiClient.delete(`/billExpenses/${expenseId}`);
        return { expenseId, groupId };
      } catch (error) {
        if (__DEV__) {
          console.error('❌ Error deleting bill expense:', error);
        }
        throw error;
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['billExpenses', data.groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: error => {
      if (__DEV__) {
        console.error('❌ Bill expense deletion failed:', error);
      }
    },
  });
};

// Hook to get group balances (calculated from expenses)
export const useGroupBalances = (groupId: string | number, members: any[]) => {
  const groupIdString = groupId.toString();
  const { data: expenses = [] } = useBillExpenses(groupIdString);

  return useQuery({
    queryKey: ['groupBalances', groupIdString, expenses.length],
    queryFn: async () => {
      const memberBalances: { [key: string]: number } = {};

      // Initialize balances
      members.forEach(member => {
        memberBalances[member.id] = 0;
      });

      // Calculate what each person paid and owes
      expenses.forEach(expense => {
        // Add what the payer paid
        memberBalances[expense.paidBy.id] += expense.amount;

        // Subtract what each person owes
        expense.splitPersons.forEach(splitPerson => {
          if (splitPerson.isSelected) {
            memberBalances[splitPerson.id] -= splitPerson.amount;
          }
        });
      });

      // Convert to Balance objects
      const balances = members.map(member => ({
        person: member,
        balance: Math.round(memberBalances[member.id] * 100) / 100, // Round to 2 decimal places
        currency: expenses[0]?.currency || 'INR',
      }));

      return balances;
    },
    enabled: expenses.length >= 0 && members.length > 0,
  });
};