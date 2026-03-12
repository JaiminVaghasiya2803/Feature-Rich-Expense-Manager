import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

import { initQueue } from './queue/mutationQueue';
import { store } from './store';
import { setOnlineStatus } from './store/networkSlice';
import { replayQueue } from './queue/replayQueue';
import QueryProvider from './providers/QueryProvider';
import { AppProvider } from './contexts/AppContext';
import { BillSplitProvider } from './contexts/BillSplitContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppContainer from './components/AppContainer';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
          <ThemeProvider>
            <AppProvider>
              <BillSplitProvider>
                <AppContainer />
              </BillSplitProvider>
            </AppProvider>
          </ThemeProvider>
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
