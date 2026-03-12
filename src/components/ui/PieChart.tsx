import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

export interface PieChartData {
  label: string;
  value: number;
  color: string;
  icon?: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  strokeWidth?: number;
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  size = Math.min(width * 0.6, 200), 
  strokeWidth = 20 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate angles and create segments
  let currentAngle = -90; // Start from top
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
    const rotation = currentAngle;
    
    currentAngle += angle;
    
    return {
      ...item,
      percentage,
      strokeDasharray,
      rotation,
    };
  });

  if (total === 0) {
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={styles.emptyChart}>
          <Text style={styles.emptyText}>No data</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <G rotation={0} origin={`${center}, ${center}`}>
          {segments.map((segment, index) => (
            <Circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={0}
              fill="transparent"
              strokeLinecap="round"
              transform={`rotate(${segment.rotation} ${center} ${center})`}
            />
          ))}
        </G>
      </Svg>
      
      {/* Center content */}
      <View style={styles.centerContent}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>
          ₹{total.toLocaleString('en-IN')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalLabel: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontWeight: '600',
  },
  totalValue: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    fontWeight: '700',
    marginTop: theme.spacing.xs,
  },
  emptyChart: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.border.light,
    borderStyle: 'dashed',
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.tertiary,
  },
});

export default PieChart;