import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace ExpenseListProps {
  export type ExpenseListStyles = {
    container: ViewStyle;
    scrollView: ViewStyle;
    scrollContent: ViewStyle;
    header: ViewStyle;
    headerContent: ViewStyle;
    headerLeft: ViewStyle;
    headerButtons: ViewStyle;
    analysisButton: ViewStyle;
    analysisButtonText: TextStyle;
    groupsButton: ViewStyle;
    groupsButtonText: TextStyle;
    greeting: TextStyle;
    subtitle: TextStyle;
    statsContainer: ViewStyle;
    statCard: ViewStyle;
    statHeader: ViewStyle;
    statLabel: TextStyle;
    statValue: TextStyle;
    statSubtext: TextStyle;
    listContainer: ViewStyle;
    listHeader: ViewStyle;
    listTitleContainer: ViewStyle;
    listTitle: TextStyle;
    expenseCount: ViewStyle;
    countText: TextStyle;
    fab: ViewStyle;
  };

  export type ExpenseListContext = {
    theme: ColorSchemeName;
  };
}