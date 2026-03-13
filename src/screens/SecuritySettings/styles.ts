import { StyleSheet } from 'react-native';
import { getThemeColors, ThemeColors } from '../../styles/colors';

export const getStyles = ({
  theme,
  customTheme,
}: {
  theme: 'light' | 'dark';
  customTheme?: Partial<ThemeColors>;
}) => {
  const colors = getThemeColors(theme, customTheme);

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundDefault,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    section: {
      marginTop: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: 12,
      paddingHorizontal: 4,
    },
    sectionCard: {
      padding: 0,
      backgroundColor: colors.surface,
      borderRadius: 12,
      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: 'transparent',
    },
    settingIcon: {
      width: 40,
      alignItems: 'center',
      marginRight: 12,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.textPrimary,
      marginBottom: 2,
    },
    settingSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    separator: {
      height: 1,
      backgroundColor: colors.borderLight,
      marginLeft: 52,
    },
    toggleItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: 'transparent',
    },
    toggleContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    toggleText: {
      marginLeft: 12,
    },
    toggleTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.textPrimary,
      marginBottom: 2,
    },
    toggleSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    setupCard: {
      padding: 20,
      marginTop: 20,
      backgroundColor: colors.surface,
      borderRadius: 12,
      shadowColor: colors.textPrimary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    setupTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: 20,
      textAlign: 'center',
    },
    biometricInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.success + '10',
      padding: 12,
      borderRadius: 8,
      marginVertical: 16,
    },
    biometricInfoText: {
      fontSize: 14,
      color: colors.success,
      marginLeft: 8,
      flex: 1,
    },
    setupButtons: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 24,
    },
    cancelButton: {
      flex: 1,
    },
    enableButton: {
      flex: 2,
    },
    infoCard: {
      padding: 16,
      backgroundColor: colors.info + '10',
      borderLeftWidth: 4,
      borderLeftColor: colors.info,
      borderRadius: 8,
      marginTop: 8,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: 8,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
  });
};
