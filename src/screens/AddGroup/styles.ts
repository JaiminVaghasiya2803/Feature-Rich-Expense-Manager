import { ColorSchemeName } from 'react-native';
import { getThemeColors } from '../../styles/colors';
import { AddGroupProps } from './interface';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): AddGroupProps.AddGroupStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    content: {
      flex: 1,
      padding: 24,
    },
    groupInfoCard: {
      marginBottom: 16,
      padding: 20,
    },
    input: {
      marginBottom: 16,
    },
    colorCard: {
      marginBottom: 16,
      padding: 20,
    },
    membersCard: {
      marginBottom: 16,
      padding: 20,
    },
    previewCard: {
      marginBottom: 16,
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 26,
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
    colorGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    colorOption: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderWidth: 3,
      borderColor: 'transparent',
    },
    selectedColor: {
      borderColor: themeColors.textPrimary,
    },
    membersList: {
      marginBottom: 16,
    },
    memberItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      gap: 12,
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
      fontSize: 16,
    },
    memberName: {
      fontSize: 16,
      fontWeight: '500',
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
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 26,
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
      gap: 6,
      marginTop: 8,
    },
    previewMembers: {
      fontSize: 12,
      fontWeight: '500',
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