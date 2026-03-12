import { ColorSchemeName } from 'react-native';
import { getThemeColors } from '../../styles/colors';
import { GroupsProps } from './interface';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): GroupsProps.GroupsStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    header: {
      padding: 24,
      paddingTop: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    headerContent: {
      flex: 1,
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
    refreshButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: themeColors.backgroundSecondary,
    },
    refreshText: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.primary,
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      gap: 16,
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      padding: 20,
    },
    statHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    statLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: themeColors.textSecondary,
      marginLeft: 8,
    },
    statValue: {
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 36,
      color: themeColors.textPrimary,
    },
    searchContainer: {
      paddingHorizontal: 24,
      marginBottom: 16,
    },
    searchInput: {
      marginBottom: 0,
    },
    groupsList: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 100, // Space for FAB
    },
    groupCard: {
      marginBottom: 16,
      padding: 16,
    },
    groupHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    groupColorIndicator: {
      width: 4,
      height: 40,
      borderRadius: 2,
      marginRight: 16,
    },
    groupInfo: {
      flex: 1,
    },
    groupName: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 26,
      color: themeColors.textPrimary,
    },
    groupDescription: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    groupStats: {
      alignItems: 'flex-end',
    },
    groupAmount: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 26,
      color: themeColors.textPrimary,
    },
    groupExpenseCount: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
      marginTop: 2,
    },
    groupFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    groupMembers: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    memberCount: {
      fontSize: 14,
      fontWeight: '500',
      color: themeColors.textSecondary,
    },
    groupDate: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    dateText: {
      fontSize: 12,
      fontWeight: '400',
      color: themeColors.textTertiary,
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
      marginTop: 40,
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
      marginTop: 8,
      marginBottom: 24,
    },
    createButton: {
      paddingHorizontal: 32,
    },
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  };
};