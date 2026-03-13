import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export type BillSplitHomeStyles = {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
  statsContainer: ViewStyle;
  statCard: ViewStyle;
  statValue: TextStyle;
  statLabel: TextStyle;
  groupsSection: ViewStyle;
  sectionHeader: ViewStyle;
  sectionTitle: TextStyle;
  groupsList: ViewStyle;
  groupCard: ViewStyle;
  groupHeader: ViewStyle;
  groupColorIndicator: ViewStyle;
  groupInfo: ViewStyle;
  groupName: TextStyle;
  groupDescription: TextStyle;
  groupStats: ViewStyle;
  groupAmount: TextStyle;
  groupMembers: ViewStyle;
  groupMembersText: TextStyle;
  membersList: TextStyle;
  emptyState: ViewStyle;
  emptyTitle: TextStyle;
  emptySubtitle: TextStyle;
  createButton: ViewStyle;
  fab: ViewStyle;
};

export type BillSplitHomeContext = {
  theme: ColorSchemeName;
};