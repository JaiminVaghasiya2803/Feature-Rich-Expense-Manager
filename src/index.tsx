import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';

import { initQueue } from './queue/mutationQueue';
import { store } from './store';
import { setOnlineStatus } from './store/networkSlice';
import { replayQueue } from './queue/replayQueue';
import QueryProvider from './providers/QueryProvider';
import { AppProvider } from './contexts/AppContext';
import { BillSplitProvider } from './contexts/BillSplitContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CustomThemeProvider } from './contexts/CustomThemeContext';
import { SplashProvider } from './contexts/SplashContext';
import AppContainer from './components/AppContainer';
import FullScreenBackground from './components/FullScreenBackground';
import StatusBarManager from './components/StatusBarManager';

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
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryProvider>
          <ThemeProvider>
            <CustomThemeProvider>
              <StatusBarManager />
              <FullScreenBackground>
                <View style={styles.container}>
                  <SplashProvider>
                    <AppProvider>
                      <BillSplitProvider>
                        <AppContainer />
                      </BillSplitProvider>
                    </AppProvider>
                  </SplashProvider>
                </View>
              </FullScreenBackground>
            </CustomThemeProvider>
          </ThemeProvider>
        </QueryProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
