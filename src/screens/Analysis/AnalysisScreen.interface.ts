import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace AnalysisProps {
  export type AnalysisStyles = {
    container: ViewStyle;
    header: ViewStyle;
    headerTitle: TextStyle;
    headerSubtitle: TextStyle;
    scrollView: ViewStyle;
    statsGrid: ViewStyle;
    statCard: ViewStyle;
    statHeader: ViewStyle;
    statIcon: ViewStyle;
    trendBadge: ViewStyle;
    trendText: TextStyle;
    statValue: TextStyle;
    statTitle: TextStyle;
    statSubtitle: TextStyle;
    section: ViewStyle;
    sectionHeader: ViewStyle;
    sectionTitle: TextStyle;
    categoryCard: ViewStyle;
    categoryItem: ViewStyle;
    categoryLeft: ViewStyle;
    categoryIcon: ViewStyle;
    categoryEmoji: TextStyle;
    categoryInfo: ViewStyle;
    categoryName: TextStyle;
    categoryCount: TextStyle;
    categoryRight: ViewStyle;
    categoryAmount: TextStyle;
    categoryPercentage: TextStyle;
    trendCard: ViewStyle;
    trendChart: ViewStyle;
    trendBar: ViewStyle;
    barContainer: ViewStyle;
    bar: ViewStyle;
    barLabel: TextStyle;
    barValue: TextStyle;
    emptyState: ViewStyle;
    emptyTitle: TextStyle;
    emptySubtitle: TextStyle;
  };

  export type AnalysisContext = {
    theme: ColorSchemeName;
  };
}