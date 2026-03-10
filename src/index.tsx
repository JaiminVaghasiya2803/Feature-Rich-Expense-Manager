import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initQueue } from './queue/mutationQueue';
import { store } from './store';
import { setOnlineStatus } from './store/networkSlice';
import { replayQueue } from './queue/replayQueue';
import QueryProvider from './providers/QueryProvider';

import ExpenseListScreen from './screens/ExpenseListScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import EditExpenseScreen from './screens/EditExpenseScreen';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const handleConnectivityChange = (isOnline: boolean) => {
      store.dispatch(setOnlineStatus(isOnline));
      if (isOnline) {
        replayQueue();
      }
    };

    // Load persisted queue on app start
    initQueue().then(() => {
      // Check initial network state
      NetInfo.fetch().then(state => {
        handleConnectivityChange(!!state.isConnected);
      });
    });

    // Listen for network changes
    const unsubscribe = NetInfo.addEventListener(state => {
      handleConnectivityChange(!!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <QueryProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="ExpenseList"
                component={ExpenseListScreen}
                options={{ title: 'Expense Tracker' }}
              />
              <Stack.Screen
                name="AddExpense"
                component={AddExpenseScreen}
                options={{ title: 'Add Expense' }}
              />
              <Stack.Screen
                name="EditExpense"
                component={EditExpenseScreen}
                options={{ title: 'Edit Expense' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryProvider>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
