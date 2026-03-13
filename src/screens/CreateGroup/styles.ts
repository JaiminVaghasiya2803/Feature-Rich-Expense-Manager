import { ColorSchemeName } from 'react-native';
import { getThemeColors, ThemeColors } from '../../styles/colors';
import { CreateGroupProps } from './interface';

export const getStyles = ({
  theme,
  customTheme,
}: {
  theme: ColorSchemeName;
  customTheme?: Partial<ThemeColors>;
}): CreateGroupProps.CreateGroupStyles => {
  const themeColors = getThemeColors(theme, customTheme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 24,
      paddingTop: 48,
      backgroundColor: themeColors.surface,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
      color: themeColors.textPrimary,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    groupInfoCard: {
      marginBottom: 16,
      padding: 16,
    },
    input: {
      marginBottom: 16,
    },
    colorCard: {
      marginBottom: 16,
      padding: 16,
    },
    currencyCard: {
      marginBottom: 16,
      padding: 16,
    },
    membersCard: {
      marginBottom: 16,
      padding: 16,
    },
    previewCard: {
      marginBottom: 16,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: themeColors.textPrimary,
      marginBottom: 16,
    },
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    colorOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 3,
      borderColor: 'transparent',
    },
    selectedColor: {
      borderColor: themeColors.textPrimary,
    },
    currencyList: {
      flexDirection: 'row',
      gap: 8,
    },
    currencyOption: {
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      backgroundColor: themeColors.backgroundSecondary,
      minWidth: 80,
    },
    selectedCurrency: {
      backgroundColor: themeColors.primary,
    },
    currencySymbol: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors.textPrimary,
      marginBottom: 4,
    },
    currencyCode: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
    },
    selectedCurrencyText: {
      color: themeColors.textInverse,
    },
    membersList: {
      marginBottom: 16,
    },
    memberItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      gap: 16,
    },
    memberAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    memberInitial: {
      color: themeColors.textInverse,
      fontWeight: '600',
    },
    memberName: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: themeColors.textPrimary,
      flex: 1,
    },
    addMemberSection: {
      borderTopWidth: 1,
      borderTopColor: themeColors.borderLight,
      paddingTop: 16,
    },
    addMemberInput: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.backgroundSecondary,
      borderRadius: 12,
      paddingHorizontal: 16,
    },
    memberInput: {
      flex: 1,
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: themeColors.textPrimary,
      paddingVertical: 16,
    },
    addButton: {
      padding: 8,
    },
    groupPreview: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: themeColors.backgroundSecondary,
      borderRadius: 12,
    },
    groupColorIndicator: {
      width: 4,
      height: 50,
      borderRadius: 2,
      marginRight: 16,
    },
    groupPreviewInfo: {
      flex: 1,
    },
    previewName: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: themeColors.textPrimary,
    },
    previewDescription: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    previewStats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    previewMembers: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
    },
    footer: {
      padding: 24,
      backgroundColor: themeColors.surface,
    },
    createButton: {
      width: '100%',
    },
  };
};