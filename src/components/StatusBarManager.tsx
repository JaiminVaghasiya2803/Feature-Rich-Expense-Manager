import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useCustomTheme } from '../contexts/CustomThemeContext';
import { getThemeColors } from '../styles/colors';

const StatusBarManager: React.FC = () => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // iOS status bar style
      StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content', true);
    } else {
      // Android status bar
      StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content', true);
      StatusBar.setBackgroundColor(themeColors.surface, true);
      StatusBar.setTranslucent(false);
    }
  }, [theme, themeColors]);

  return (
    <StatusBar
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      backgroundColor={Platform.OS === 'android' ? themeColors.surface : undefined}
      translucent={Platform.OS === 'android' ? false : undefined}
    />
  );
};

export default StatusBarManager;