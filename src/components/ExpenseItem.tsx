import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Edit3, Trash2, Calendar } from 'lucide-react-native';
import { Expense, ExpenseGroup } from '../types/expense';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';
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
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
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
    <Card style={styles.container} padding={24} shadow="sm">
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: themeColors.textPrimary }]}>{expense.title}</Text>
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
                <Text style={[styles.groupName, { color: themeColors.textSecondary }]}>{group.name}</Text>
              </View>
            )}
            
            <View style={styles.dateContainer}>
              <Calendar size={12} color={themeColors.textTertiary} />
              <Text style={[styles.date, { color: themeColors.textTertiary }]}>{formatDate(expense.date)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.amountSection}>
          <Text style={[styles.amount, { color: themeColors.textPrimary }]}>{formatAmount(expense.amount)}</Text>
          {isSyncing && (
            <View style={styles.syncContainer}>
              <SyncIndicator />
            </View>
          )}
        </View>
      </View>

      <View style={[styles.actions, { borderTopColor: themeColors.borderLight }]}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton, { backgroundColor: `${themeColors.primary}15` }]}
          onPress={() => onEdit?.(expense)}
          activeOpacity={0.7}
        >
          <Edit3 size={16} color={themeColors.primary} />
          <Text style={[styles.editText, { color: themeColors.primary }]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton, { backgroundColor: `${themeColors.danger}15` }]}
          onPress={() => onDelete?.(expense)}
          activeOpacity={0.7}
        >
          <Trash2 size={16} color={themeColors.danger} />
          <Text style={[styles.deleteText, { color: themeColors.danger }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default memo(ExpenseItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  category: {
    fontSize: 12,
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
    borderRadius: 4,
    marginRight: 4,
  },
  groupName: {
    fontSize: 12,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    marginLeft: 4,
  },
  amountSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
  },
  syncContainer: {
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButton: {},
  deleteButton: {},
  editText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});
