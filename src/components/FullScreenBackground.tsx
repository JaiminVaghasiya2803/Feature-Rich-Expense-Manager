import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useCustomTheme } from '../contexts/CustomThemeContext';
import { getThemeColors } from '../styles/colors';

interface FullScreenBackgroundProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  bottomBackgroundColor?: string;
}

const FullScreenBackground: React.FC<FullScreenBackgroundProps> = ({
  children,
  backgroundColor,
  statusBarBackgroundColor,
  bottomBackgroundColor,
}) => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const insets = useSafeAreaInsets();

  const mainBgColor = backgroundColor || themeColors.backgroundDefault;
  const statusBarBgColor = statusBarBackgroundColor || themeColors.surface;
  const bottomBgColor = bottomBackgroundColor || themeColors.surface;

  return (
    <View style={[styles.container, { backgroundColor: mainBgColor }]}>
      {/* Status bar background overlay */}
      {Platform.OS === 'ios' && insets.top > 0 && (
        <View 
          style={[
            styles.statusBarOverlay,
            { 
              height: insets.top,
              backgroundColor: statusBarBgColor,
            }
          ]} 
        />
      )}
      
      {/* Main content */}
      {children}
      
      {/* Bottom safe area overlay (home indicator area) */}
      {Platform.OS === 'ios' && insets.bottom > 0 && (
        <View 
          style={[
            styles.bottomOverlay,
            { 
              height: insets.bottom,
              backgroundColor: bottomBgColor,
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
  statusBarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
});

export default FullScreenBackground;