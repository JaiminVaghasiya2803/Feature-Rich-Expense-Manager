import React from 'react';
import { FlatList, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { useMutationState } from '@tanstack/react-query';
import { FileX } from 'lucide-react-native';
import ExpenseItem from './ExpenseItem';
import { Expense, ExpenseGroup } from '../types/expense';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

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
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  
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
      <FileX size={48} color={themeColors.textTertiary} />
      <Text style={[styles.emptyTitle, { color: themeColors.textPrimary }]}>No expenses yet</Text>
      <Text style={[styles.emptySubtitle, { color: themeColors.textSecondary }]}>
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
          tintColor={themeColors.primary}
          colors={[themeColors.primary]}
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
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
