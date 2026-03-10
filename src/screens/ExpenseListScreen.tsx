import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import ExpenseList from '../components/ExpenseList';
import OfflineBanner from '../components/OfflineBanner';

import { useExpenses } from '../hooks/useExpenses';
import { useDeleteExpense } from '../hooks/useDeleteExpense';

import { calculateTotal } from '../utils/calculateTotal';
import { flattenExpenses } from '../utils/flattenExpenses';

import { RootState } from '../store';
import { Expense } from '../types/expense';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Plus } from 'lucide-react-native';

const ExpenseListScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const { data, fetchNextPage, hasNextPage, refetch, isFetching } =
    useExpenses();

  const deleteMutation = useDeleteExpense();

  const isOffline = useSelector((state: RootState) => !state.network.isOnline);

  const pendingActions = useSelector(
    (state: RootState) => state.offlineQueue.queue.length,
  );

  const expenses: Expense[] = useMemo(
    () => flattenExpenses(data?.pages ?? []),
    [data],
  );

  const totalSpent = useMemo(() => calculateTotal(expenses), [expenses]);

  const handleDelete = (expense: Expense) => {
    deleteMutation.mutate(expense.id);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      <OfflineBanner isOffline={isOffline} pendingActions={pendingActions} />

      <View style={styles.header}>
        <Text style={styles.title}>Expenses</Text>
        <Text style={styles.total}>Total: ₹{totalSpent}</Text>
      </View>

      <ExpenseList
        expenses={expenses}
        refreshing={isFetching}
        onRefresh={refetch}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEdit={expense => {
          navigation.navigate('EditExpense', { expense });
        }}
        onDelete={handleDelete}
      />

      <TouchableOpacity
        style={[styles.fab, { bottom: Math.max(24, insets.bottom + 16) }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Plus color="#fff" size={28} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});
