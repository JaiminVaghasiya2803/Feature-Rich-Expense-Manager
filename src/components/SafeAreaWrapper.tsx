import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  bottomBackgroundColor?: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  backgroundColor,
  statusBarBackgroundColor,
  bottomBackgroundColor,
  edges = ['top', 'right', 'bottom', 'left'],
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const insets = useSafeAreaInsets();

  const defaultBackgroundColor = backgroundColor || themeColors.backgroundDefault;
  const topBackgroundColor = statusBarBackgroundColor || themeColors.surface;
  const bottomBgColor = bottomBackgroundColor || themeColors.surface;

  return (
    <View style={[styles.container, { backgroundColor: defaultBackgroundColor }]}>
      {/* Top safe area background (status bar area) */}
      {Platform.OS === 'ios' && insets.top > 0 && edges.includes('top') && (
        <View 
          style={[
            styles.topSafeArea, 
            { 
              height: insets.top,
              backgroundColor: topBackgroundColor,
            }
          ]} 
        />
      )}
      
      {/* Main content area */}
      <SafeAreaView 
        style={[styles.safeArea, { backgroundColor: defaultBackgroundColor }]}
        edges={edges}
      >
        {children}
      </SafeAreaView>
      
      {/* Bottom safe area background (home indicator area) */}
      {Platform.OS === 'ios' && insets.bottom > 0 && edges.includes('bottom') && (
        <View 
          style={[
            styles.bottomSafeArea, 
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
  topSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
  },
  bottomSafeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default SafeAreaWrapper;