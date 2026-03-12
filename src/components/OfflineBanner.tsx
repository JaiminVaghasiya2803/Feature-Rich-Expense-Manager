import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff, Clock } from 'lucide-react-native';
import { theme } from '../constants/theme';

type Props = {
  isOffline: boolean;
  pendingActions: number;
};

const OfflineBanner: React.FC<Props> = ({ isOffline, pendingActions }) => {
  if (!isOffline) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <WifiOff size={16} color={theme.colors.warning} />
        <Text style={styles.text}>Offline Mode</Text>
        {pendingActions > 0 && (
          <View style={styles.pendingContainer}>
            <Clock size={14} color={theme.colors.text.secondary} />
            <Text style={styles.pendingText}>
              {pendingActions} pending sync{pendingActions !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default OfflineBanner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.warningLight,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.warning,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.warning,
  },
  pendingText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
});
