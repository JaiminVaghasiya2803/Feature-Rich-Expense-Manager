import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace AddBillExpenseProps {
  export type AddBillExpenseStyles = {
    container: ViewStyle;
    header: ViewStyle;
    headerTitle: TextStyle;
    content: ViewStyle;
    expenseCard: ViewStyle;
    input: ViewStyle;
    amountInputContainer: ViewStyle;
    amountLabel: TextStyle;
    amountInput: ViewStyle;
    currencySymbol: TextStyle;
    amountTextInput: TextStyle;
    paidByCard: ViewStyle;
    cardTitle: TextStyle;
    paidByList: ViewStyle;
    paidByItem: ViewStyle;
    activePaidBy: ViewStyle;
    memberAvatar: ViewStyle;
    memberInitial: TextStyle;
    memberName: TextStyle;
    activeMemberName: TextStyle;
    splitTypeCard: ViewStyle;
    splitTypeButtons: ViewStyle;
    splitTypeButton: ViewStyle;
    activeSplitType: ViewStyle;
    splitTypeText: TextStyle;
    activeSplitTypeText: TextStyle;
    splitCard: ViewStyle;
    splitHeader: ViewStyle;
    personSplitItem: ViewStyle;
    personSelector: ViewStyle;
    checkbox: ViewStyle;
    checkedBox: ViewStyle;
    personAvatar: ViewStyle;
    personInitial: TextStyle;
    personName: TextStyle;
    splitInputs: ViewStyle;
    inputContainer: ViewStyle;
    inputPrefix: TextStyle;
    inputSuffix: TextStyle;
    splitInput: TextStyle;
    equalAmount: ViewStyle;
    equalAmountText: TextStyle;
    splitSummary: ViewStyle;
    summaryText: TextStyle;
    errorText: TextStyle;
    footer: ViewStyle;
    saveButton: ViewStyle;
  };

  export type AddBillExpenseContext = {
    theme: ColorSchemeName;
  };
}