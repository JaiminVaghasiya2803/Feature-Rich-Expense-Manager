import { ColorSchemeName } from 'react-native';
import { getThemeColors } from '../../styles/colors';
import { SplashProps } from './interface';

export const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): SplashProps.SplashStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 48,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 30,
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: theme === 'dark' ? 0.4 : 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    logoText: {
      fontSize: 48,
      fontWeight: '700',
      color: themeColors.textInverse,
    },
    brandContainer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    brandIcon: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandText: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      color: themeColors.textPrimary,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
      color: themeColors.textSecondary,
      textAlign: 'center',
      marginTop: 8,
    },
    tagline: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 26,
      color: themeColors.textSecondary,
      textAlign: 'center',
      marginBottom: 64,
    },
    loadingContainer: {
      alignItems: 'center',
      marginTop: 48,
    },
    loadingText: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
      color: themeColors.textTertiary,
      marginTop: 16,
    },
    footer: {
      alignItems: 'center',
      paddingBottom: 48,
    },
    footerText: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
      color: themeColors.textTertiary,
      textAlign: 'center',
    },
  };
};