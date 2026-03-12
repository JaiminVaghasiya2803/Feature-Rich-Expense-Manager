import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace SettingsProps {
  export type SettingsStyles = {
    container: ViewStyle;
    scrollView: ViewStyle;
    header: ViewStyle;
    headerTitle: TextStyle;
    headerSubtitle: TextStyle;
    section: ViewStyle;
    sectionTitle: TextStyle;
    sectionCard: ViewStyle;
    settingItem: ViewStyle;
    settingIcon: ViewStyle;
    settingContent: ViewStyle;
    settingTitle: TextStyle;
    settingSubtitle: TextStyle;
    separator: ViewStyle;
    currencyCard: ViewStyle;
    currencyTitle: TextStyle;
    currencySubtitle: TextStyle;
  };

  export type SettingsContext = {
    theme: ColorSchemeName;
  };
}