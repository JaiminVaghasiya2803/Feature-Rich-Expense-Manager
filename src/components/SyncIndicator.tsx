import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

const SyncIndicator = () => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  return (
    <View style={[styles.container, { backgroundColor: `${themeColors.primary}10` }]}>
      <ActivityIndicator size="small" color={themeColors.primary} />
      <Text style={[styles.text, { color: themeColors.primary }]}>Syncing...</Text>
    </View>
  );
};

export default SyncIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
});
