import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Receipt, IndianRupee, TrendingUp, Users } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';
import { createUseStyles } from '../../styles/createUseStyles';
import { SPLASH_CONFIG } from '../../config/splashConfig';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);
const { width } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  const { theme } = useTheme();
  const themeColors = getThemeColors(theme);
  const styles = useStyles({ theme });
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const iconRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations sequence
    Animated.sequence([
      // Logo entrance animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Text slide up animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Icon rotation animation (continuous)
    Animated.loop(
      Animated.timing(iconRotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    // Auto finish after configured time
    const timer = setTimeout(() => {
      onFinish();
    }, SPLASH_CONFIG.autoFinishDelay);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, slideAnim, progressAnim, iconRotateAnim, onFinish]);

  const iconRotation = iconRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 64],
  });

  return (
    <View style={[styles.container, { backgroundColor: themeColors.backgroundDefault }]}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
        <View style={styles.content}>
          {/* Logo with rotating icon */}
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.logo}>
              <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
                <Receipt size={60} color={themeColors.textInverse} />
              </Animated.View>
            </View>
          </Animated.View>

          {/* Brand Text */}
          <Animated.View
            style={[
              styles.brandContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.brandText}>{SPLASH_CONFIG.appName}</Text>
            <Text style={styles.subtitle}>{SPLASH_CONFIG.tagline}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <IndianRupee size={16} color={themeColors.primary} />
              <Text style={[styles.subtitle, { color: themeColors.primary, marginLeft: 4 }]}>
                {SPLASH_CONFIG.subtitle}
              </Text>
            </View>
          </Animated.View>

          {/* Feature Icons */}
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 32,
                marginVertical: 32,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={{ alignItems: 'center' }}>
              <View style={[styles.brandIcon, { backgroundColor: themeColors.secondary }]}>
                <TrendingUp size={24} color={themeColors.textInverse} />
              </View>
              <Text style={[styles.footerText, { marginTop: 8 }]}>Track</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={[styles.brandIcon, { backgroundColor: themeColors.warning }]}>
                <Users size={24} color={themeColors.textInverse} />
              </View>
              <Text style={[styles.footerText, { marginTop: 8 }]}>Split</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={[styles.brandIcon, { backgroundColor: themeColors.info }]}>
                <IndianRupee size={24} color={themeColors.textInverse} />
              </View>
              <Text style={[styles.footerText, { marginTop: 8 }]}>Save</Text>
            </View>
          </Animated.View>

          {/* Tagline */}
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.tagline}>
              {SPLASH_CONFIG.description}
            </Text>
          </Animated.View>

          {/* Progress Bar */}
          <Animated.View
            style={[
              {
                width: width - 64,
                height: 4,
                backgroundColor: themeColors.borderLight,
                borderRadius: 2,
                marginTop: 32,
                opacity: fadeAnim,
              },
            ]}
          >
            <Animated.View
              style={{
                height: 4,
                backgroundColor: themeColors.primary,
                borderRadius: 2,
                width: progressWidth,
              }}
            />
          </Animated.View>

          {/* Loading Indicator */}
          <Animated.View
            style={[
              styles.loadingContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <ActivityIndicator size="large" color={themeColors.primary} />
            <Text style={styles.loadingText}>Loading your financial companion...</Text>
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.footerText}>
            Simplifying expense management for everyone
          </Text>
          <Text style={[styles.footerText, { marginTop: 4, fontSize: 10 }]}>
            Version {SPLASH_CONFIG.version}
          </Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default SplashScreen;