import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { BillExpense } from '../types/billSplit';

// Hook to get all bill expenses for a group
export const useBillExpenses = (groupId: string | number) => {
  const groupIdString = groupId.toString();
  
  return useQuery({
    queryKey: ['billExpenses', groupIdString],
    queryFn: async () => {
      console.log('🔍 Fetching bill expenses for group:', groupIdString);
      console.log('🔍 Original group ID:', groupId, 'Type:', typeof groupId);
      
      try {
        const response = await apiClient.get<BillExpense[]>(`/billExpenses?groupId=${groupIdString}`);
        console.log('📊 Bill expenses API response:', response.data);
        console.log('📊 Number of expenses found:', response.data.length);
        
        // Log each expense for debugging
        response.data.forEach((expense, index) => {
          console.log(`📊 Expense ${index + 1}:`, {
            id: expense.id,
            title: expense.title,
            amount: expense.amount,
            groupId: expense.groupId,
            groupIdType: typeof expense.groupId,
          });
        });
        
        // Convert date strings back to Date objects
        const expenses = response.data.map(expense => ({
          ...expense,
          date: new Date(expense.date),
        }));
        
        console.log('✅ Successfully fetched', expenses.length, 'bill expenses');
        return expenses;
      } catch (error) {
        console.error('❌ Error fetching bill expenses:', error);
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
      console.log('📊 Bill expense data received:', expense);
      console.log('🚀 Making API call to create bill expense...');
      
      try {
        const expenseData = {
          ...expense,
          id: Date.now().toString(),
          date: expense.date.toISOString(),
        };
        
        const response = await apiClient.post<BillExpense>('/billExpenses', expenseData);
        console.log('✅ API Response:', response.data);
        
        // Convert date string back to Date object
        return {
          ...response.data,
          date: new Date(response.data.date),
        };
      } catch (error) {
        console.error('❌ API Error in useAddBillExpense:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('✅ Bill expense created successfully:', data.id);
      // Invalidate and refetch bill expenses for the group
      queryClient.invalidateQueries({ queryKey: ['billExpenses', data.groupId] });
      // Also invalidate group balances if we have that query
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: (error) => {
      console.error('❌ Bill expense creation failed:', error);
    },
  });
};

// Hook to update a bill expense
export const useUpdateBillExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: BillExpense) => {
      console.log('📊 Updating bill expense:', expense.id);
      
      try {
        const expenseData = {
          ...expense,
          date: expense.date.toISOString(),
        };
        
        const response = await apiClient.put<BillExpense>(`/billExpenses/${expense.id}`, expenseData);
        console.log('✅ Bill expense updated:', response.data);
        
        return {
          ...response.data,
          date: new Date(response.data.date),
        };
      } catch (error) {
        console.error('❌ Error updating bill expense:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('✅ Bill expense updated successfully:', data.id);
      queryClient.invalidateQueries({ queryKey: ['billExpenses', data.groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: (error) => {
      console.error('❌ Bill expense update failed:', error);
    },
  });
};

// Hook to delete a bill expense
export const useDeleteBillExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ expenseId, groupId }: { expenseId: string; groupId: string }) => {
      console.log('🗑️ Deleting bill expense:', expenseId);
      
      try {
        await apiClient.delete(`/billExpenses/${expenseId}`);
        console.log('✅ Bill expense deleted:', expenseId);
        return { expenseId, groupId };
      } catch (error) {
        console.error('❌ Error deleting bill expense:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('✅ Bill expense deleted successfully:', data.expenseId);
      queryClient.invalidateQueries({ queryKey: ['billExpenses', data.groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: (error) => {
      console.error('❌ Bill expense deletion failed:', error);
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
      console.log('🧮 Calculating group balances for group:', groupIdString);
      
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

      console.log('✅ Calculated balances:', balances);
      return balances;
    },
    enabled: expenses.length >= 0 && members.length > 0,
  });
};