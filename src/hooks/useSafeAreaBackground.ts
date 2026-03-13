import { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

interface SafeAreaBackgroundConfig {
  statusBarColor?: string;
  bottomColor?: string;
  backgroundColor?: string;
  leftColor?: string;
  rightColor?: string;
}

export const useSafeAreaBackground = (config: SafeAreaBackgroundConfig = {}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const insets = useSafeAreaInsets();

  const safeAreaStyles = useMemo(() => {
    const {
      statusBarColor = themeColors.surface,
      bottomColor = themeColors.surface,
      backgroundColor = themeColors.backgroundDefault,
      leftColor = backgroundColor,
      rightColor = backgroundColor,
    } = config;

    return {
      container: {
        flex: 1,
        backgroundColor,
      },
      statusBarBackground: Platform.OS === 'ios' ? {
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        height: insets.top,
        backgroundColor: statusBarColor,
        zIndex: 1000,
      } : {},
      bottomBackground: Platform.OS === 'ios' ? {
        position: 'absolute' as const,
        bottom: 0,
        left: 0,
        right: 0,
        height: insets.bottom,
        backgroundColor: bottomColor,
        zIndex: 1000,
      } : {},
      leftBackground: Platform.OS === 'ios' ? {
        position: 'absolute' as const,
        top: insets.top,
        bottom: insets.bottom,
        left: 0,
        width: insets.left,
        backgroundColor: leftColor,
        zIndex: 1000,
      } : {},
      rightBackground: Platform.OS === 'ios' ? {
        position: 'absolute' as const,
        top: insets.top,
        bottom: insets.bottom,
        right: 0,
        width: insets.right,
        backgroundColor: rightColor,
        zIndex: 1000,
      } : {},
      content: {
        flex: 1,
        zIndex: 1,
      },
    };
  }, [theme, insets, config, themeColors]);

  return {
    safeAreaStyles,
    insets,
    themeColors,
    hasNotch: insets.top > 20,
    hasHomeIndicator: insets.bottom > 0,
  };
};