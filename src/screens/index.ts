// Export screens from their new folder structure
export { default as BillSplitHomeScreen } from './BillSplitHome/BillSplitHomeScreen';
export { default as CreateGroupScreen } from './CreateGroup/CreateGroupScreen';
export { default as AddBillExpenseScreen } from './AddBillExpense/AddBillExpenseScreen';
export { default as ExpenseListScreen } from './ExpenseList/ExpenseListScreen';
export { default as AddExpenseScreen } from './AddExpense/AddExpenseScreen';
export { default as SettingsScreen } from './Settings/SettingsScreen';
export { default as GroupsScreen } from './Groups/GroupsScreen';
export { default as AnalysisScreen } from './Analysis/AnalysisScreen';
export { default as AddGroupScreen } from './AddGroup/AddGroupScreen';

// Import and export the actual EditGroupScreen
export { default as EditGroupScreen } from './EditGroupScreen';
export { default as GroupDetailsScreen } from './GroupDetailsScreen';

// Placeholder exports for missing screens
export const EditExpenseScreen = () => null;
export const SplitExpensesScreen = () => null;