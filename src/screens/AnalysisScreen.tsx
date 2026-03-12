import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Calendar, TrendingUp, PieChart as PieChartIcon } from 'lucide-react-native';

import { useExpenses } from '../hooks/useExpenses';
import { flattenExpenses } from '../utils/flattenExpenses';
import { calculateTotal } from '../utils/calculateTotal';
import { getCategoryConfig } from '../constants/categories';
import { theme } from '../constants/theme';
import { Expense } from '../types/expense';

import Card from '../components/ui/Card';
import PieChart, { PieChartData } from '../components/ui/PieChart';
import ChartLegend from '../components/ui/ChartLegend';
import BarChart from '../components/ui/BarChart';
import Header from '../components/ui/Header';

const { width } = Dimensions.get('window');

type TimePeriod = 'week' | 'month' | 'year' | 'all';
type ChartType = 'pie' | 'bar';

const AnalysisScreen = () => {
  const navigation = useNavigation();
  const { data } = useExpenses();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');
  const [chartType, setChartType] = useState<ChartType>('pie');

  const expenses: Expense[] = useMemo(
    () => flattenExpenses(data?.pages ?? []),
    [data],
  );

  // Filter expenses by time period
  const filteredExpenses = useMemo(() => {
    const now = new Date();
    const startDate = new Date();

    switch (selectedPeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
        return expenses;
    }

    return expenses.filter(expense => new Date(expense.date) >= startDate);
  }, [expenses, selectedPeriod]);

  // Group expenses by category
  const categoryData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};

    filteredExpenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    return Object.entries(categoryTotals)
      .map(([categoryId, total]) => {
        const config = getCategoryConfig(categoryId as any);
        return {
          label: config.label,
          value: total,
          color: config.color,
          icon: config.icon,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [filteredExpenses]);

  const totalAmount = useMemo(() => calculateTotal(filteredExpenses), [filteredExpenses]);

  const periodLabels = {
    week: 'Last 7 Days',
    month: 'Last 30 Days',
    year: 'Last Year',
    all: 'All Time',
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const renderPeriodButton = (period: TimePeriod) => (
    <TouchableOpacity
      key={period}
      style={[
        styles.periodButton,
        selectedPeriod === period && styles.selectedPeriodButton,
      ]}
      onPress={() => setSelectedPeriod(period)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.periodButtonText,
          selectedPeriod === period && styles.selectedPeriodButtonText,
        ]}
      >
        {periodLabels[period]}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <Header
        title="Expense Analysis"
        subtitle="Category breakdown"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Period Selection */}
        <View style={styles.periodContainer}>
          <View style={styles.periodButtons}>
            {(['week', 'month', 'year', 'all'] as TimePeriod[]).map(renderPeriodButton)}
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard} padding="lg" delay={0}>
            <View style={styles.statHeader}>
              <TrendingUp size={24} color={theme.colors.primary} />
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <Text style={styles.statValue}>{formatCurrency(totalAmount)}</Text>
            <Text style={styles.statSubtext}>{periodLabels[selectedPeriod]}</Text>
          </Card>

          <Card style={styles.statCard} padding="lg" delay={100}>
            <View style={styles.statHeader}>
              <PieChartIcon size={24} color={theme.colors.secondary} />
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <Text style={styles.statValue}>{categoryData.length}</Text>
            <Text style={styles.statSubtext}>Active categories</Text>
          </Card>
        </View>

        {/* Chart Section */}
        <Card style={styles.chartCard} padding="xl" delay={200}>
          <View style={styles.chartHeader}>
            <View style={styles.chartTitleContainer}>
              <Text style={styles.chartTitle}>Spending by Category</Text>
              <Text style={styles.chartSubtitle}>
                {periodLabels[selectedPeriod]} • {filteredExpenses.length} expenses
              </Text>
            </View>
            
            <View style={styles.chartTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.chartTypeButton,
                  chartType === 'pie' && styles.selectedChartTypeButton,
                ]}
                onPress={() => setChartType('pie')}
                activeOpacity={0.7}
              >
                <PieChartIcon size={16} color={
                  chartType === 'pie' ? theme.colors.text.inverse : theme.colors.text.secondary
                } />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.chartTypeButton,
                  chartType === 'bar' && styles.selectedChartTypeButton,
                ]}
                onPress={() => setChartType('bar')}
                activeOpacity={0.7}
              >
                <TrendingUp size={16} color={
                  chartType === 'bar' ? theme.colors.text.inverse : theme.colors.text.secondary
                } />
              </TouchableOpacity>
            </View>
          </View>

          {categoryData.length > 0 ? (
            <View style={styles.chartContainer}>
              {chartType === 'pie' ? (
                <>
                  <View style={styles.chartWrapper}>
                    <PieChart data={categoryData} size={Math.min(width * 0.5, 180)} />
                  </View>
                  
                  <View style={styles.legendContainer}>
                    <ChartLegend data={categoryData} total={totalAmount} />
                  </View>
                </>
              ) : (
                <View style={styles.barChartContainer}>
                  <BarChart data={categoryData} />
                </View>
              )}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <PieChartIcon size={48} color={theme.colors.text.tertiary} />
              <Text style={styles.emptyTitle}>No expenses found</Text>
              <Text style={styles.emptySubtitle}>
                No expenses in the selected time period
              </Text>
            </View>
          )}
        </Card>

        {/* Top Categories */}
        {categoryData.length > 0 && (
          <Card style={styles.topCategoriesCard} padding="xl" delay={300}>
            <Text style={styles.sectionTitle}>Top Spending Categories</Text>
            
            {categoryData.slice(0, 5).map((category, index) => {
              const percentage = (category.value / totalAmount) * 100;
              return (
                <View key={index} style={styles.topCategoryItem}>
                  <View style={styles.topCategoryLeft}>
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.categoryEmoji}>{category.icon}</Text>
                    <Text style={styles.topCategoryName}>{category.label}</Text>
                  </View>
                  
                  <View style={styles.topCategoryRight}>
                    <Text style={styles.topCategoryAmount}>
                      {formatCurrency(category.value)}
                    </Text>
                    <Text style={styles.topCategoryPercentage}>
                      {percentage.toFixed(1)}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </Card>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  periodContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  periodButtons: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
  },
  periodButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: theme.colors.primary,
  },
  periodButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  selectedPeriodButtonText: {
    color: theme.colors.text.inverse,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
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
  chartCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  chartTitleContainer: {
    flex: 1,
  },
  chartTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  chartSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  chartTypeButtons: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.xs,
  },
  chartTypeButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.xs,
    marginHorizontal: theme.spacing.xs,
  },
  selectedChartTypeButton: {
    backgroundColor: theme.colors.primary,
  },
  chartContainer: {
    flexDirection: width < 400 ? 'column' : 'row',
    alignItems: 'flex-start',
  },
  chartWrapper: {
    alignItems: 'center',
    marginRight: width < 400 ? 0 : theme.spacing.lg,
    marginBottom: width < 400 ? theme.spacing.lg : 0,
  },
  legendContainer: {
    flex: 1,
    maxHeight: 200,
  },
  barChartContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
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
  },
  topCategoriesCard: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  topCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  topCategoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  rankText: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    fontWeight: '700',
  },
  categoryEmoji: {
    fontSize: 18,
    marginRight: theme.spacing.md,
  },
  topCategoryName: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '500',
    flex: 1,
  },
  topCategoryRight: {
    alignItems: 'flex-end',
  },
  topCategoryAmount: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  topCategoryPercentage: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
});

export default AnalysisScreen;