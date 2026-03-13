import { ColorSchemeName } from 'react-native';
import { getThemeColors, ThemeColors } from '../../styles/colors';
import { BillSplitHomeStyles } from './interface';

export const getStyles = ({
  theme,
  customTheme,
}: {
  theme: ColorSchemeName;
  customTheme?: Partial<ThemeColors>;
}): BillSplitHomeStyles => {
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
    statsContainer: {
      flexDirection: 'row',
      padding: 24,
      gap: 16,
    },
    statCard: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
    statValue: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
      color: themeColors.textPrimary,
      marginTop: 4,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
      marginTop: 4,
    },
    groupsSection: {
      flex: 1,
      padding: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      color: themeColors.textPrimary,
    },
    groupsList: {
      flex: 1,
    },
    groupCard: {
      marginBottom: 16,
      padding: 16,
    },
    groupHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
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
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
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
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      color: themeColors.textPrimary,
    },
    groupMembers: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
    },
    groupMembersText: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 4,
      color: themeColors.textPrimary,
    },
    membersList: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textSecondary,
      flex: 1,
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