import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ColorSchemeName } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { createUseStyles } from '../styles/createUseStyles';
import { getThemeColors } from '../styles/colors';
import { useTheme } from '../contexts/ThemeContext';

// Style interfaces following the pattern
export namespace DynamicStylingProps {
  export type DynamicStylingStyles = {
    container: StyleProp<ViewStyle>;
    header: StyleProp<ViewStyle>;
    title: StyleProp<TextStyle>;
    subtitle: StyleProp<TextStyle>;
    themeToggle: StyleProp<ViewStyle>;
    toggleButton: StyleProp<ViewStyle>;
    toggleText: StyleProp<TextStyle>;
    content: StyleProp<ViewStyle>;
    card: StyleProp<ViewStyle>;
    cardTitle: StyleProp<TextStyle>;
    cardContent: StyleProp<TextStyle>;
  };

  export type DynamicStylingContext = {
    theme: ColorSchemeName;
  };
}

// Styles function
const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): DynamicStylingProps.DynamicStylingStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    header: {
      padding: 24,
      paddingTop: 48,
      backgroundColor: themeColors.surface,
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: themeColors.textSecondary,
      textAlign: 'center',
    },
    themeToggle: {
      marginTop: 24,
    },
    toggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 25,
      gap: 8,
    },
    toggleText: {
      color: themeColors.textInverse,
      fontSize: 16,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      padding: 24,
    },
    card: {
      backgroundColor: themeColors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    cardContent: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      color: themeColors.textSecondary,
    },
  };
};

const useStyles = createUseStyles(getStyles);

const DynamicStylingExample = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dynamic Styling</Text>
        <Text style={styles.subtitle}>
          This example demonstrates the dynamic styling system with theme switching
        </Text>
        
        <View style={styles.themeToggle}>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
            {isDark ? (
              <Sun size={20} color={themeColors.textInverse} />
            ) : (
              <Moon size={20} color={themeColors.textInverse} />
            )}
            <Text style={styles.toggleText}>
              Switch to {isDark ? 'Light' : 'Dark'} Mode
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Theme</Text>
          <Text style={styles.cardContent}>
            You are currently using the {isDark ? 'dark' : 'light'} theme. 
            The styles automatically adapt to provide the best visual experience.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dynamic Colors</Text>
          <Text style={styles.cardContent}>
            Primary: {themeColors.primary}{'\n'}
            Background: {themeColors.backgroundDefault}{'\n'}
            Text: {themeColors.textPrimary}{'\n'}
            Surface: {themeColors.surface}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>How It Works</Text>
          <Text style={styles.cardContent}>
            1. Define style interfaces with StyleProp types{'\n'}
            2. Create a getStyles function that takes theme context{'\n'}
            3. Use createUseStyles hook to memoize styles{'\n'}
            4. Apply styles with automatic theme switching
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Benefits</Text>
          <Text style={styles.cardContent}>
            • Automatic theme switching{'\n'}
            • Type-safe styling{'\n'}
            • Performance optimized with useMemo{'\n'}
            • Consistent design system{'\n'}
            • Easy maintenance and updates
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DynamicStylingExample;