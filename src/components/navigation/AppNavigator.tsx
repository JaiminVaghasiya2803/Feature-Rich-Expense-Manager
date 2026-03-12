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
import { theme } from '../../constants/theme';

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
  const getTabBarStyle = () => {
    switch (tabBarStyle) {
      case 'rounded':
        return {
          backgroundColor: theme.colors.surface,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          ...theme.shadows.lg,
        };
      case 'floating':
        return {
          backgroundColor: theme.colors.surface,
          borderRadius: 25,
          marginHorizontal: 20,
          marginBottom: 20,
          position: 'absolute' as const,
          borderTopWidth: 0,
          ...theme.shadows.lg,
        };
      default:
        return {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
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
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
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