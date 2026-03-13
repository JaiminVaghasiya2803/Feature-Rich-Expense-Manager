import { useTheme } from '../contexts/ThemeContext';
import { useCustomTheme } from '../contexts/CustomThemeContext';
import { getThemeColors } from '../styles/colors';

/**
 * Enhanced theme hook that combines base theme with custom colors
 * Use this instead of directly using useTheme + getThemeColors
 */
export const useEnhancedTheme = () => {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();
  const { customTheme, isCustomThemeActive } = useCustomTheme();
  
  const themeColors = getThemeColors(theme, customTheme || undefined);
  
  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
    themeColors,
    customTheme,
    isCustomThemeActive,
  };
};

/**
 * Get theme colors with custom overrides
 */
export const getEnhancedThemeColors = (theme: any, customTheme?: any) => {
  return getThemeColors(theme, customTheme);
};