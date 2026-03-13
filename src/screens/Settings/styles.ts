import { ColorSchemeName } from 'react-native';
import { getThemeColors, ThemeColors } from '../../styles/colors';
import { SettingsProps } from './interface';

export const getStyles = ({
  theme,
  customTheme,
}: {
  theme: ColorSchemeName;
  customTheme?: Partial<ThemeColors>;
}): SettingsProps.SettingsStyles => {
  const themeColors = getThemeColors(theme, customTheme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: 24,
      paddingTop: 16,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      color: themeColors.textPrimary,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
    },
    section: {
      marginBottom: 24,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: themeColors.textPrimary,
      marginBottom: 12,
    },
    sectionCard: {
      padding: 0,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    settingIcon: {
      marginRight: 16,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      color: themeColors.textPrimary,
    },
    settingSubtitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    separator: {
      height: 1,
      backgroundColor: themeColors.borderLight,
      marginLeft: 56,
    },
    currencyCard: {
      padding: 20,
      backgroundColor: `${themeColors.success}10`,
      borderColor: `${themeColors.success}20`,
      borderWidth: 1,
    },
    currencyTitle: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 26,
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    currencySubtitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
    },
  };
};