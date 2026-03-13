import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import { getAppConfig, AppType } from '../config/appConfigs';
import { useSplash } from '../contexts/SplashContext';
import { useSecurity } from '../contexts/SecurityContext';
import { SplashScreen } from '../screens';
import AppLockScreen from '../screens/AppLock/AppLockScreen';
import AppLockDebugPanel from './AppLockDebugPanel';

const AppContainer = () => {
  const [currentAppType] = useState<AppType>('expense-manager');
  const currentConfig = getAppConfig(currentAppType);
  const { showSplash, finishSplash } = useSplash();
  const { isLocked, isEnabled } = useSecurity();

  if (__DEV__) {
    console.log(
      '🏠 AppContainer render - showSplash:',
      showSplash,
      'isEnabled:',
      isEnabled,
      'isLocked:',
      isLocked
    );
  }
  if (showSplash) {
    return <SplashScreen onFinish={finishSplash} />;
  }

  if (isEnabled && isLocked) {
    return <AppLockScreen />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <NavigationContainer>
        <AppNavigator
          tabs={currentConfig}
          initialRouteName={currentConfig[0]?.name}
          customTabBar={false}
          tabBarStyle="default"
        />
      </NavigationContainer>
      {__DEV__ && <AppLockDebugPanel />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;
