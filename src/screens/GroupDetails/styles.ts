import { ColorSchemeName } from 'react-native';
import { getThemeColors } from '../../styles/colors';
import { GroupDetailsProps } from './interface';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): GroupDetailsProps.GroupDetailsStyles => {
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
      paddingTop: 16,
      backgroundColor: themeColors.surface,
    },
    headerInfo: {
      flex: 1,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
      color: themeColors.textPrimary,
    },
    headerSubtitle: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
    },
    groupSummary: {
      padding: 24,
    },
    summaryCard: {
      padding: 16,
    },
    summaryStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    summaryItem: {
      alignItems: 'center',
    },
    summaryValue: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      color: themeColors.textPrimary,
      marginTop: 4,
    },
    summaryLabel: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
      marginTop: 4,
    },
    tabs: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      backgroundColor: themeColors.surface,
    },
    tabButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      gap: 4,
    },
    activeTab: {
      borderBottomWidth: 2,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    activeTabText: {
      color: themeColors.primary,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    expensesList: {
      gap: 16,
    },
    expenseItem: {
      padding: 16,
    },
    expenseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    expenseInfo: {
      flex: 1,
    },
    expenseTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textPrimary,
    },
    expenseDescription: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    expenseDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    expenseDate: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
    },
    expenseSeparator: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textTertiary,
    },
    expensePaidBy: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
    },
    expenseAmount: {
      alignItems: 'flex-end',
    },
    expenseAmountText: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: themeColors.textPrimary,
    },
    expenseSplitType: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
      textTransform: 'capitalize',
    },
    expenseSplit: {
      flexDirection: 'row',
      gap: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: themeColors.borderLight,
    },
    splitPersonItem: {
      alignItems: 'center',
    },
    splitPersonAvatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    splitPersonInitial: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '600',
    },
    splitPersonAmount: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
    },
    balancesCard: {
      padding: 16,
    },
    balanceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.borderLight,
    },
    balancePersonInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    balanceAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    balanceInitial: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    balanceName: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      color: themeColors.textPrimary,
    },
    balanceAmount: {
      alignItems: 'flex-end',
    },
    balanceAmountText: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    balanceStatus: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
    },
    settleContent: {
      gap: 16,
    },
    settlementItem: {
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settlementInfo: {
      flex: 1,
    },
    settlementPersons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 4,
    },
    settlementAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    settlementInitial: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    settlementArrow: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: themeColors.textSecondary,
    },
    settlementText: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
    },
    settlementAmount: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    settlementActions: {
      alignItems: 'flex-end',
    },
    settleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 12,
      paddingVertical: 6,
      backgroundColor: themeColors.secondary + '20',
      borderRadius: 16,
    },
    settleButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.secondary,
    },
    emptyState: {
      alignItems: 'center',
      padding: 32,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      color: themeColors.textPrimary,
      marginTop: 16,
    },
    emptySubtitle: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 24,
    },
    addButton: {
      paddingHorizontal: 32,
    },
    footer: {
      padding: 24,
      backgroundColor: themeColors.surface,
    },
    addExpenseButton: {
      width: '100%',
    },
  };
};
