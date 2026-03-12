import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import { getAppConfig, AppType } from '../config/appConfigs';

const AppContainer = () => {
  const [currentAppType] = useState<AppType>('expense-manager');
  const currentConfig = getAppConfig(currentAppType);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AppNavigator 
          tabs={currentConfig}
          initialRouteName={currentConfig[0]?.name}
          customTabBar={false}
          tabBarStyle="default"
        />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContainer;