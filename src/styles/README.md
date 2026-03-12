# Dynamic Styling System

A comprehensive styling system that provides theme-aware, type-safe, and performance-optimized styling for React Native applications.

## Overview

This styling system is based on the pattern you provided and offers:

- **Dynamic Theme Switching**: Automatic light/dark mode support
- **Type Safety**: Full TypeScript interfaces for all styles
- **Performance**: Memoized styles that only update when theme changes
- **Consistency**: Centralized color and design system
- **Maintainability**: Easy to update and extend

## Core Components

### 1. createUseStyles Hook

The foundation of the styling system that creates memoized style hooks.

```typescript
import { createUseStyles } from '../styles/createUseStyles';

const useStyles = createUseStyles(getStyles);
```

### 2. Theme Colors

Centralized color definitions for light and dark themes.

```typescript
import { getThemeColors } from '../styles/colors';

const themeColors = getThemeColors(theme);
```

### 3. Theme Context

Manages the current theme state and provides switching functionality.

```typescript
import { useTheme } from '../contexts/ThemeContext';

const { theme, isDark, toggleTheme } = useTheme();
```

## Implementation Pattern

### Step 1: Define Style Interfaces

Create TypeScript interfaces for your component styles:

```typescript
export namespace MyComponentProps {
  export type MyComponentStyles = {
    container: StyleProp<ViewStyle>;
    title: StyleProp<TextStyle>;
    button: StyleProp<ViewStyle>;
    buttonText: StyleProp<TextStyle>;
  };

  export type MyComponentContext = {
    theme: ColorSchemeName;
  };
}
```

### Step 2: Create Styles Function

Define a function that generates styles based on theme context:

```typescript
const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): MyComponentProps.MyComponentStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: themeColors.textPrimary,
      marginBottom: 16,
    },
    button: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: themeColors.textInverse,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  };
};
```

### Step 3: Create Style Hook

Use createUseStyles to create a memoized hook:

```typescript
const useStyles = createUseStyles(getStyles);
```

### Step 4: Use in Component

Apply the styles in your React component:

```typescript
const MyComponent = () => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Complete Example

Here's a full implementation following the pattern:

```typescript
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
import { createUseStyles } from '../styles/createUseStyles';
import { getThemeColors } from '../styles/colors';
import { useTheme } from '../contexts/ThemeContext';

// Style interfaces
export namespace ExampleComponentProps {
  export type ExampleComponentStyles = {
    container: StyleProp<ViewStyle>;
    header: StyleProp<ViewStyle>;
    title: StyleProp<TextStyle>;
    subtitle: StyleProp<TextStyle>;
    card: StyleProp<ViewStyle>;
    cardTitle: StyleProp<TextStyle>;
    cardContent: StyleProp<TextStyle>;
    button: StyleProp<ViewStyle>;
    buttonText: StyleProp<TextStyle>;
  };

  export type ExampleComponentContext = {
    theme: ColorSchemeName;
  };
}

// Styles function
const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): ExampleComponentProps.ExampleComponentStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    header: {
      padding: 24,
      backgroundColor: themeColors.surface,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: themeColors.textSecondary,
      textAlign: 'center',
    },
    card: {
      backgroundColor: themeColors.surface,
      margin: 16,
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    cardContent: {
      fontSize: 16,
      color: themeColors.textSecondary,
      lineHeight: 24,
    },
    button: {
      backgroundColor: themeColors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      margin: 16,
    },
    buttonText: {
      color: themeColors.textInverse,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  };
};

const useStyles = createUseStyles(getStyles);

const ExampleComponent = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = useStyles({ theme });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dynamic Styling</Text>
        <Text style={styles.subtitle}>Theme-aware component styling</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Theme</Text>
        <Text style={styles.cardContent}>
          This component automatically adapts to the current theme.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExampleComponent;
```

## Theme Colors

The system provides comprehensive color palettes for both light and dark themes:

### Light Theme Colors
- **Primary**: #6366F1 (Indigo)
- **Secondary**: #10B981 (Emerald)
- **Background**: #F8FAFC (Slate 50)
- **Surface**: #FFFFFF (White)
- **Text Primary**: #1E293B (Slate 800)
- **Text Secondary**: #64748B (Slate 500)

### Dark Theme Colors
- **Primary**: #818CF8 (Indigo 400)
- **Secondary**: #34D399 (Emerald 400)
- **Background**: #0F172A (Slate 900)
- **Surface**: #1E293B (Slate 800)
- **Text Primary**: #F1F5F9 (Slate 100)
- **Text Secondary**: #CBD5E1 (Slate 300)

## Available Color Properties

```typescript
interface ThemeColors {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  
  // Status colors
  success: string;
  danger: string;
  warning: string;
  info: string;
  
  // Background colors
  backgroundDefault: string;
  backgroundSecondary: string;
  surface: string;
  surfaceSecondary: string;
  surfaceElevated: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Border colors
  borderLight: string;
  borderMedium: string;
  borderDark: string;
  
  // Overlay colors
  overlay: string;
  overlayLight: string;
}
```

## Theme Context Usage

### Basic Theme Operations

```typescript
const { theme, isDark, toggleTheme, setTheme } = useTheme();

// Check current theme
console.log('Current theme:', theme); // 'light' | 'dark'
console.log('Is dark mode:', isDark); // boolean

// Toggle between themes
toggleTheme();

// Set specific theme
setTheme('dark');
setTheme('light');
```

### Theme Persistence

The theme preference is automatically saved to AsyncStorage and restored on app launch.

## Performance Considerations

### Memoization

The `createUseStyles` hook uses `React.useMemo` with `Object.values(context)` as dependencies, ensuring styles are only recalculated when the theme actually changes.

### Optimization Tips

1. **Keep context minimal**: Only pass necessary values to the styles function
2. **Use theme colors**: Always use `themeColors` instead of hardcoded colors
3. **Avoid inline styles**: Use the styling system for all component styles
4. **Batch updates**: Theme changes automatically trigger all components to update

## Migration Guide

### From Static Styles

**Before:**
```typescript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  text: {
    color: '#000000',
    fontSize: 16,
  },
});
```

**After:**
```typescript
const getStyles = ({ theme }: { theme: ColorSchemeName }) => {
  const themeColors = getThemeColors(theme);
  return {
    container: {
      backgroundColor: themeColors.surface,
      padding: 20,
    },
    text: {
      color: themeColors.textPrimary,
      fontSize: 16,
    },
  };
};

const useStyles = createUseStyles(getStyles);
```

### Integration Steps

1. **Install dependencies**: Ensure React Native and AsyncStorage are available
2. **Add providers**: Wrap your app with `ThemeProvider`
3. **Update components**: Convert existing styles to use the new system
4. **Test themes**: Verify both light and dark modes work correctly

## Best Practices

### Naming Conventions

- Use descriptive names for style properties
- Follow the namespace pattern: `ComponentNameProps.ComponentNameStyles`
- Keep context interfaces minimal and focused

### Color Usage

- Always use theme colors instead of hardcoded values
- Use semantic color names (primary, secondary, danger) over specific colors
- Consider accessibility and contrast ratios

### Performance

- Avoid complex calculations in style functions
- Use theme colors directly rather than deriving new colors
- Keep style objects flat when possible

### Maintenance

- Centralize common styles in shared functions
- Document custom color additions
- Test theme switching thoroughly
- Keep style interfaces up to date

This styling system provides a robust foundation for building theme-aware React Native applications with excellent developer experience and performance characteristics.