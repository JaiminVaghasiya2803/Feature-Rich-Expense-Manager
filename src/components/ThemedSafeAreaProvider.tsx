import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../styles/colors';

interface ThemedSafeAreaProviderProps {
  children: React.ReactNode;
}

interface ThemedSafeAreaViewProps {
  children: React.ReactNode;
  statusBarColor?: string;
  bottomColor?: string;
  backgroundColor?: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  style?: any;
}

// Inner component that uses the safe area context
const ThemedSafeAreaContent: React.FC<ThemedSafeAreaViewProps> = ({
  children,
  statusBarColor,
  bottomColor,
  backgroundColor,
  edges = ['top', 'right', 'bottom', 'left'],
  style,
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const insets = useSafeAreaInsets();

  const mainBackgroundColor = backgroundColor || themeColors.backgroundDefault;
  const topAreaColor = statusBarColor || themeColors.surface;
  const bottomAreaColor = bottomColor || themeColors.surface;

  return (
    <View style={[styles.container, { backgroundColor: mainBackgroundColor }, style]}>
      {/* Status bar area background */}
      {Platform.OS === 'ios' && insets.top > 0 && edges.includes('top') && (
        <View 
          style={[
            styles.statusBarArea,
            { 
              height: insets.top,
              backgroundColor: topAreaColor,
            }
          ]} 
        />
      )}
      
      {/* Left safe area */}
      {Platform.OS === 'ios' && insets.left > 0 && edges.includes('left') && (
        <View 
          style={[
            styles.leftArea,
            { 
              width: insets.left,
              top: insets.top,
              bottom: insets.bottom,
              backgroundColor: mainBackgroundColor,
            }
          ]} 
        />
      )}
      
      {/* Right safe area */}
      {Platform.OS === 'ios' && insets.right > 0 && edges.includes('right') && (
        <View 
          style={[
            styles.rightArea,
            { 
              width: insets.right,
              top: insets.top,
              bottom: insets.bottom,
              backgroundColor: mainBackgroundColor,
            }
          ]} 
        />
      )}
      
      {/* Main content with SafeAreaView */}
      <SafeAreaView 
        style={[styles.safeAreaView, { backgroundColor: mainBackgroundColor }]}
        edges={edges}
      >
        {children}
      </SafeAreaView>
      
      {/* Bottom safe area (home indicator) */}
      {Platform.OS === 'ios' && insets.bottom > 0 && edges.includes('bottom') && (
        <View 
          style={[
            styles.bottomArea,
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

// Main provider component
const ThemedSafeAreaProvider: React.FC<ThemedSafeAreaProviderProps> = ({ children }) => {
  return (
    <SafeAreaProvider>
      {children}
    </SafeAreaProvider>
  );
};

// Export both the provider and the themed safe area view
export const ThemedSafeAreaView: React.FC<ThemedSafeAreaViewProps> = (props) => {
  return <ThemedSafeAreaContent {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  leftArea: {
    position: 'absolute',
    left: 0,
    zIndex: 1000,
  },
  rightArea: {
    position: 'absolute',
    right: 0,
    zIndex: 1000,
  },
  bottomArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  safeAreaView: {
    flex: 1,
    zIndex: 1,
  },
});

export default ThemedSafeAreaProvider;