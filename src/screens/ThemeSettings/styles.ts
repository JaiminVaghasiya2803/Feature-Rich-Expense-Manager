import { ColorSchemeName } from 'react-native';
import { getThemeColors, ThemeColors } from '../../styles/colors';
import { ThemeSettingsProps } from './interface';

export const getStyles = ({
  theme,
  customTheme,
}: {
  theme: ColorSchemeName;
  customTheme?: Partial<ThemeColors>;
}): ThemeSettingsProps.ThemeSettingsStyles => {
  const themeColors = getThemeColors(theme, customTheme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    header: {
      padding: 24,
      paddingTop: 16,
      backgroundColor: themeColors.surface,
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
    categoryTabs: {
      flexDirection: 'row',
      backgroundColor: themeColors.surface,
      paddingHorizontal: 24,
      paddingBottom: 16,
      gap: 12,
    },
    categoryTab: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: themeColors.backgroundSecondary,
      gap: 8,
    },
    selectedCategoryTab: {
      backgroundColor: themeColors.primary + '20',
    },
    categoryTabText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    selectedCategoryTabText: {
      color: themeColors.primary,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    sectionCard: {
      marginBottom: 20,
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    sectionSubtitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
      marginBottom: 16,
    },
    themeOptions: {
      flexDirection: 'row',
      gap: 12,
    },
    themeOption: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      backgroundColor: themeColors.backgroundSecondary,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedThemeOption: {
      borderColor: themeColors.primary,
      backgroundColor: themeColors.primary + '10',
    },
    themeOptionText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.textSecondary,
      marginTop: 8,
    },
    selectedThemeOptionText: {
      color: themeColors.primary,
    },
    presetsScrollView: {
      marginHorizontal: -20,
      paddingHorizontal: 20,
    },
    presetThemes: {
      flexDirection: 'row',
      gap: 16,
      paddingRight: 24,
    },
    presetTheme: {
      alignItems: 'center',
      padding: 16,
      borderRadius: 16,
      backgroundColor: themeColors.backgroundSecondary,
      minWidth: 100,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    presetColors: {
      flexDirection: 'row',
      marginBottom: 12,
      gap: 4,
    },
    presetColor: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 1,
      borderColor: themeColors.borderLight,
    },
    presetName: {
      fontSize: 13,
      fontWeight: '600',
      color: themeColors.textPrimary,
      textAlign: 'center',
      marginBottom: 4,
    },
    presetDescription: {
      fontSize: 11,
      fontWeight: '400',
      color: themeColors.textSecondary,
      textAlign: 'center',
    },
    themePreview: {
      borderRadius: 12,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: themeColors.borderLight,
    },
    previewHeader: {
      padding: 16,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.borderLight,
    },
    previewHeaderText: {
      fontSize: 16,
      fontWeight: '600',
    },
    previewContent: {
      padding: 16,
    },
    previewCard: {
      padding: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: themeColors.borderLight,
    },
    previewCardTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
    },
    previewCardText: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
    },
    previewButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    previewButtonText: {
      fontSize: 14,
      fontWeight: '500',
    },
    previewFooter: {
      padding: 12,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: themeColors.borderLight,
    },
    previewFooterText: {
      fontSize: 12,
      fontWeight: '500',
    },
    themeCategoryTabs: {
      flexDirection: 'row',
      marginBottom: 16,
      backgroundColor: themeColors.backgroundSecondary,
      borderRadius: 8,
      padding: 4,
    },
    themeCategoryTab: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      gap: 6,
    },
    selectedThemeCategoryTab: {
      backgroundColor: themeColors.surface,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    themeCategoryTabText: {
      fontSize: 13,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    selectedThemeCategoryTabText: {
      color: themeColors.primary,
    },
    categoryDescription: {
      fontSize: 13,
      fontWeight: '400',
      color: themeColors.textSecondary,
      marginBottom: 16,
      lineHeight: 18,
    },
    colorPickerContainer: {
      marginBottom: 20,
    },
    colorLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: themeColors.textPrimary,
      marginBottom: 12,
    },
    colorOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    colorOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: 'transparent',
    },
    selectedColor: {
      borderColor: themeColors.textPrimary,
    },
    footer: {
      padding: 24,
      backgroundColor: themeColors.surface,
      borderTopWidth: 1,
      borderTopColor: themeColors.borderLight,
    },
    resetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
  };
};