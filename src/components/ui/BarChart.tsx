import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

export interface BarChartData {
  label: string;
  value: number;
  color: string;
  icon?: string;
}

interface BarChartProps {
  data: BarChartData[];
  maxBarWidth?: number;
  showValues?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  maxBarWidth = width * 0.6,
  showValues = true 
}) => {
  const maxValue = Math.max(...data.map(item => item.value));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const barWidth = maxValue > 0 ? (item.value / maxValue) * maxBarWidth : 0;
        
        return (
          <View key={index} style={styles.barContainer}>
            <View style={styles.labelContainer}>
              {item.icon && <Text style={styles.icon}>{item.icon}</Text>}
              <Text style={styles.label} numberOfLines={1}>
                {item.label}
              </Text>
            </View>
            
            <View style={styles.barWrapper}>
              <View style={styles.barTrack}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      width: barWidth, 
                      backgroundColor: item.color 
                    }
                  ]} 
                />
              </View>
              
              {showValues && (
                <Text style={styles.value}>
                  {formatCurrency(item.value)}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
  },
  barContainer: {
    marginBottom: theme.spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  icon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  label: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.primary,
    fontWeight: '600',
    flex: 1,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.md,
  },
  bar: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
    minWidth: 2,
  },
  value: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
});

export default BarChart;