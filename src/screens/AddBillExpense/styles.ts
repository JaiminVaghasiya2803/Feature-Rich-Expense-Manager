import { ColorSchemeName } from 'react-native';
import { getThemeColors } from '../../styles/colors';
import { AddBillExpenseProps } from './interface';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): AddBillExpenseProps.AddBillExpenseStyles => {
  const themeColors = getThemeColors(theme);
  
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
    expenseCard: {
      marginBottom: 16,
      padding: 16,
    },
    input: {
      marginBottom: 16,
    },
    amountInputContainer: {
      marginBottom: 16,
    },
    amountLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    amountInput: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: themeColors.borderLight,
      borderRadius: 12,
      paddingHorizontal: 16,
      minHeight: 48,
    },
    currencySymbol: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textSecondary,
      marginRight: 8,
    },
    amountTextInput: {
      flex: 1,
      fontSize: 16,
      fontWeight: '400',
      color: themeColors.textPrimary,
      paddingVertical: 16,
    },
    paidByCard: {
      marginBottom: 16,
      padding: 16,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textPrimary,
      marginBottom: 16,
    },
    paidByList: {
      flexDirection: 'row',
      gap: 16,
    },
    paidByItem: {
      alignItems: 'center',
      padding: 8,
      borderRadius: 12,
    },
    activePaidBy: {
      backgroundColor: themeColors.primaryLight,
    },
    memberAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    memberInitial: {
      color: themeColors.textInverse,
      fontWeight: '600',
    },
    memberName: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.textSecondary,
    },
    activeMemberName: {
      color: themeColors.textPrimary,
      fontWeight: '600',
    },
    splitTypeCard: {
      marginBottom: 16,
      padding: 16,
    },
    splitTypeButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    splitTypeButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 12,
      backgroundColor: themeColors.backgroundSecondary,
      gap: 4,
    },
    activeSplitType: {
      backgroundColor: themeColors.primary,
    },
    splitTypeText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    activeSplitTypeText: {
      color: themeColors.textInverse,
    },
    splitCard: {
      marginBottom: 16,
      padding: 16,
    },
    splitHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    personSplitItem: {
      marginBottom: 16,
    },
    personSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: themeColors.borderMedium,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkedBox: {
      backgroundColor: themeColors.primary,
      borderColor: themeColors.primary,
    },
    personAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    personInitial: {
      color: themeColors.textInverse,
      fontSize: 14,
      fontWeight: '600',
    },
    personName: {
      fontSize: 16,
      fontWeight: '400',
      color: themeColors.textPrimary,
      flex: 1,
    },
    splitInputs: {
      marginTop: 8,
      marginLeft: 72, // Align with person name
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.backgroundSecondary,
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 40,
    },
    inputPrefix: {
      fontSize: 16,
      fontWeight: '400',
      color: themeColors.textSecondary,
      marginRight: 4,
    },
    inputSuffix: {
      fontSize: 16,
      fontWeight: '400',
      color: themeColors.textSecondary,
      marginLeft: 4,
    },
    splitInput: {
      flex: 1,
      fontSize: 16,
      fontWeight: '400',
      color: themeColors.textPrimary,
      textAlign: 'right',
    },
    equalAmount: {
      alignItems: 'flex-end',
    },
    equalAmountText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textPrimary,
    },
    splitSummary: {
      marginTop: 16,
      padding: 16,
      backgroundColor: themeColors.backgroundSecondary,
      borderRadius: 12,
    },
    summaryText: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textPrimary,
      textAlign: 'center',
    },
    errorText: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.danger,
      textAlign: 'center',
      marginTop: 4,
    },
    footer: {
      padding: 24,
      backgroundColor: themeColors.surface,
    },
    saveButton: {
      width: '100%',
    },
  };
};