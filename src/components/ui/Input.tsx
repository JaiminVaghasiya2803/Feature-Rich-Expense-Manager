import React, { useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Animated,
  InteractionManager,
} from 'react-native';
import { theme } from '../../constants/theme';

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
    outputRange: [theme.colors.border.light, theme.colors.primary],
  });

  const inputContainerStyle = [
    styles.inputContainer,
    error ? styles.error : null,
    leftIcon ? styles.withLeftIcon : null,
    rightIcon ? styles.withRightIcon : null,
  ].filter(Boolean);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      {/* Separate animated views to avoid native driver conflicts */}
      <Animated.View 
        style={[
          { transform: animated ? [{ scale: scaleAnim }] : [] }
        ]}
      >
        <Animated.View
          style={[
            inputContainerStyle,
            animated && !error && {
              borderColor: animatedBorderColor,
            },
          ]}
        >
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          
          <TextInput
            style={[styles.input, style]}
            placeholderTextColor={theme.colors.text.tertiary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </Animated.View>
      </Animated.View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    minHeight: 48,
  },
  error: {
    borderColor: theme.colors.danger,
  },
  withLeftIcon: {
    paddingLeft: theme.spacing.sm,
  },
  withRightIcon: {
    paddingRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.text.primary,
    paddingVertical: theme.spacing.md,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.danger,
    marginTop: theme.spacing.xs,
  },
});

export default Input;