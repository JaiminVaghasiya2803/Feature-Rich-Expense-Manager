import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useCustomTheme } from '../../contexts/CustomThemeContext';
import { getThemeColors } from '../../styles/colors';
import { useEntranceAnimation } from '../../hooks/useAnimations';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  shadow?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 16,
  shadow = 'sm',
  animated = true,
  delay = 0,
}) => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const { startAnimation, animatedStyle } = useEntranceAnimation(animated, delay);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const shadowStyles = {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: theme === 'dark' ? 0.3 : 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: theme === 'dark' ? 0.4 : 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: theme === 'dark' ? 0.5 : 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
  };

  const cardStyle = [
    styles.card,
    {
      backgroundColor: themeColors.surface,
      borderColor: themeColors.borderLight,
      padding: padding,
    },
    shadowStyles[shadow],
    style,
  ];

  if (animated) {
    return (
      <Animated.View
        style={[
          cardStyle,
          animatedStyle,
        ]}
      >
        {children}
      </Animated.View>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
  },
});

export default Card;