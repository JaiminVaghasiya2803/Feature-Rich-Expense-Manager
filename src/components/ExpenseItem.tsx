import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Expense } from '../types/expense';
import SyncIndicator from './SyncIndicator';

type Props = {
  expense: Expense;
  isSyncing?: boolean;
  onEdit?: (expense: Expense) => void;
  onDelete?: (expense: Expense) => void;
};

const ExpenseItem: React.FC<Props> = ({
  expense,
  isSyncing,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.date}>
          {new Date(expense.date).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>₹{expense.amount}</Text>

        {isSyncing && <SyncIndicator />}

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit?.(expense)}>
            <Text style={styles.action}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete?.(expense)}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(ExpenseItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    fontSize: 12,
    color: '#777',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 6,
  },
  action: {
    marginRight: 10,
    color: '#007AFF',
  },
  delete: {
    color: 'red',
  },
});
