import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useMutationState } from '@tanstack/react-query';
import ExpenseItem from './ExpenseItem';
import { Expense } from '../types/expense';

type Props = {
  expenses: Expense[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

const ExpenseList: React.FC<Props> = ({
  expenses,
  refreshing,
  onRefresh,
  onEndReached,
  onEdit,
  onDelete,
}) => {
  // Track IDs being updated or added
  const pendingMutations = useMutationState({
    filters: { status: 'pending' },
    select: mutation => mutation.state.variables as any,
  });

  const syncingIds = new Set(
    pendingMutations
      .map(vars => (typeof vars === 'object' ? vars?.id : vars))
      .filter(Boolean),
  );

  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ExpenseItem
          expense={item}
          isSyncing={syncingIds.has(item.id)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ExpenseList;
