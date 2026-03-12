import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Edit3, Trash2, Calendar, Tag, Users } from 'lucide-react-native';
import { Expense, ExpenseGroup } from '../types/expense';
import { theme } from '../constants/theme';
import { getCategoryConfig } from '../constants/categories';
import SyncIndicator from './SyncIndicator';
import Card from './ui/Card';

type Props = {
  expense: Expense;
  group?: ExpenseGroup;
  isSyncing?: boolean;
  onEdit?: (expense: Expense) => void;
  onDelete?: (expense: Expense) => void;
};

const ExpenseItem: React.FC<Props> = ({
  expense,
  group,
  isSyncing,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const categoryConfig = getCategoryConfig(expense.category);

  return (
    <Card style={styles.container} padding="lg" shadow="sm">
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>{expense.title}</Text>
          <View style={styles.metadata}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryIcon}>{categoryConfig.icon}</Text>
              <Text style={[styles.category, { color: categoryConfig.color }]}>
                {categoryConfig.label}
              </Text>
            </View>
            
            {group && (
              <View style={styles.groupContainer}>
                <View style={[styles.groupColorIndicator, { backgroundColor: group.color }]} />
                <Text style={styles.groupName}>{group.name}</Text>
              </View>
            )}
            
            <View style={styles.dateContainer}>
              <Calendar size={12} color={theme.colors.text.tertiary} />
              <Text style={styles.date}>{formatDate(expense.date)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.amount}>{formatAmount(expense.amount)}</Text>
          {isSyncing && (
            <View style={styles.syncContainer}>
              <SyncIndicator />
            </View>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => onEdit?.(expense)}
          activeOpacity={0.7}
        >
          <Edit3 size={16} color={theme.colors.primary} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onDelete?.(expense)}
          activeOpacity={0.7}
        >
          <Trash2 size={16} color={theme.colors.danger} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default memo(ExpenseItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  titleSection: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: theme.spacing.xs,
  },
  category: {
    ...theme.typography.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupColorIndicator: {
    width: 8,
    height: 8,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.xs,
  },
  groupName: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginLeft: theme.spacing.xs,
  },
  amountSection: {
    alignItems: 'flex-end',
  },
  amount: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  syncContainer: {
    marginTop: theme.spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.surfaceSecondary,
  },
  editButton: {
    backgroundColor: `${theme.colors.primary}15`,
  },
  deleteButton: {
    backgroundColor: `${theme.colors.danger}15`,
  },
  editText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  deleteText: {
    ...theme.typography.bodySmall,
    color: theme.colors.danger,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
});
