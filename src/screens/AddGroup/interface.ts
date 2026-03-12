import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace AddGroupProps {
  export type AddGroupStyles = {
    container: ViewStyle;
    content: ViewStyle;
    groupInfoCard: ViewStyle;
    input: ViewStyle;
    colorCard: ViewStyle;
    membersCard: ViewStyle;
    previewCard: ViewStyle;
    sectionTitle: TextStyle;
    sectionSubtitle: TextStyle;
    colorGrid: ViewStyle;
    colorOption: ViewStyle;
    selectedColor: ViewStyle;
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

  export type AddGroupContext = {
    theme: ColorSchemeName;
  };
}