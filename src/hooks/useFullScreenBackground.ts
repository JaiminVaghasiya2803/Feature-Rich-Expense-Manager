import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useCustomTheme } from '../contexts/CustomThemeContext';
import { getThemeColors } from '../styles/colors';

interface FullScreenBackgroundOptions {
  statusBarColor?: string;
  bottomColor?: string;
  backgroundColor?: string;
  updateStatusBar?: boolean;
}

export const useFullScreenBackground = (options: FullScreenBackgroundOptions = {}) => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const insets = useSafeAreaInsets();

  const {
    statusBarColor = themeColors.surface,
    bottomColor = themeColors.surface,
    backgroundColor = themeColors.backgroundDefault,
    updateStatusBar = true,
  } = options;

  useEffect(() => {
    if (updateStatusBar && Platform.OS === 'android') {
      StatusBar.setBackgroundColor(statusBarColor, true);
    }
  }, [statusBarColor, updateStatusBar]);

  return {
    containerStyle: {
      flex: 1,
      backgroundColor,
    },
    statusBarOverlayStyle: Platform.OS === 'ios' && insets.top > 0 ? {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: insets.top,
      backgroundColor: statusBarColor,
      zIndex: 999,
    } : null,
    bottomOverlayStyle: Platform.OS === 'ios' && insets.bottom > 0 ? {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: insets.bottom,
      backgroundColor: bottomColor,
      zIndex: 999,
    } : null,
    insets,
    themeColors,
  };
};