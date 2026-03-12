import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { theme } from '../../constants/theme';
import { useEntranceAnimation } from '../../hooks/useAnimations';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
  shadow?: keyof typeof theme.shadows;
  animated?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'md',
  shadow = 'sm',
  animated = true,
  delay = 0,
}) => {
  const { startAnimation, animatedStyle } = useEntranceAnimation(animated, delay);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const cardStyle = [
    styles.card,
    { padding: theme.spacing[padding] },
    theme.shadows[shadow],
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
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
});

export default Card;