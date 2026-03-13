import React, { useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Animated,
  InteractionManager,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';

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
  backgroundColor,
  animated = true,
}) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
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

  const getHeaderStyle = () => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.borderLight,
    backgroundColor: backgroundColor || themeColors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme === 'dark' ? 0.3 : 0.05,
    shadowRadius: 2,
    elevation: 2,
  });

  const getTextStyles = () => ({
    title: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
      color: themeColors.textPrimary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
      color: themeColors.textSecondary,
    },
  });

  const textStyles = getTextStyles();

  return (
    <Animated.View
      style={[
        getHeaderStyle(),
        style,
        animated && {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
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
            style={[styles.backButton, { backgroundColor: themeColors.surfaceSecondary }]}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={themeColors.textPrimary} />
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
        <Text style={textStyles.title}>{title}</Text>
        {subtitle && <Text style={textStyles.subtitle}>{subtitle}</Text>}
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
  backButtonContainer: {
    marginRight: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    flex: 1,
  },
  rightComponent: {
    marginLeft: 16,
  },
});

export default Header;
