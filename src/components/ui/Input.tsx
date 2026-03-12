import React, { useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Animated,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  animated?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  leftIcon,
  rightIcon,
  style,
  animated = true,
  ...props
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = (e: any) => {
    if (animated) {
      // Run animations separately to avoid conflicts
      Animated.timing(borderColorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false, // Required for color animations
      }).start();
      
      Animated.spring(scaleAnim, {
        toValue: 1.02,
        useNativeDriver: true, // Can use native driver for transform
        tension: 300,
        friction: 10,
      }).start();
    }
    props.onFocus && props.onFocus(e);
  };

  const handleBlur = (e: any) => {
    if (animated) {
      // Run animations separately to avoid conflicts
      Animated.timing(borderColorAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false, // Required for color animations
      }).start();
      
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true, // Can use native driver for transform
        tension: 300,
        friction: 10,
      }).start();
    }
    props.onBlur && props.onBlur(e);
  };

  const animatedBorderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [themeColors.borderLight, themeColors.primary],
  });

  const getInputContainerStyle = () => {
    const baseStyle = {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: themeColors.surface,
      borderWidth: 1,
      borderColor: error ? themeColors.danger : themeColors.borderLight,
      borderRadius: 12,
      paddingHorizontal: 16,
      minHeight: 48,
    };

    const iconStyles = {
      paddingLeft: leftIcon ? 8 : 16,
      paddingRight: rightIcon ? 8 : 16,
    };

    return [baseStyle, iconStyles];
  };

  const getTextStyles = () => ({
    label: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: themeColors.textPrimary,
      marginBottom: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
      color: themeColors.textPrimary,
      paddingVertical: 16,
    },
    error: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
      color: themeColors.danger,
      marginTop: 4,
    },
  });

  const textStyles = getTextStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={textStyles.label}>{label}</Text>}
      
      {/* Separate animated views to avoid native driver conflicts */}
      <Animated.View 
        style={[
          { transform: animated ? [{ scale: scaleAnim }] : [] }
        ]}
      >
        <Animated.View
          style={[
            getInputContainerStyle(),
            animated && !error && {
              borderColor: animatedBorderColor,
            },
          ]}
        >
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          
          <TextInput
            style={[textStyles.input, style]}
            placeholderTextColor={themeColors.textTertiary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </Animated.View>
      </Animated.View>
      
      {error && <Text style={textStyles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Input;