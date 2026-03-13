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
      console.log('🔍 Fetching settlements for group:', groupId);
      
      try {
        const response = await apiClient.get<SettlementRecord[]>(`/settlements?groupId=${groupId}`);
        console.log('📊 Settlements API response:', response.data);
        
        console.log('✅ Successfully fetched', response.data.length, 'settlements');
        return response.data;
      } catch (error) {
        console.error('❌ Error fetching settlements:', error);
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
      console.log('🧮 Calculating required settlements from balances');
      
      if (!balances || balances.length === 0) {
        return [];
      }

      const settlements = calculateSettlements(balances);
      console.log('✅ Calculated settlements:', settlements);
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
      console.log('📊 Recording settlement:', settlement);
      console.log('🚀 Making API call to record settlement...');
      
      try {
        const settlementData: SettlementRecord = {
          ...settlement,
          id: Date.now().toString(),
          settledAt: new Date().toISOString(),
        };
        
        const response = await apiClient.post<SettlementRecord>('/settlements', settlementData);
        console.log('✅ API Response:', response.data);
        
        return response.data;
      } catch (error) {
        console.error('❌ API Error in useRecordSettlement:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('✅ Settlement recorded successfully:', data.id);
      // Invalidate settlements for the group
      queryClient.invalidateQueries({ queryKey: ['settlements', data.groupId] });
      // Also invalidate group balances to reflect the settlement
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: (error) => {
      console.error('❌ Settlement recording failed:', error);
    },
  });
};

// Hook to delete a settlement (undo)
export const useDeleteSettlement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ settlementId, groupId }: { settlementId: string; groupId: string }) => {
      console.log('🗑️ Deleting settlement:', settlementId);
      
      try {
        await apiClient.delete(`/settlements/${settlementId}`);
        console.log('✅ Settlement deleted:', settlementId);
        return { settlementId, groupId };
      } catch (error) {
        console.error('❌ Error deleting settlement:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('✅ Settlement deleted successfully:', data.settlementId);
      queryClient.invalidateQueries({ queryKey: ['settlements', data.groupId] });
      queryClient.invalidateQueries({ queryKey: ['groupBalances', data.groupId] });
    },
    onError: (error) => {
      console.error('❌ Settlement deletion failed:', error);
    },
  });
};

// Hook to get settlement history with person details
export const useSettlementHistory = (groupId: string, members: any[]) => {
  const { data: settlements = [] } = useSettlements(groupId);

  return useQuery({
    queryKey: ['settlementHistory', groupId, settlements.length],
    queryFn: async () => {
      console.log('📋 Building settlement history for group:', groupId);
      
      const history = settlements.map(settlement => {
        const fromPerson = members.find(m => m.id === settlement.fromPersonId);
        const toPerson = members.find(m => m.id === settlement.toPersonId);
        
        return {
          ...settlement,
          fromPerson,
          toPerson,
          settledAt: new Date(settlement.settledAt),
        };
      }).sort((a, b) => b.settledAt.getTime() - a.settledAt.getTime()); // Most recent first

      console.log('✅ Built settlement history:', history.length, 'records');
      return history;
    },
    enabled: settlements.length >= 0 && members.length > 0,
  });
};