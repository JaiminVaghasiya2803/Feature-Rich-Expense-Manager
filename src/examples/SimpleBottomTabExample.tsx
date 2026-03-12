import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabBar, { TabConfig } from '../components/navigation/BottomTabBar';

// Example screens
const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Home Screen</Text>
    <Text style={styles.subtitle}>Welcome to the home screen!</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Profile Screen</Text>
    <Text style={styles.subtitle}>Your profile information</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Settings Screen</Text>
    <Text style={styles.subtitle}>App settings and preferences</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Notifications</Text>
    <Text style={styles.subtitle}>You have 5 new notifications</Text>
  </View>
);

// Tab configuration
const simpleTabConfig: TabConfig[] = [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    icon: 'home',
  },
  {
    name: 'Notifications',
    component: NotificationsScreen,
    label: 'Notifications',
    icon: 'messageCircle',
    badge: 5, // Show notification count
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    label: 'Profile',
    icon: 'users',
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    label: 'Settings',
    icon: 'settings',
  },
];

const SimpleBottomTabExample = () => {
  return (
    <NavigationContainer>
      <BottomTabBar 
        tabs={simpleTabConfig}
        initialRouteName="Home"
        activeTintColor="#007AFF"
        inactiveTintColor="#8E8E93"
      />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SimpleBottomTabExample;