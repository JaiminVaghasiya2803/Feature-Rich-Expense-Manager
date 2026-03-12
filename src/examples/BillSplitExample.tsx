import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BillSplitProvider } from '../contexts/BillSplitContext';
import AppNavigator from '../components/navigation/AppNavigator';
import { TabConfig } from '../components/navigation/BottomTabBar';

// Import bill splitting screens
import BillSplitHomeScreen from '../screens/BillSplitHomeScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import AddBillExpenseScreen from '../screens/AddBillExpenseScreen';
import GroupDetailsScreen from '../screens/GroupDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Create stack navigators for each tab
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const BillSplitStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="BillSplitHome" component={BillSplitHomeScreen} />
    <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
    <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
    <Stack.Screen name="AddBillExpense" component={AddBillExpenseScreen} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

// Tab configuration for bill splitting app
const billSplitTabConfig: TabConfig[] = [
  {
    name: 'BillSplit',
    component: BillSplitStack,
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

const BillSplitExample = () => {
  return (
    <BillSplitProvider>
      <NavigationContainer>
        <AppNavigator 
          tabs={billSplitTabConfig}
          initialRouteName="BillSplit"
          customTabBar={false}
          tabBarStyle="default"
        />
      </NavigationContainer>
    </BillSplitProvider>
  );
};

export default BillSplitExample;