import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';
import { usePressAnimation } from '../../hooks/useAnimations';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  animated?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  animated = true,
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const { pressIn, pressOut, animatedStyle } = usePressAnimation(
    animated && !disabled && !loading
  );

  const shadowStyles = {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: theme === 'dark' ? 0.3 : 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
  };

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: 12,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    };

    const variantStyles = {
      primary: {
        backgroundColor: themeColors.primary,
        ...shadowStyles.sm,
      },
      secondary: {
        backgroundColor: themeColors.secondary,
        ...shadowStyles.sm,
      },
      danger: {
        backgroundColor: themeColors.danger,
        ...shadowStyles.sm,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: themeColors.borderMedium,
      },
    };

    const sizeStyles = {
      sm: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 36,
      },
      md: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        minHeight: 48,
      },
      lg: {
        paddingHorizontal: 32,
        paddingVertical: 24,
        minHeight: 56,
      },
    };

    const disabledStyle = disabled ? {
      backgroundColor: themeColors.borderMedium,
      ...shadowStyles.sm,
    } : {};

    return [
      baseStyle,
      variantStyles[variant],
      sizeStyles[size],
      disabledStyle,
      style,
    ];
  };

  const getTextStyle = () => {
    const baseTextStyle = {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24,
    };

    const variantTextStyles = {
      primary: { color: themeColors.textInverse },
      secondary: { color: themeColors.textInverse },
      danger: { color: themeColors.textInverse },
      ghost: { color: themeColors.textPrimary },
    };

    const sizeTextStyles = {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
    };

    const disabledTextStyle = disabled ? {
      color: themeColors.textTertiary,
    } : {};

    return [
      baseTextStyle,
      variantTextStyles[variant],
      sizeTextStyles[size],
      disabledTextStyle,
      textStyle,
    ];
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      disabled={disabled || loading}
      activeOpacity={animated ? 1 : 0.8}
    >
      <Animated.View
        style={[
          getButtonStyle(),
          animated && animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === 'ghost' ? themeColors.primary : themeColors.textInverse}
            size="small"
          />
        ) : (
          <Text style={getTextStyle()}>{title}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Button;