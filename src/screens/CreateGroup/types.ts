import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace CreateGroupProps {
  export type CreateGroupStyles = {
    container: ViewStyle;
    header: ViewStyle;
    headerTitle: TextStyle;
    content: ViewStyle;
    groupInfoCard: ViewStyle;
    input: ViewStyle;
    colorCard: ViewStyle;
    currencyCard: ViewStyle;
    membersCard: ViewStyle;
    previewCard: ViewStyle;
    sectionTitle: TextStyle;
    colorGrid: ViewStyle;
    colorOption: ViewStyle;
    selectedColor: ViewStyle;
    currencyList: ViewStyle;
    currencyOption: ViewStyle;
    selectedCurrency: ViewStyle;
    currencySymbol: TextStyle;
    currencyCode: TextStyle;
    selectedCurrencyText: TextStyle;
    membersList: ViewStyle;
    memberItem: ViewStyle;
    memberAvatar: ViewStyle;
    memberInitial: TextStyle;
    memberName: TextStyle;
    addMemberSection: ViewStyle;
    addMemberInput: ViewStyle;
    memberInput: TextStyle;
    addButton: ViewStyle;
    groupPreview: ViewStyle;
    groupColorIndicator: ViewStyle;
    groupPreviewInfo: ViewStyle;
    previewName: TextStyle;
    previewDescription: TextStyle;
    previewStats: ViewStyle;
    previewMembers: TextStyle;
    footer: ViewStyle;
    createButton: ViewStyle;
  };

  export type CreateGroupContext = {
    theme: ColorSchemeName;
  };
}

export interface CreateGroupScreenProps {
  navigation: unknown;
}