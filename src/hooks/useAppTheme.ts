import { useTheme } from '../contexts/ThemeContext';
import { useCustomTheme } from '../contexts/CustomThemeContext';
import { getThemeColors } from '../styles/colors';

export const useAppTheme = () => {
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