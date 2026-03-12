import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface CustomBottomTabBarProps extends BottomTabBarProps {
  showLabels?: boolean;
  tabBarHeight?: number;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
}

const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  showLabels = true,
  tabBarHeight = 70,
  activeBackgroundColor = theme.colors.primary,
  inactiveBackgroundColor = 'transparent',
}) => {
  const insets = useSafeAreaInsets();
  const tabWidth = width / state.routes.length;

  return (
    <View style={[styles.container, { height: tabBarHeight + insets.bottom }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Get icon from options
          const iconComponent = options.tabBarIcon?.({
            focused: isFocused,
            color: isFocused ? theme.colors.text.inverse : theme.colors.text.secondary,
            size: 24,
          });

          // Get badge from options
          const badge = options.tabBarBadge;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tab,
                {
                  width: tabWidth,
                  backgroundColor: isFocused ? activeBackgroundColor : inactiveBackgroundColor,
                },
                isFocused && styles.activeTab,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                {iconComponent}
                {badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {typeof badge === 'number' && badge > 99 ? '99+' : badge}
                    </Text>
                  </View>
                )}
              </View>
              
              {showLabels && (
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused 
                        ? theme.colors.text.inverse 
                        : theme.colors.text.secondary,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ height: insets.bottom }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  tabBar: {
    flexDirection: 'row',
    height: 70,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: theme.borderRadius.lg,
  },
  activeTab: {
    ...theme.shadows.sm,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: '600',
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default CustomBottomTabBar;