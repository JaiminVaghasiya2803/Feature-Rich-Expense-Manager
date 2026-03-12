import { ColorSchemeName } from 'react-native';
import { getThemeColors } from '../../styles/colors';
import { AnalysisProps } from './AnalysisScreen.interface';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): AnalysisProps.AnalysisStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
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
    scrollView: {
      flex: 1,
      paddingHorizontal: 24,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 32,
    },
    statCard: {
      width: '48%',
      padding: 16,
    },
    statHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    statIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    trendBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      gap: 2,
    },
    trendText: {
      fontSize: 10,
      fontWeight: '600',
    },
    statValue: {
      fontSize: 20,
      fontWeight: '700',
      lineHeight: 28,
      color: themeColors.textPrimary,
      marginBottom: 4,
    },
    statTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.textPrimary,
    },
    statSubtitle: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    section: {
      marginBottom: 32,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      color: themeColors.textPrimary,
    },
    categoryCard: {
      padding: 0,
    },
    categoryItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.borderLight,
    },
    categoryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    categoryIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    categoryEmoji: {
      fontSize: 18,
    },
    categoryInfo: {
      flex: 1,
    },
    categoryName: {
      fontSize: 16,
      fontWeight: '500',
      color: themeColors.textPrimary,
    },
    categoryCount: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    categoryRight: {
      alignItems: 'flex-end',
    },
    categoryAmount: {
      fontSize: 16,
      fontWeight: '600',
      color: themeColors.textPrimary,
    },
    categoryPercentage: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    trendCard: {
      padding: 20,
    },
    trendChart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 120,
    },
    trendBar: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    barContainer: {
      height: 80,
      width: 24,
      justifyContent: 'flex-end',
      marginBottom: 8,
    },
    bar: {
      width: '100%',
      borderRadius: 4,
      minHeight: 4,
    },
    barLabel: {
      fontSize: 10,
      fontWeight: '500',
      color: themeColors.textSecondary,
      marginBottom: 2,
    },
    barValue: {
      fontSize: 10,
      fontWeight: '600',
      color: themeColors.textPrimary,
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: themeColors.textPrimary,
      marginTop: 16,
    },
    emptySubtitle: {
      fontSize: 14,
      fontWeight: '400',
      color: themeColors.textSecondary,
      textAlign: 'center',
      marginTop: 8,
    },
  };
};