import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3, 
  Calendar,
  IndianRupee,
  Target,
  Award
} from 'lucide-react-native';

import Card from '../../components/ui/Card';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useExpenses } from '../../hooks/useExpenses';
import { flattenExpenses } from '../../utils/flattenExpenses';
import { calculateTotal } from '../../utils/calculateTotal';
import { Expense } from '../../types/expense';
import { EXPENSE_CATEGORIES } from '../../constants/categories';
import { getStyles } from './AnalysisScreen.styles';

const useStyles = createUseStyles(getStyles);
const { width } = Dimensions.get('window');

const AnalysisScreen = () => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });
  
  const { data } = useExpenses();
  
  const expenses: Expense[] = useMemo(
    () => flattenExpenses(data?.pages ?? []),
    [data],
  );

  // Calculate current month data
  const currentMonthData = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });
    
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const previousMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === previousMonth && 
             expenseDate.getFullYear() === previousYear;
    });
    
    const currentTotal = calculateTotal(currentMonthExpenses);
    const previousTotal = calculateTotal(previousMonthExpenses);
    const change = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;
    
    return {
      current: currentTotal,
      previous: previousTotal,
      change,
      expenses: currentMonthExpenses,
    };
  }, [expenses]);

  // Calculate category breakdown
  const categoryBreakdown = useMemo(() => {
    const breakdown = EXPENSE_CATEGORIES.map(category => {
      const categoryExpenses = currentMonthData.expenses.filter(
        expense => expense.category === category.id
      );
      const total = calculateTotal(categoryExpenses);
      const percentage = currentMonthData.current > 0 ? (total / currentMonthData.current) * 100 : 0;
      
      return {
        ...category,
        total,
        percentage,
        count: categoryExpenses.length,
      };
    }).filter(category => category.total > 0)
     .sort((a, b) => b.total - a.total);
    
    return breakdown;
  }, [currentMonthData]);

  // Calculate weekly trend
  const weeklyTrend = useMemo(() => {
    const weeks = [];
    const now = new Date();
    
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (i * 7) - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      
      const weekExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= weekStart && expenseDate <= weekEnd;
      });
      
      weeks.push({
        week: `Week ${4 - i}`,
        total: calculateTotal(weekExpenses),
        count: weekExpenses.length,
      });
    }
    
    return weeks;
  }, [expenses]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const StatCard = ({ 
    icon, 
    title, 
    value, 
    subtitle, 
    trend, 
    color = themeColors.primary 
  }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    subtitle?: string;
    trend?: { value: number; isPositive: boolean };
    color?: string;
  }) => (
    <Card style={styles.statCard}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: `${color}15` }]}>
          {icon}
        </View>
        {trend && (
          <View style={[styles.trendBadge, { 
            backgroundColor: trend.isPositive ? `${themeColors.danger}15` : `${themeColors.success}15` 
          }]}>
            {trend.isPositive ? 
              <TrendingUp size={12} color={themeColors.danger} /> : 
              <TrendingDown size={12} color={themeColors.success} />
            }
            <Text style={[styles.trendText, { 
              color: trend.isPositive ? themeColors.danger : themeColors.success 
            }]}>
              {Math.abs(trend.value).toFixed(1)}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </Card>
  );

  const CategoryItem = ({ category }: { category: any }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryLeft}>
        <View style={[styles.categoryIcon, { backgroundColor: `${category.color}15` }]}>
          <Text style={styles.categoryEmoji}>{category.icon}</Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{category.label}</Text>
          <Text style={styles.categoryCount}>{category.count} expenses</Text>
        </View>
      </View>
      <View style={styles.categoryRight}>
        <Text style={styles.categoryAmount}>{formatCurrency(category.total)}</Text>
        <Text style={styles.categoryPercentage}>{category.percentage.toFixed(1)}%</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Expense Analysis</Text>
        <Text style={styles.headerSubtitle}>Insights into your spending patterns</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Overview Stats */}
        <View style={styles.statsGrid}>
          <StatCard
            icon={<IndianRupee size={24} color={themeColors.primary} />}
            title="This Month"
            value={formatCurrency(currentMonthData.current)}
            subtitle={new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            trend={{
              value: currentMonthData.change,
              isPositive: currentMonthData.change > 0
            }}
          />
          
          <StatCard
            icon={<Target size={24} color={themeColors.secondary} />}
            title="Daily Average"
            value={formatCurrency(currentMonthData.current / new Date().getDate())}
            subtitle="Current month"
            color={themeColors.secondary}
          />
          
          <StatCard
            icon={<Award size={24} color={themeColors.warning} />}
            title="Total Expenses"
            value={currentMonthData.expenses.length.toString()}
            subtitle="This month"
            color={themeColors.warning}
          />
          
          <StatCard
            icon={<Calendar size={24} color={themeColors.info} />}
            title="Last Month"
            value={formatCurrency(currentMonthData.previous)}
            subtitle="Previous period"
            color={themeColors.info}
          />
        </View>

        {/* Category Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <PieChart size={24} color={themeColors.primary} />
            <Text style={styles.sectionTitle}>Category Breakdown</Text>
          </View>
          
          <Card style={styles.categoryCard}>
            {categoryBreakdown.length > 0 ? (
              categoryBreakdown.map((category, index) => (
                <CategoryItem key={category.id} category={category} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <PieChart size={48} color={themeColors.textTertiary} />
                <Text style={styles.emptyTitle}>No expenses this month</Text>
                <Text style={styles.emptySubtitle}>Start adding expenses to see your breakdown</Text>
              </View>
            )}
          </Card>
        </View>

        {/* Weekly Trend */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={themeColors.secondary} />
            <Text style={styles.sectionTitle}>Weekly Trend</Text>
          </View>
          
          <Card style={styles.trendCard}>
            <View style={styles.trendChart}>
              {weeklyTrend.map((week, index) => {
                const maxAmount = Math.max(...weeklyTrend.map(w => w.total));
                const height = maxAmount > 0 ? (week.total / maxAmount) * 100 : 0;
                
                return (
                  <View key={week.week} style={styles.trendBar}>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.bar, 
                          { 
                            height: `${height}%`,
                            backgroundColor: themeColors.secondary 
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.barLabel}>{week.week}</Text>
                    <Text style={styles.barValue}>₹{week.total.toFixed(0)}</Text>
                  </View>
                );
              })}
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default AnalysisScreen;