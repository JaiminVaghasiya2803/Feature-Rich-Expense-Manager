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
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

const Tab = createBottomTabNavigator();

export interface TabConfig {
  name: string;
  component: React.ComponentType<any>;
  label: string;
  icon: keyof typeof iconMap;
  badge?: number;
}

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

interface BottomTabBarProps {
  tabs: TabConfig[];
  initialRouteName?: string;
  tabBarStyle?: object;
  activeTintColor?: string;
  inactiveTintColor?: string;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs,
  initialRouteName,
  tabBarStyle,
  activeTintColor,
  inactiveTintColor,
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused: _focused, color, size }) => {
          const tab = tabs.find(t => t.name === route.name);
          const IconComponent = tab ? iconMap[tab.icon] : Calculator;
          return <IconComponent size={size} color={color} />;
        },
        tabBarActiveTintColor: activeTintColor || themeColors.primary,
        tabBarInactiveTintColor: inactiveTintColor || themeColors.textSecondary,
        tabBarStyle: {
          backgroundColor: themeColors.surface,
          borderTopColor: themeColors.borderLight,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          ...tabBarStyle,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarBadge: undefined, // Will be set per tab if needed
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarBadge: tab.badge,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabBar;