import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Plus, TrendingUp, Calendar, Wallet, Users, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react-native';

import ExpenseList from '../../components/ExpenseList';
import OfflineBanner from '../../components/OfflineBanner';
import Card from '../../components/ui/Card';
import SortDropdown from '../../components/ui/SortDropdown';

import { useExpenses } from '../../hooks/useExpenses';
import { useDeleteExpense } from '../../hooks/useDeleteExpense';
import { useGroups } from '../../hooks/useGroups';

import { calculateTotal } from '../../utils/calculateTotal';
import { flattenExpenses } from '../../utils/flattenExpenses';

import { RootState } from '../../store';
import { Expense, ExpenseGroup } from '../../types/expense';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useCustomTheme } from '../../contexts/CustomThemeContext';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

const ExpenseListScreen = () => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const styles = useStyles({ theme, customTheme: customTheme || undefined });
  
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
      icon: <ArrowDown size={16} color={themeColors.textSecondary} />,
    },
    {
      id: 'date-asc',
      label: 'Date: Oldest First',
      icon: <ArrowUp size={16} color={themeColors.textSecondary} />,
    },
    {
      id: 'amount-desc',
      label: 'Amount: High to Low',
      icon: <ArrowDown size={16} color={themeColors.textSecondary} />,
    },
    {
      id: 'amount-asc',
      label: 'Amount: Low to High',
      icon: <ArrowUp size={16} color={themeColors.textSecondary} />,
    },
  ], [themeColors.textSecondary]);

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
    return groupsData?.pages?.check.flat() ?? [];
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
                <BarChart3 size={20} color={themeColors.secondary} />
                <Text style={styles.analysisButtonText}>Analysis</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.groupsButton}
                onPress={() => navigation.navigate('Groups')}
                activeOpacity={0.7}
              >
                <Users size={20} color={themeColors.primary} />
                <Text style={styles.groupsButtonText}>Groups</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Wallet size={24} color={themeColors.primary} />
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <Text style={styles.statValue}>{formatCurrency(totalSpent)}</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Calendar size={24} color={themeColors.secondary} />
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
                <TrendingUp size={16} color={themeColors.textSecondary} />
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
        <Plus color={themeColors.textInverse} size={28} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseListScreen;