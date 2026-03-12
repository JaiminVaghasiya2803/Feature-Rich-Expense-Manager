import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  Receipt, 
  Users, 
  PieChart, 
  Split,
  Calculator,
  Settings,
  Home,
  ShoppingCart,
  Calendar,
  MessageCircle
} from 'lucide-react-native';
import { TabConfig } from './BottomTabBar';
import CustomBottomTabBar from './CustomBottomTabBar';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

const Tab = createBottomTabNavigator();

const iconMap = {
  receipt: Receipt,
  users: Users,
  pieChart: PieChart,
  split: Split,
  calculator: Calculator,
  settings: Settings,
  home: Home,
  shoppingCart: ShoppingCart,
  calendar: Calendar,
  messageCircle: MessageCircle,
};

interface AppNavigatorProps {
  tabs: TabConfig[];
  initialRouteName?: string;
  customTabBar?: boolean;
  showLabels?: boolean;
  tabBarStyle?: 'default' | 'rounded' | 'floating';
}

const AppNavigator: React.FC<AppNavigatorProps> = ({
  tabs,
  initialRouteName,
  customTabBar = false,
  showLabels = true,
  tabBarStyle = 'default',
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  
  const getTabBarStyle = () => {
    switch (tabBarStyle) {
      case 'rounded':
        return {
          backgroundColor: themeColors.surface,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: theme === 'dark' ? 0.5 : 0.15,
          shadowRadius: 16,
          elevation: 8,
        };
      case 'floating':
        return {
          backgroundColor: themeColors.surface,
          borderRadius: 25,
          marginHorizontal: 20,
          marginBottom: 20,
          position: 'absolute' as const,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: theme === 'dark' ? 0.5 : 0.15,
          shadowRadius: 16,
          elevation: 8,
        };
      default:
        return {
          backgroundColor: themeColors.surface,
          borderTopColor: themeColors.borderLight,
        };
    }
  };

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBar={customTabBar ? (props) => (
        <CustomBottomTabBar {...props} showLabels={showLabels} />
      ) : undefined}
      screenOptions={{
        headerShown: false,
        tabBarStyle: customTabBar ? undefined : {
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          ...getTabBarStyle(),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.textSecondary,
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarBadge: tab.badge,
            tabBarIcon: ({ focused, color, size }) => {
              const IconComponent = iconMap[tab.icon as keyof typeof iconMap] || Calculator;
              return <IconComponent size={size} color={color} />;
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AppNavigator;