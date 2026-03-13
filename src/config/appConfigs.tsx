import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabConfig } from '../components/navigation/BottomTabBar';

// Import screens from organized structure
import {
  ExpenseListScreen,
  AddExpenseScreen,
  EditExpenseScreen,
  GroupsScreen,
  AddGroupScreen,
  EditGroupScreen,
  AnalysisScreen,
  SplitExpensesScreen,
  SettingsScreen,
  BillSplitHomeScreen,
  CreateGroupScreen,
  AddBillExpenseScreen,
  GroupDetailsScreen,
} from '../screens';

import ThemeSettingsScreen from '../screens/ThemeSettings/ThemeSettingsScreen';

const Stack = createNativeStackNavigator();

// Stack Navigators for each tab
const ExpenseManagerStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ExpenseList" component={ExpenseListScreen} />
    <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
    <Stack.Screen name="EditExpense" component={EditExpenseScreen} />
  </Stack.Navigator>
);

const GroupsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Groups" component={GroupsScreen} />
    <Stack.Screen name="AddGroup" component={AddGroupScreen} />
    <Stack.Screen name="EditGroup" component={EditGroupScreen} />
  </Stack.Navigator>
);

const AnalysisStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Analysis" component={AnalysisScreen} />
  </Stack.Navigator>
);

const SplitExpensesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BillSplitHome" component={BillSplitHomeScreen} />
    <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
    <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
    <Stack.Screen name="AddBillExpense" component={AddBillExpenseScreen} />
  </Stack.Navigator>
);

// Settings Stack
const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="ThemeSettings" component={ThemeSettingsScreen} />
  </Stack.Navigator>
);

// App Configurations
export const expenseManagerConfig: TabConfig[] = [
  {
    name: 'ExpenseManager',
    component: ExpenseManagerStack,
    label: 'Expenses',
    icon: 'receipt',
  },
  {
    name: 'Groups',
    component: GroupsStack,
    label: 'Groups',
    icon: 'users',
  },
  {
    name: 'Analysis',
    component: AnalysisStack,
    label: 'Analysis',
    icon: 'pieChart',
  },
  {
    name: 'SplitExpenses',
    component: SplitExpensesStack,
    label: 'Split Bills',
    icon: 'split',
  },
  {
    name: 'Settings',
    component: SettingsStack,
    label: 'Settings',
    icon: 'settings',
  },
];

// Example: E-commerce App Configuration
export const ecommerceConfig: TabConfig[] = [
  {
    name: 'Home',
    component: ExpenseListScreen, // Placeholder - replace with actual screens
    label: 'Home',
    icon: 'home',
  },
  {
    name: 'Shop',
    component: GroupsScreen, // Placeholder
    label: 'Shop',
    icon: 'shoppingCart',
    badge: 3, // Example badge
  },
  {
    name: 'Orders',
    component: AnalysisScreen, // Placeholder
    label: 'Orders',
    icon: 'receipt',
  },
  {
    name: 'Profile',
    component: SplitExpensesScreen, // Placeholder
    label: 'Profile',
    icon: 'users',
  },
  {
    name: 'Settings',
    component: SettingsStack,
    label: 'Settings',
    icon: 'settings',
  },
];

// Example: Social App Configuration
export const socialAppConfig: TabConfig[] = [
  {
    name: 'Feed',
    component: ExpenseListScreen, // Placeholder
    label: 'Feed',
    icon: 'home',
  },
  {
    name: 'Messages',
    component: GroupsScreen, // Placeholder
    label: 'Messages',
    icon: 'messageCircle',
    badge: 5, // Example badge for unread messages
  },
  {
    name: 'Calendar',
    component: AnalysisScreen, // Placeholder
    label: 'Events',
    icon: 'calendar',
  },
  {
    name: 'Profile',
    component: SplitExpensesScreen, // Placeholder
    label: 'Profile',
    icon: 'users',
  },
  {
    name: 'Settings',
    component: SettingsStack,
    label: 'Settings',
    icon: 'settings',
  },
];

// Example: Productivity App Configuration
export const productivityConfig: TabConfig[] = [
  {
    name: 'Dashboard',
    component: ExpenseListScreen, // Placeholder
    label: 'Dashboard',
    icon: 'home',
  },
  {
    name: 'Tasks',
    component: GroupsScreen, // Placeholder
    label: 'Tasks',
    icon: 'calculator',
    badge: 12, // Example badge for pending tasks
  },
  {
    name: 'Analytics',
    component: AnalysisScreen, // Placeholder
    label: 'Analytics',
    icon: 'pieChart',
  },
  {
    name: 'Settings',
    component: SettingsStack,
    label: 'Settings',
    icon: 'settings',
  },
];

export type AppType = 'expense-manager' | 'ecommerce' | 'social' | 'productivity';

export const getAppConfig = (appType: AppType): TabConfig[] => {
  switch (appType) {
    case 'expense-manager':
      return expenseManagerConfig;
    case 'ecommerce':
      return ecommerceConfig;
    case 'social':
      return socialAppConfig;
    case 'productivity':
      return productivityConfig;
    default:
      return expenseManagerConfig;
  }
};