import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace SplashProps {
  export type SplashStyles = {
    container: ViewStyle;
    content: ViewStyle;
    logoContainer: ViewStyle;
    logo: ViewStyle;
    logoText: TextStyle;
    tagline: TextStyle;
    loadingContainer: ViewStyle;
    loadingText: TextStyle;
    footer: ViewStyle;
    footerText: TextStyle;
    brandContainer: ViewStyle;
    brandIcon: ViewStyle;
    brandText: TextStyle;
    subtitle: TextStyle;
  };

  export type SplashContext = {
    theme: ColorSchemeName;
  };
}