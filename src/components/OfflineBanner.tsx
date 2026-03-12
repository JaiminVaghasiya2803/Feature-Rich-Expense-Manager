import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff, Clock } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

type Props = {
  isOffline: boolean;
  pendingActions: number;
};

const OfflineBanner: React.FC<Props> = ({ isOffline, pendingActions }) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  
  if (!isOffline) return null;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.warning + '20', borderBottomColor: themeColors.warning }]}>
      <View style={styles.content}>
        <WifiOff size={16} color={themeColors.warning} />
        <Text style={[styles.text, { color: themeColors.textPrimary }]}>Offline Mode</Text>
        {pendingActions > 0 && (
          <View style={[styles.pendingContainer, { borderLeftColor: themeColors.warning }]}>
            <Clock size={14} color={themeColors.textSecondary} />
            <Text style={[styles.pendingText, { color: themeColors.textSecondary }]}>
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  pendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    paddingLeft: 16,
    borderLeftWidth: 1,
  },
  pendingText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
});
