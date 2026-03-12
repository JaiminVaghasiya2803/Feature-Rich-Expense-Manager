# Screen Architecture - Organized Structure

This document outlines the new organized screen architecture where each screen has its own folder containing the screen component, styles, and type definitions.

## 📁 Folder Structure

```
src/screens/
├── BillSplitHome/
│   ├── BillSplitHomeScreen.tsx          # Main screen component
│   ├── BillSplitHomeScreen.styles.ts    # Styles and useStyles hook
│   └── BillSplitHomeScreen.types.ts     # TypeScript interfaces
├── CreateGroup/
│   ├── CreateGroupScreen.tsx
│   ├── CreateGroupScreen.styles.ts
│   └── CreateGroupScreen.types.ts
├── AddBillExpense/
│   ├── AddBillExpenseScreen.tsx
│   ├── AddBillExpenseScreen.styles.ts
│   └── AddBillExpenseScreen.types.ts
├── GroupDetails/
│   ├── GroupDetailsScreen.tsx
│   ├── GroupDetailsScreen.styles.ts
│   └── GroupDetailsScreen.types.ts
└── README.md                            # This documentation
```

## 🎯 Architecture Benefits

### 1. **Separation of Concerns**
- **Screen Component**: Pure UI logic and component structure
- **Styles**: All styling logic and theme-aware styles
- **Types**: TypeScript interfaces and type definitions

### 2. **Maintainability**
- Easy to locate and modify specific aspects of a screen
- Clear separation makes debugging easier
- Consistent structure across all screens

### 3. **Reusability**
- Styles can be easily shared or extended
- Type definitions can be imported by other components
- Clear interfaces for component props

### 4. **Team Collaboration**
- Different team members can work on styles vs logic
- Clear file naming conventions
- Consistent patterns across the codebase

## 📋 File Conventions

### Screen Component (.tsx)
```typescript
// src/screens/ScreenName/ScreenNameScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';
import { ScreenNameScreenProps } from './ScreenNameScreen.types';
import { useScreenNameStyles } from './ScreenNameScreen.styles';

const ScreenNameScreen: React.FC<ScreenNameScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useScreenNameStyles({ theme });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen Content</Text>
    </View>
  );
};

export default ScreenNameScreen;
```

### Types File (.types.ts)
```typescript
// src/screens/ScreenName/ScreenNameScreen.types.ts
import { ViewStyle, TextStyle } from 'react-native';
import { ColorSchemeName } from 'react-native';

export namespace ScreenNameProps {
  export type ScreenNameStyles = {
    container: ViewStyle;
    title: TextStyle;
    // ... other styles
  };

  export type ScreenNameContext = {
    theme: ColorSchemeName;
  };
}

export interface ScreenNameScreenProps {
  navigation: any;
  // ... other props
}
```

### Styles File (.styles.ts)
```typescript
// src/screens/ScreenName/ScreenNameScreen.styles.ts
import { ColorSchemeName } from 'react-native';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { ScreenNameProps } from './ScreenNameScreen.types';

const getStyles = ({
  theme,
}: {
  theme: ColorSchemeName;
}): ScreenNameProps.ScreenNameStyles => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      flex: 1,
      backgroundColor: themeColors.backgroundDefault,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: themeColors.textPrimary,
    },
    // ... other styles
  };
};

export const useScreenNameStyles = createUseStyles(getStyles);
```

## 🔧 Implementation Details

### Dynamic Styling Integration
Each screen follows the dynamic styling pattern:

1. **Theme Context**: Uses `useTheme()` hook for current theme
2. **Theme Colors**: Gets colors via `getThemeColors(theme)`
3. **Memoized Styles**: Uses `createUseStyles` for performance
4. **Type Safety**: Full TypeScript support for all styles

### Import Patterns
```typescript
// In navigation/config files
import ScreenNameScreen from '../screens/ScreenName/ScreenNameScreen';

// In other components (if needed)
import { ScreenNameScreenProps } from '../screens/ScreenName/ScreenNameScreen.types';
import { useScreenNameStyles } from '../screens/ScreenName/ScreenNameScreen.styles';
```

## 📱 Implemented Screens

### 1. BillSplitHomeScreen
- **Purpose**: Main dashboard for bill splitting app
- **Features**: Group listing, statistics, navigation
- **Styles**: 17 style properties with theme support
- **Types**: Navigation props and style interfaces

### 2. CreateGroupScreen
- **Purpose**: Create new expense groups
- **Features**: Group info, member management, color/currency selection
- **Styles**: 25+ style properties for complex UI
- **Types**: Form state and member interfaces

### 3. AddBillExpenseScreen
- **Purpose**: Add expenses with advanced splitting
- **Features**: Equal/percentage/amount splits, member selection
- **Styles**: 30+ style properties for complex forms
- **Types**: Split logic and calculation interfaces

### 4. GroupDetailsScreen (Planned)
- **Purpose**: View group expenses, balances, settlements
- **Features**: Expense history, balance tracking, settlement recommendations
- **Styles**: Tabbed interface with multiple views
- **Types**: Expense and balance display interfaces

## 🚀 Benefits in Practice

### Development Workflow
1. **Create Folder**: `mkdir src/screens/NewScreen`
2. **Copy Template**: Use existing screen as template
3. **Update Types**: Define interfaces in `.types.ts`
4. **Style First**: Create styles in `.styles.ts`
5. **Build Component**: Implement logic in `.tsx`

### Maintenance Workflow
1. **Style Changes**: Edit only `.styles.ts`
2. **Type Updates**: Modify only `.types.ts`
3. **Logic Changes**: Focus on `.tsx` file
4. **Clear Separation**: No mixed concerns

### Testing Benefits
- **Unit Tests**: Test styles, types, and logic separately
- **Style Tests**: Verify theme switching works correctly
- **Type Tests**: Ensure TypeScript compliance
- **Component Tests**: Focus on UI behavior

## 🔄 Migration Guide

### From Old Structure
```typescript
// Old way (single file)
const styles = StyleSheet.create({
  container: { flex: 1 }
});

// New way (organized)
// 1. Move styles to ScreenName.styles.ts
// 2. Create types in ScreenName.types.ts  
// 3. Update imports in ScreenName.tsx
```

### Update Navigation
```typescript
// Update import paths in navigation files
import ScreenName from '../screens/ScreenName/ScreenNameScreen';
```

## 📈 Future Enhancements

### Planned Improvements
1. **Shared Components**: Extract common UI patterns
2. **Style Themes**: Additional theme variations
3. **Component Library**: Reusable screen components
4. **Testing Suite**: Comprehensive test coverage

### Scalability
- **Easy Addition**: New screens follow same pattern
- **Consistent Structure**: Predictable file organization
- **Team Onboarding**: Clear conventions for new developers
- **Code Reviews**: Focused reviews on specific aspects

This organized structure provides a solid foundation for building and maintaining complex React Native screens with excellent developer experience and code organization.