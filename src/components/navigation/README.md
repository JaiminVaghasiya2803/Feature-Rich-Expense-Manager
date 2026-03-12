# Bottom Tab Bar Implementation

This implementation provides a flexible bottom tab bar system that can be easily configured for different types of apps.

## Features

- **Multiple App Configurations**: Switch between different app types (Expense Manager, E-commerce, Social, Productivity)
- **Flexible Tab Bar Styles**: Default, Rounded, and Floating styles
- **Custom Tab Bar**: Enhanced tab bar with badges, animations, and custom styling
- **Icon Support**: Comprehensive icon library using Lucide React Native
- **Badge Support**: Display notification badges on tabs
- **Responsive Design**: Adapts to different screen sizes and safe areas

## Components

### 1. BottomTabBar.tsx
Basic configurable bottom tab bar component.

```tsx
import BottomTabBar, { TabConfig } from './components/navigation/BottomTabBar';

const tabs: TabConfig[] = [
  {
    name: 'Home',
    component: HomeScreen,
    label: 'Home',
    icon: 'home',
    badge: 3, // Optional badge
  },
  // ... more tabs
];

<BottomTabBar 
  tabs={tabs}
  activeTintColor="#007AFF"
  inactiveTintColor="#8E8E93"
/>
```

### 2. CustomBottomTabBar.tsx
Enhanced tab bar with custom styling and animations.

```tsx
import CustomBottomTabBar from './components/navigation/CustomBottomTabBar';

// Use as tabBar prop in Tab.Navigator
<Tab.Navigator
  tabBar={(props) => (
    <CustomBottomTabBar 
      {...props} 
      showLabels={true}
      activeBackgroundColor="#007AFF"
    />
  )}
>
  {/* Tab screens */}
</Tab.Navigator>
```

### 3. AppNavigator.tsx
Complete navigation solution with multiple styling options.

```tsx
import AppNavigator from './components/navigation/AppNavigator';

<AppNavigator 
  tabs={tabConfig}
  customTabBar={true}
  tabBarStyle="floating"
  showLabels={true}
/>
```

## Configuration

### App Configurations (appConfigs.tsx)

Define different app types with their respective tab configurations:

```tsx
export const myAppConfig: TabConfig[] = [
  {
    name: 'Dashboard',
    component: DashboardStack,
    label: 'Dashboard',
    icon: 'home',
  },
  {
    name: 'Messages',
    component: MessagesStack,
    label: 'Messages',
    icon: 'messageCircle',
    badge: 5, // Unread messages
  },
  // ... more tabs
];
```

### Available Icons

- `receipt` - Receipt icon
- `users` - Users icon
- `pieChart` - Pie chart icon
- `split` - Split icon
- `calculator` - Calculator icon
- `settings` - Settings icon
- `home` - Home icon
- `shoppingCart` - Shopping cart icon
- `calendar` - Calendar icon
- `messageCircle` - Message circle icon

### Tab Bar Styles

1. **Default**: Standard tab bar with border
2. **Rounded**: Rounded top corners with shadow
3. **Floating**: Floating tab bar with margins and rounded corners

## Usage Examples

### Basic Implementation

```tsx
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/navigation/AppNavigator';
import { expenseManagerConfig } from './config/appConfigs';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator 
        tabs={expenseManagerConfig}
        tabBarStyle="default"
      />
    </NavigationContainer>
  );
}
```

### Custom Tab Bar with Badges

```tsx
const socialConfig: TabConfig[] = [
  {
    name: 'Feed',
    component: FeedScreen,
    label: 'Feed',
    icon: 'home',
  },
  {
    name: 'Messages',
    component: MessagesScreen,
    label: 'Messages',
    icon: 'messageCircle',
    badge: 12, // Unread count
  },
];

<AppNavigator 
  tabs={socialConfig}
  customTabBar={true}
  tabBarStyle="floating"
/>
```

### Dynamic App Switching

The `AppContainer.tsx` demonstrates how to dynamically switch between different app configurations:

```tsx
const [currentAppType, setCurrentAppType] = useState<AppType>('expense-manager');
const currentConfig = getAppConfig(currentAppType);

// Switch app type
setCurrentAppType('ecommerce');
```

## Customization

### Adding New Icons

1. Import the icon from `lucide-react-native`
2. Add it to the `iconMap` in both `BottomTabBar.tsx` and `AppNavigator.tsx`
3. Update the TypeScript interface

### Creating New App Configurations

1. Define your tab configuration in `appConfigs.tsx`
2. Add the new app type to the `AppType` union
3. Update the `getAppConfig` function

### Styling Customization

Modify the theme colors and styles in:
- `src/constants/theme.ts` - Global theme
- Component-specific styles in each navigation component

## Best Practices

1. **Keep tab count reasonable**: 3-5 tabs work best for mobile UX
2. **Use meaningful icons**: Choose icons that clearly represent the tab content
3. **Badge management**: Update badges based on real-time data
4. **Accessibility**: Ensure proper accessibility labels and roles
5. **Performance**: Use stack navigators within tabs for complex navigation flows

## Integration with Existing Apps

To integrate this system into an existing React Native app:

1. Install required dependencies:
   ```bash
   npm install @react-navigation/bottom-tabs
   ```

2. Copy the navigation components to your project
3. Update your app's entry point to use `AppContainer` or `AppNavigator`
4. Configure your tab screens and navigation structure