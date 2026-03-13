import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import { Settlement, Balance } from '../types/billSplit';
import { calculateSettlements } from '../utils/billSplitCalculations';

export interface SettlementRecord {
  id: string;
  groupId: string;
  fromPersonId: string;
  toPersonId: string;
  amount: number;
  currency: string;
  settledAt: string;
  note?: string;
}

// Hook to get all settlements for a group
export const useSettlements = (groupId: string) => {
  return useQuery({
    queryKey: ['settlements', groupId],
    queryFn: async () => {
      try {
        const response = await apiClient.get<SettlementRecord[]>(`/settlements?groupId=${groupId}`);

        return response.data;
      } catch (error) {
        if (__DEV__) {
          console.error('❌ Error fetching settlements:', error);
        }
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
};

// Hook to calculate required settlements from balances
export const useCalculateSettlements = (balances: Balance[]) => {
  return useQuery({
    queryKey: ['calculateSettlements', balances.map(b => `${b.person.id}:${b.balance}`).join(',')],
    queryFn: async () => {
      if (!balances || balances.length === 0) {
        return [];
      }

      const settlements = calculateSettlements(balances);
      return settlements;
    },
    enabled: balances && balances.length > 0,
  });
};

// Hook to record a settlement
export const useRecordSettlement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settlement: Omit<SettlementRecord, 'id' | 'settledAt'>) => {
      try {
        const settlementData: SettlementRecord = {
          ...settlement,
          id: Date.now().toString(),
          settledAt: new Date().toISOString(),
        };

        const response = await apiClient.post<SettlementRecord>('/settlements', settlementData);

        return response.data;
      } catch (error) {
        console.error('❌ API Error in useRecordSettlement:', error);
        throw error;
      }
    },
    onSuccess: data => {
      // Invalidate settlements for the group
      queryClient.invalidateQueries({ queryKey: ['settlements', data.groupId] });
      // Also invalidate group balances to reflect the settlement
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: error => {
      console.error('❌ Settlement recording failed:', error);
    },
  });
};

// Hook to delete a settlement (undo)
export const useDeleteSettlement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ settlementId, groupId }: { settlementId: string; groupId: string }) => {
      try {
        await apiClient.delete(`/settlements/${settlementId}`);
        return { settlementId, groupId };
      } catch (error) {
        if (__DEV__) {
          console.error('❌ Error deleting settlement:', error);
        }
        throw error;
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['settlements', data.groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: error => {
      if (__DEV__) {
        console.error('❌ Settlement deletion failed:', error);
      }
    },
  });
};

// Hook to get settlement history with person details
export const useSettlementHistory = (groupId: string, members: any[]) => {
  const { data: settlements = [] } = useSettlements(groupId);

  return useQuery({
    queryKey: ['settlementHistory', groupId, settlements.length],
    queryFn: async () => {
      const history = settlements
        .map(settlement => {
          const fromPerson = members.find(m => m.id === settlement.fromPersonId);
          const toPerson = members.find(m => m.id === settlement.toPersonId);

          return {
            ...settlement,
            fromPerson,
            toPerson,
            settledAt: new Date(settlement.settledAt),
          };
        })
        .sort((a, b) => b.settledAt.getTime() - a.settledAt.getTime()); // Most recent first

      return history;
    },
    enabled: settlements.length >= 0 && members.length > 0,
  });
};
