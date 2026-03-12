/**
 * Reusable Header component for screens with animations and proper styling
 * 
 * @example
 * // Basic usage with back button
 * <Header 
 *   title="Screen Title" 
 *   subtitle="Optional subtitle"
 *   onBack={() => navigation.goBack()} 
 * />
 * 
 * @example
 * // With right component
 * <Header 
 *   title="Screen Title"
 *   onBack={() => navigation.goBack()}
 *   rightComponent={
 *     <TouchableOpacity onPress={handleAction}>
 *       <Icon name="settings" />
 *     </TouchableOpacity>
 *   }
 * />
 * 
 * @example
 * // Without back button (main screen)
 * <Header 
 *   title="Main Screen"
 *   showBackButton={false}
 * />
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, Animated, InteractionManager } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '../../constants/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  showBackButton?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
  animated?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightComponent,
  showBackButton = true,
  style,
  backgroundColor = theme.colors.surface,
  animated = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (animated) {
      InteractionManager.runAfterInteractions(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
      scaleAnim.setValue(1);
    }
  }, [animated, fadeAnim, slideAnim, scaleAnim]);

  return (
    <Animated.View 
      style={[
        styles.header, 
        { backgroundColor }, 
        style,
        animated && {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      {showBackButton && onBack && (
        <Animated.View
          style={[
            styles.backButtonContainer,
            animated && {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </Animated.View>
      )}
      
      <Animated.View 
        style={[
          styles.headerContent,
          animated && {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </Animated.View>
      
      {rightComponent && (
        <Animated.View 
          style={[
            styles.rightComponent,
            animated && {
              opacity: fadeAnim,
              transform: [{ translateX: Animated.multiply(slideAnim, -1) }],
            },
          ]}
        >
          {rightComponent}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...theme.shadows.sm,
  },
  backButtonContainer: {
    marginRight: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceSecondary,
    ...theme.shadows.sm,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
  },
  rightComponent: {
    marginLeft: theme.spacing.md,
  },
});

export default Header;