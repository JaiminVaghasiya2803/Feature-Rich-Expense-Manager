import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Settings } from 'lucide-react-native';

import { theme } from '../constants/theme';
import AppNavigator from './navigation/AppNavigator';
import { getAppConfig, AppType } from '../config/appConfigs';

const AppContainer = () => {
  const [currentAppType, setCurrentAppType] = useState<AppType>('expense-manager');
  const [showAppSwitcher, setShowAppSwitcher] = useState(false);
  const [tabBarStyle, setTabBarStyle] = useState<'default' | 'rounded' | 'floating'>('default');
  const [useCustomTabBar, setUseCustomTabBar] = useState(false);

  const appTypes: { type: AppType; label: string }[] = [
    { type: 'expense-manager', label: 'Expense Manager' },
    { type: 'ecommerce', label: 'E-Commerce' },
    { type: 'social', label: 'Social App' },
    { type: 'productivity', label: 'Productivity' },
  ];

  const tabBarStyles = [
    { style: 'default' as const, label: 'Default' },
    { style: 'rounded' as const, label: 'Rounded' },
    { style: 'floating' as const, label: 'Floating' },
  ];

  const currentConfig = getAppConfig(currentAppType);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AppNavigator 
          tabs={currentConfig}
          initialRouteName={currentConfig[0]?.name}
          customTabBar={useCustomTabBar}
          tabBarStyle={tabBarStyle}
        />
      </NavigationContainer>

      {/* App Type Switcher Button */}
      <TouchableOpacity
        style={styles.appSwitcherButton}
        onPress={() => setShowAppSwitcher(!showAppSwitcher)}
        activeOpacity={0.8}
      >
        <Settings size={20} color={theme.colors.text.inverse} />
      </TouchableOpacity>

      {/* App Type Switcher Dropdown */}
      {showAppSwitcher && (
        <View style={styles.appSwitcherDropdown}>
          <Text style={styles.dropdownTitle}>App Configuration</Text>
          
          <Text style={styles.sectionTitle}>App Type</Text>
          {appTypes.map((app) => (
            <TouchableOpacity
              key={app.type}
              style={[
                styles.appOption,
                currentAppType === app.type && styles.activeAppOption
              ]}
              onPress={() => {
                setCurrentAppType(app.type);
              }}
            >
              <Text style={[
                styles.appOptionText,
                currentAppType === app.type && styles.activeAppOptionText
              ]}>
                {app.label}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.sectionTitle}>Tab Bar Style</Text>
          {tabBarStyles.map((style) => (
            <TouchableOpacity
              key={style.style}
              style={[
                styles.appOption,
                tabBarStyle === style.style && styles.activeAppOption
              ]}
              onPress={() => {
                setTabBarStyle(style.style);
              }}
            >
              <Text style={[
                styles.appOptionText,
                tabBarStyle === style.style && styles.activeAppOptionText
              ]}>
                {style.label}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.appOption,
              useCustomTabBar && styles.activeAppOption
            ]}
            onPress={() => {
              setUseCustomTabBar(!useCustomTabBar);
            }}
          >
            <Text style={[
              styles.appOptionText,
              useCustomTabBar && styles.activeAppOptionText
            ]}>
              {useCustomTabBar ? '✓ Custom Tab Bar' : 'Use Custom Tab Bar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowAppSwitcher(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appSwitcherButton: {
    position: 'absolute',
    top: 60,
    right: theme.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
    zIndex: 1000,
  },
  appSwitcherDropdown: {
    position: 'absolute',
    top: 110,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    minWidth: 200,
    maxHeight: 500,
    ...theme.shadows.lg,
    zIndex: 999,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  appOption: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginVertical: 2,
  },
  activeAppOption: {
    backgroundColor: theme.colors.primary,
  },
  appOptionText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  activeAppOptionText: {
    color: theme.colors.text.inverse,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.text.inverse,
    fontWeight: '500',
  },
});

export default AppContainer;