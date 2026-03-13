import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace AddExpenseProps {
  export type AddExpenseStyles = {
    container: ViewStyle;
    scrollView: ViewStyle;
    formCard: ViewStyle;
    groupSection: ViewStyle;
    sectionLabel: TextStyle;
    groupGrid: ViewStyle;
    groupItem: ViewStyle;
    selectedGroup: ViewStyle;
    groupColorIndicator: ViewStyle;
    groupText: TextStyle;
    selectedGroupText: TextStyle;
    groupDescription: TextStyle;
    selectedGroupDescription: TextStyle;
    noGroupsMessage: ViewStyle;
    noGroupsText: TextStyle;
    createGroupButton: ViewStyle;
    createGroupButtonText: TextStyle;
    submitButton: ViewStyle;
  };

  export type AddExpenseContext = {
    theme: ColorSchemeName;
  };
}