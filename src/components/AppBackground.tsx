import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

interface AppBackgroundProps {
  children: React.ReactNode;
  statusBarColor?: string;
  bottomColor?: string;
  backgroundColor?: string;
}

const AppBackground: React.FC<AppBackgroundProps> = ({
  children,
  statusBarColor,
  bottomColor,
  backgroundColor,
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const insets = useSafeAreaInsets();

  const mainBackgroundColor = backgroundColor || themeColors.backgroundDefault;
  const topAreaColor = statusBarColor || themeColors.surface;
  const bottomAreaColor = bottomColor || themeColors.surface;

  return (
    <View style={[styles.container, { backgroundColor: mainBackgroundColor }]}>
      {/* Status bar background for iOS */}
      {Platform.OS === 'ios' && (
        <View 
          style={[
            styles.statusBarBackground,
            { 
              height: insets.top,
              backgroundColor: topAreaColor,
            }
          ]} 
        />
      )}
      
      {/* Main content */}
      <View style={styles.content}>
        {children}
      </View>
      
      {/* Bottom safe area background for iOS (home indicator) */}
      {Platform.OS === 'ios' && (
        <View 
          style={[
            styles.bottomBackground,
            { 
              height: insets.bottom,
              backgroundColor: bottomAreaColor,
            }
          ]} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  bottomBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default AppBackground;