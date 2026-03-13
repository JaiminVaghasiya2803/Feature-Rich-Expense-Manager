import { StyleSheet } from 'react-native';
import { getThemeColors, ThemeColors } from '../../styles/colors';

export const getStyles = ({ theme, customTheme }: { theme: 'light' | 'dark'; customTheme?: Partial<ThemeColors> }) => {
  const colors = getThemeColors(theme, customTheme);
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    authContainer: {
      gap: 20,
    },
    authCard: {
      padding: 20,
    },
    authTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    authButton: {
      marginTop: 16,
    },
    errorText: {
      fontSize: 14,
      color: colors.error,
      textAlign: 'center',
      marginTop: 8,
    },
    biometricDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: 20,
      lineHeight: 20,
    },
    biometricButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: colors.primary + '10',
      borderWidth: 2,
      borderColor: colors.primary + '30',
      borderStyle: 'dashed',
    },
    biometricButtonText: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: '500',
      marginTop: 8,
    },
    footer: {
      marginTop: 40,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 12,
      color: colors.textTertiary,
      textAlign: 'center',
      lineHeight: 18,
    },
  });
};