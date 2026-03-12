import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace GroupsProps {
  export type GroupsStyles = {
    container: ViewStyle;
    header: ViewStyle;
    headerContent: ViewStyle;
    headerTitle: TextStyle;
    headerSubtitle: TextStyle;
    refreshButton: ViewStyle;
    refreshText: TextStyle;
    statsContainer: ViewStyle;
    statCard: ViewStyle;
    statHeader: ViewStyle;
    statLabel: TextStyle;
    statValue: TextStyle;
    searchContainer: ViewStyle;
    searchInput: ViewStyle;
    groupsList: ViewStyle;
    groupCard: ViewStyle;
    groupHeader: ViewStyle;
    groupColorIndicator: ViewStyle;
    groupInfo: ViewStyle;
    groupName: TextStyle;
    groupDescription: TextStyle;
    groupStats: ViewStyle;
    groupAmount: TextStyle;
    groupExpenseCount: TextStyle;
    groupFooter: ViewStyle;
    groupMembers: ViewStyle;
    memberCount: TextStyle;
    groupDate: ViewStyle;
    dateText: TextStyle;
    emptyState: ViewStyle;
    emptyTitle: TextStyle;
    emptySubtitle: TextStyle;
    createButton: ViewStyle;
    fab: ViewStyle;
  };

  export type GroupsContext = {
    theme: ColorSchemeName;
  };
}