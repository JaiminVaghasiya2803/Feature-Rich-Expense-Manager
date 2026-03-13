# Enhanced Theme System - Categorized Quick Themes

The app now includes 17+ comprehensive quick themes organized into Light and Dark categories, with each theme changing all app colors including background, header, footer, and text colors.

## Theme Categories

### Light Themes (9 themes)
Perfect for daytime use with bright backgrounds and dark text:

1. **Ocean Blue** - Cool blue tones with light backgrounds
2. **Forest Green** - Natural green palette with fresh feel  
3. **Sunset Orange** - Warm orange and amber colors
4. **Royal Purple** - Rich purple with elegant styling
5. **Rose Pink** - Soft pink with romantic touch
6. **Golden Amber** - Warm golden tones inspired by honey
7. **Emerald Mint** - Fresh mint green with clean feel
8. **Saffron Spice** - Inspired by Indian saffron and spices
9. **Peacock Blue** - Traditional peacock colors

### Dark Themes (8 themes)
Designed for low-light environments with dark backgrounds and light text:

1. **Midnight Dark** - Deep dark theme for night usage
2. **Crimson Red** - Bold red theme with strong presence
3. **Steel Gray** - Professional gray with modern look
4. **Deep Forest** - Dark forest green with nature vibes
5. **Ocean Depths** - Deep blue ocean-inspired theme
6. **Purple Haze** - Rich purple for elegant dark mode
7. **Amber Night** - Warm amber tones for dark environments
8. **Rose Shadow** - Soft rose colors in dark mode

## Features

### Smart Category Selection
- Automatically selects appropriate category based on current theme mode
- Light themes shown when in light mode, dark themes when in dark mode
- Easy switching between categories with theme count indicators

### Category Descriptions
- Clear explanations of when to use each category
- Visual indicators (Sun/Moon icons) for easy identification
- Theme count display for each category

### Complete Color Coverage
Each theme includes comprehensive color definitions for:
- **Primary Colors** (5 variations)
- **Background Colors** (5 types including surfaces and elevated elements)
- **Text Colors** (4 hierarchy levels with proper contrast)
- **Status Colors** (success, danger, warning, info)

## User Experience

### Intuitive Navigation
- Tabbed interface for switching between Light and Dark themes
- Visual feedback with selected state styling
- Smooth transitions between categories

### Theme Preview
- Live preview showing header, content, and footer
- Sample card with title, text, and button
- Instant visual feedback when switching themes

### Easy Application
- One-tap theme application with category-specific confirmation
- Immediate visual changes across the app
- Clear labeling of theme type (Light/Dark)

## Technical Implementation

### Light Theme Characteristics
- Light backgrounds (#F0F9FF, #FFFBEB, etc.)
- Dark text for readability (#0C4A6E, #14532D, etc.)
- Bright surface colors (#FFFFFF)
- Optimized for daylight viewing

### Dark Theme Characteristics  
- Dark backgrounds (#0F0F23, #1A0B0B, etc.)
- Light text for contrast (#E2E8F0, #FEE2E2, etc.)
- Elevated dark surfaces (#16213E, #3D1A1A, etc.)
- Optimized for low-light environments

The categorized theme system makes it easy for users to find the perfect theme for their preferred usage environment while maintaining the comprehensive color coverage that transforms the entire app experience.

## What Each Theme Changes

Each quick theme is a complete color scheme that modifies:

### Primary Colors
- Main brand color and variations
- Secondary accent colors
- Button and interactive element colors

### Background Colors
- App background (main screen background)
- Secondary backgrounds (section backgrounds)
- Surface colors (cards, modals, sheets)
- Elevated surface colors (floating elements)

### Text Colors
- Primary text (headings, main content)
- Secondary text (descriptions, labels)
- Tertiary text (hints, placeholders)
- Inverse text (text on colored backgrounds)

### UI Elements
- Header backgrounds and text
- Footer/tab bar colors
- Card backgrounds and borders
- Button colors and states

## Features

### Theme Preview
- Live preview showing how header, content, and footer will look
- Sample card with title, text, and button
- Instant visual feedback when switching themes

### Easy Application
- One-tap theme application
- Confirmation dialog with theme name
- Immediate visual changes across the app

### Theme Persistence
- Selected themes are saved automatically
- Themes persist across app restarts
- Reset functionality to restore defaults

## Usage

1. Navigate to **Settings** → **Theme Customization**
2. Browse the **Quick Themes** section
3. Tap any theme to apply it instantly
4. View the **Current Theme Preview** to see changes
5. Use **Reset to Default** to restore original theme

## Technical Implementation

Each theme includes complete color definitions for:
- 5 Primary colors (primary, primaryLight, primaryDark, secondary, secondaryLight)
- 5 Background colors (backgroundDefault, backgroundSecondary, surface, surfaceSecondary, surfaceElevated)
- 4 Text colors (textPrimary, textSecondary, textTertiary, textInverse)
- Status colors (success, danger, warning, info)

The themes are designed to maintain proper contrast ratios and accessibility standards while providing beautiful, cohesive color schemes.

## Usage

### For Users
1. Navigate to **Settings** → **Theme Customization**
2. Choose between **Appearance** and **Colors** tabs
3. Select theme mode (Light/Dark/System)
4. Apply quick theme presets or customize individual colors
5. Use **Reset to Default** to restore original theme

### For Developers

#### Using the Enhanced Theme Hook
```typescript
import { useEnhancedTheme } from '../utils/themeUtils';

const MyComponent = () => {
  const { themeColors, theme, isDark } = useEnhancedTheme();
  
  return (
    <View style={{ backgroundColor: themeColors.backgroundDefault }}>
      <Text style={{ color: themeColors.textPrimary }}>Hello World</Text>
    </View>
  );
};
```

#### Using Individual Contexts
```typescript
import { useTheme } from '../contexts/ThemeContext';
import { useCustomTheme } from '../contexts/CustomThemeContext';
import { getThemeColors } from '../styles/colors';

const MyComponent = () => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  
  // Component logic here
};
```

#### Creating Theme-Aware Styles
```typescript
import { getThemeColors } from '../styles/colors';

export const getStyles = ({ theme }: { theme: ColorSchemeName }) => {
  const themeColors = getThemeColors(theme);
  
  return {
    container: {
      backgroundColor: themeColors.backgroundDefault,
    },
    text: {
      color: themeColors.textPrimary,
    },
  };
};
```

## Architecture

### Context Providers
- **ThemeProvider**: Manages base theme mode (light/dark/system)
- **CustomThemeProvider**: Handles custom color overrides and persistence

### Color System
- **Base Colors**: Default light and dark theme colors
- **Custom Overrides**: User-defined color customizations
- **Merged Colors**: Final theme colors combining base + custom

### Storage
- Theme preferences are automatically saved to AsyncStorage
- Custom colors persist across app sessions
- Reset functionality clears all customizations

## Components

### ThemeSettingsScreen
Main interface for theme customization with:
- Theme mode selection
- Quick preset themes
- Individual color customization
- Reset functionality

### Enhanced Components
All major components now support custom themes:
- StatusBarManager
- FullScreenBackground
- AppNavigator
- All UI components (Card, Button, Input, etc.)

## Color Categories

### Primary Colors
- `primary`: Main brand color
- `primaryLight`: Lighter variant
- `primaryDark`: Darker variant
- `secondary`: Secondary accent color

### Background Colors
- `backgroundDefault`: Main app background
- `backgroundSecondary`: Secondary background areas
- `surface`: Card and component backgrounds
- `surfaceElevated`: Elevated component backgrounds

### Text Colors
- `textPrimary`: Main text color
- `textSecondary`: Secondary text (descriptions, labels)
- `textTertiary`: Tertiary text (hints, placeholders)
- `textInverse`: Text on colored backgrounds

### Status Colors
- `success`: Success states and positive actions
- `danger`: Error states and destructive actions
- `warning`: Warning states and caution
- `info`: Informational states and neutral actions

## Best Practices

1. **Always use theme colors** instead of hardcoded colors
2. **Test in both light and dark modes** with custom themes
3. **Use the enhanced theme hook** for new components
4. **Maintain contrast ratios** for accessibility
5. **Consider color-blind users** when choosing custom colors

## Migration Guide

To update existing components to support custom themes:

1. Import the custom theme context:
```typescript
import { useCustomTheme } from '../contexts/CustomThemeContext';
```

2. Update theme colors usage:
```typescript
// Before
const themeColors = getThemeColors(theme);

// After
const { customTheme } = useCustomTheme();
const themeColors = getThemeColors(theme, customTheme || undefined);
```

3. Or use the enhanced theme hook:
```typescript
import { useEnhancedTheme } from '../utils/themeUtils';
const { themeColors } = useEnhancedTheme();
```