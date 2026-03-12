import React from 'react';
import { FlatList, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { useMutationState } from '@tanstack/react-query';
import { FileX } from 'lucide-react-native';
import ExpenseItem from './ExpenseItem';
import { Expense, ExpenseGroup } from '../types/expense';
import { theme } from '../constants/theme';

type Props = {
  expenses: Expense[];
  groups: ExpenseGroup[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

const ExpenseList: React.FC<Props> = ({
  expenses,
  groups,
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

  const getGroupForExpense = (expense: Expense) => {
    return expense.groupId ? groups.find(g => g.id === expense.groupId) : undefined;
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <FileX size={48} color={theme.colors.text.tertiary} />
      <Text style={styles.emptyTitle}>No expenses yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button to add your first expense
      </Text>
    </View>
  );

  if (expenses.length === 0 && !refreshing) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ExpenseItem
          expense={item}
          group={getGroupForExpense(item)}
          isSyncing={syncingIds.has(item.id)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          tintColor={theme.colors.primary}
          colors={[theme.colors.primary]}
        />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

export default ExpenseList;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
