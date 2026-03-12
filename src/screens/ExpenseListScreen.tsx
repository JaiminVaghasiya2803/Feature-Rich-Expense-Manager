import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Plus, TrendingUp, Calendar, Wallet, Users, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react-native';

import ExpenseList from '../components/ExpenseList';
import OfflineBanner from '../components/OfflineBanner';
import Card from '../components/ui/Card';
import SortDropdown from '../components/ui/SortDropdown';

import { useExpenses } from '../hooks/useExpenses';
import { useDeleteExpense } from '../hooks/useDeleteExpense';
import { useGroups } from '../hooks/useGroups';

import { calculateTotal } from '../utils/calculateTotal';
import { flattenExpenses } from '../utils/flattenExpenses';

import { RootState } from '../store';
import { Expense, ExpenseGroup } from '../types/expense';
import { theme } from '../constants/theme';

import { useNavigation, NavigationProp } from '@react-navigation/native';

const ExpenseListScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();
  
  // Sort state
  const [sortBy, setSortBy] = useState('date-desc');

  const { data, fetchNextPage, hasNextPage, refetch, isFetching } =
    useExpenses();
  const { data: groupsData } = useGroups();

  const deleteMutation = useDeleteExpense();

  const isOffline = useSelector((state: RootState) => !state.network.isOnline);

  const pendingActions = useSelector(
    (state: RootState) => state.offlineQueue.queue.length,
  );

  const expenses: Expense[] = useMemo(
    () => flattenExpenses(data?.pages ?? []),
    [data],
  );

  // Sort options
  const sortOptions = useMemo(() => [
    {
      id: 'date-desc',
      label: 'Date: Newest First',
      icon: <ArrowDown size={16} color={theme.colors.text.secondary} />,
    },
    {
      id: 'date-asc',
      label: 'Date: Oldest First',
      icon: <ArrowUp size={16} color={theme.colors.text.secondary} />,
    },
    {
      id: 'amount-desc',
      label: 'Amount: High to Low',
      icon: <ArrowDown size={16} color={theme.colors.text.secondary} />,
    },
    {
      id: 'amount-asc',
      label: 'Amount: Low to High',
      icon: <ArrowUp size={16} color={theme.colors.text.secondary} />,
    },
  ], []);

  // Sorted expenses
  const sortedExpenses = useMemo(() => {
    const sorted = [...expenses];
    
    switch (sortBy) {
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'amount-desc':
        return sorted.sort((a, b) => b.amount - a.amount);
      case 'amount-asc':
        return sorted.sort((a, b) => a.amount - b.amount);
      default:
        return sorted;
    }
  }, [expenses, sortBy]);

  const groups: ExpenseGroup[] = useMemo(() => {
    return groupsData?.pages.flat() ?? [];
  }, [groupsData]);

  const totalSpent = useMemo(() => calculateTotal(sortedExpenses), [sortedExpenses]);

  const currentMonth = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const thisMonthExpenses = useMemo(() => {
    const currentDate = new Date();
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const currentMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    return sortedExpenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= currentMonthStart && expenseDate <= currentMonthEnd;
    });
  }, [sortedExpenses]);

  const thisMonthTotal = useMemo(() => calculateTotal(thisMonthExpenses), [thisMonthExpenses]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleDelete = (expense: Expense) => {
    deleteMutation.mutate(expense.id);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      <OfflineBanner isOffline={isOffline} pendingActions={pendingActions} />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Your Expenses</Text>
              <Text style={styles.subtitle}>Track your spending efficiently</Text>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.analysisButton}
                onPress={() => navigation.navigate('Analysis')}
                activeOpacity={0.7}
              >
                <BarChart3 size={20} color={theme.colors.secondary} />
                <Text style={styles.analysisButtonText}>Analysis</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.groupsButton}
                onPress={() => navigation.navigate('Groups')}
                activeOpacity={0.7}
              >
                <Users size={20} color={theme.colors.primary} />
                <Text style={styles.groupsButtonText}>Groups</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard} padding="lg">
            <View style={styles.statHeader}>
              <Wallet size={24} color={theme.colors.primary} />
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <Text style={styles.statValue}>{formatCurrency(totalSpent)}</Text>
          </Card>

          <Card style={styles.statCard} padding="lg">
            <View style={styles.statHeader}>
              <Calendar size={24} color={theme.colors.secondary} />
              <Text style={styles.statLabel}>This Month</Text>
            </View>
            <Text style={styles.statValue}>{formatCurrency(thisMonthTotal)}</Text>
            <Text style={styles.statSubtext}>{currentMonth}</Text>
          </Card>
        </View>

        {/* Expenses List */}
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <View style={styles.listTitleContainer}>
              <Text style={styles.listTitle}>Recent Expenses</Text>
              <View style={styles.expenseCount}>
                <TrendingUp size={16} color={theme.colors.text.secondary} />
                <Text style={styles.countText}>{sortedExpenses.length} expenses</Text>
              </View>
            </View>
            <SortDropdown
              options={sortOptions}
              value={sortBy}
              onSelect={setSortBy}
            />
          </View>

          <ExpenseList
            expenses={sortedExpenses}
            groups={groups}
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
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fab, { bottom: Math.max(24, insets.bottom + 16) }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Plus color={theme.colors.text.inverse} size={28} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for FAB
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  analysisButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: `${theme.colors.secondary}15`,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: `${theme.colors.secondary}30`,
  },
  analysisButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.secondary,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  groupsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: `${theme.colors.primary}15`,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: `${theme.colors.primary}30`,
  },
  groupsButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  greeting: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  statCard: {
    flex: 1,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
    fontWeight: '600',
  },
  statValue: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
  statSubtext: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.lg,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  listTitleContainer: {
    flex: 1,
  },
  listTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  expenseCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
});
