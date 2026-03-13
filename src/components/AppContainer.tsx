import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import { getAppConfig, AppType } from '../config/appConfigs';
import { useSplash } from '../contexts/SplashContext';
import { SplashScreen } from '../screens';

const AppContainer = () => {
  const [currentAppType] = useState<AppType>('expense-manager');
  const currentConfig = getAppConfig(currentAppType);
  const { showSplash, finishSplash } = useSplash();

  if (showSplash) {
    return <SplashScreen onFinish={finishSplash} />;
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;