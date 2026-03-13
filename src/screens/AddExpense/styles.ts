import { ColorSchemeName } from 'react-native';
import { getThemeColors } from '../../styles/colors';
import { AddExpenseProps } from './interface';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): AddExpenseProps.AddExpenseStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    scrollView: {
      flex: 1,
    },
    formCard: {
      marginHorizontal: 24,
      marginBottom: 32,
      padding: 32,
    },
    groupSection: {
      marginBottom: 24,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.textPrimary,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    groupGrid: {
      gap: 8,
    },
    groupItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.borderLight,
      backgroundColor: themeColors.surface,
      marginBottom: 8,
    },
    selectedGroup: {
      borderWidth: 2,
      borderColor: themeColors.primary,
      backgroundColor: `${themeColors.primary}10`,
    },
    groupColorIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 16,
    },
    groupText: {
      fontSize: 16,
      fontWeight: '500',
      color: themeColors.textPrimary,
    },
    selectedGroupText: {
      color: themeColors.primary,
      fontWeight: '600',
    },
    groupDescription: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    selectedGroupDescription: {
      color: themeColors.primary + '80',
    },
    noGroupsMessage: {
      padding: 16,
      backgroundColor: themeColors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: themeColors.borderLight,
      alignItems: 'center',
    },
    noGroupsText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.textSecondary,
      textAlign: 'center',
      marginBottom: 12,
    },
    createGroupButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: themeColors.primary,
      borderRadius: 8,
    },
    createGroupButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.textInverse,
    },
    submitButton: {
      marginTop: 16,
    },
  };
};