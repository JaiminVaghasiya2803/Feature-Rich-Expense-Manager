import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../constants/theme';
import { PieChartData } from './PieChart';

interface ChartLegendProps {
  data: PieChartData[];
  total: number;
}

const ChartLegend: React.FC<ChartLegendProps> = ({ data, total }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    return `${percentage.toFixed(1)}%`;
  };

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No expenses to display</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={styles.legendLeft}>
            <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
            <View style={styles.labelContainer}>
              {item.icon && <Text style={styles.icon}>{item.icon}</Text>}
              <Text style={styles.label}>{item.label}</Text>
            </View>
          </View>
          
          <View style={styles.legendRight}>
            <Text style={styles.amount}>{formatCurrency(item.value)}</Text>
            <Text style={styles.percentage}>{formatPercentage(item.value)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '500',
    flex: 1,
  },
  legendRight: {
    alignItems: 'flex-end',
  },
  amount: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  percentage: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
});

export default ChartLegend;