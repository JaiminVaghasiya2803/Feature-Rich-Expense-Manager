import { ColorSchemeName } from 'react-native';
import { getThemeColors, ThemeColors } from '../../styles/colors';
import { ExpenseListProps } from './interface';

export const getStyles = ({
  theme,
  customTheme,
}: {
  theme: ColorSchemeName;
  customTheme?: Partial<ThemeColors>;
}): ExpenseListProps.ExpenseListStyles => {
  const themeColors = getThemeColors(theme, customTheme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 100, // Space for FAB
    },
    header: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerLeft: {
      flex: 1,
    },
    headerButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    analysisButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: `${themeColors.secondary}15`,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: `${themeColors.secondary}30`,
    },
    analysisButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.secondary,
      marginLeft: 4,
    },
    groupsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: `${themeColors.primary}15`,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: `${themeColors.primary}30`,
    },
    groupsButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.primary,
      marginLeft: 4,
    },
    greeting: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      color: themeColors.textPrimary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: themeColors.textSecondary,
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      gap: 16,
      marginBottom: 32,
    },
    statCard: {
      flex: 1,
      padding: 24,
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    statLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.textSecondary,
      marginLeft: 8,
    },
    statValue: {
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 32,
      color: themeColors.textPrimary,
    },
    statSubtext: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textTertiary,
      marginTop: 4,
    },
    listContainer: {
      paddingHorizontal: 24,
    },
    listHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 24,
    },
    listTitleContainer: {
      flex: 1,
    },
    listTitle: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      color: themeColors.textPrimary,
      marginBottom: 4,
    },
    expenseCount: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countText: {
      fontSize: 12,
      fontWeight: '600',
      color: themeColors.textSecondary,
      marginLeft: 4,
    },
    fab: {
      position: 'absolute',
      right: 24,
      backgroundColor: themeColors.primary,
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  };
};