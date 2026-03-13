import { StyleSheet } from 'react-native';
import { getThemeColors, ThemeColors } from '../../styles/colors';

export const getStyles = ({ theme, customTheme }: { theme: 'light' | 'dark'; customTheme?: Partial<ThemeColors> }) => {
  const colors = getThemeColors(theme, customTheme);
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
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
      color: colors.text,
      marginBottom: 12,
      paddingHorizontal: 4,
    },
    sectionCard: {
      padding: 0,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
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
      color: colors.text,
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
      color: colors.text,
      marginBottom: 2,
    },
    toggleSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    setupCard: {
      padding: 20,
      marginTop: 20,
    },
    setupTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
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
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
  });
};