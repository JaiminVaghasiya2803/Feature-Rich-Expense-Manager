import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, Fingerprint, Eye, EyeOff, Shield } from 'lucide-react-native';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useCustomTheme } from '../../contexts/CustomThemeContext';
import { useSecurity } from '../../contexts/SecurityContext';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

const AppLockScreen: React.FC = () => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const styles = useStyles({ theme, customTheme: customTheme || undefined });

  const { authMethod, unlockApp, verifyPassword, authenticateWithBiometric, hasBiometric } =
    useSecurity();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  useEffect(() => {
    // Auto-trigger biometric if it's the only method or preferred
    if (authMethod === 'biometric' && hasBiometric) {
      // Add a small delay to ensure everything is initialized
      setTimeout(() => {
        handleBiometricAuth();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authMethod, hasBiometric]);

  const handlePasswordAuth = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setIsAuthenticating(true);
    try {
      const isValid = await verifyPassword(password);

      if (isValid) {
        unlockApp();
        setPassword('');
        setFailedAttempts(0);
      } else {
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        setPassword('');
        Vibration.vibrate(500);

        Alert.alert('Incorrect Password', `Failed attempts: ${newFailedAttempts}/5`, [
          { text: 'OK' },
        ]);

        if (newFailedAttempts >= 5) {
          Alert.alert(
            'Too Many Failed Attempts',
            'Please try again later or use biometric authentication.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Authentication error:', error);
      }
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleBiometricAuth = async () => {
    if (!hasBiometric) {
      Alert.alert('Error', 'Biometric authentication is not available');
      return;
    }

    setIsAuthenticating(true);
    try {
      const success = await authenticateWithBiometric();

      if (success) {
        unlockApp();
        setFailedAttempts(0);
      } else {
        Alert.alert('Authentication Failed', 'Biometric authentication was not successful');
      }
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Biometric authentication error:', error);
      }
      Alert.alert('Error', 'Biometric authentication failed');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const canUsePassword = authMethod === 'password' || authMethod === 'both';
  const canUseBiometric = (authMethod === 'biometric' || authMethod === 'both') && hasBiometric;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Shield size={64} color={themeColors.primary} />
            </View>
            <Text style={styles.title}>App Locked</Text>
            <Text style={styles.subtitle}>Enter your credentials to access the app</Text>
          </View>

          {/* Authentication Methods */}
          <View style={styles.authContainer}>
            {canUsePassword && (
              <Card style={styles.authCard}>
                <Text style={styles.authTitle}>Password Authentication</Text>

                <Input
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  leftIcon={<Lock size={20} color={themeColors.textSecondary} />}
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <EyeOff size={20} color={themeColors.textSecondary} />
                      ) : (
                        <Eye size={20} color={themeColors.textSecondary} />
                      )}
                    </TouchableOpacity>
                  }
                  onSubmitEditing={handlePasswordAuth}
                  editable={!isAuthenticating && failedAttempts < 5}
                />

                <Button
                  title="Unlock with Password"
                  onPress={handlePasswordAuth}
                  loading={isAuthenticating}
                  disabled={!password.trim() || failedAttempts >= 5}
                  style={styles.authButton}
                />

                {failedAttempts > 0 && (
                  <Text style={styles.errorText}>Failed attempts: {failedAttempts}/5</Text>
                )}
              </Card>
            )}

            {canUseBiometric && (
              <Card style={styles.authCard}>
                <Text style={styles.authTitle}>Biometric Authentication</Text>
                <Text style={styles.biometricDescription}>
                  Use your fingerprint or face to unlock the app
                </Text>

                <TouchableOpacity
                  style={styles.biometricButton}
                  onPress={handleBiometricAuth}
                  disabled={isAuthenticating}
                >
                  <Fingerprint size={48} color={themeColors.primary} />
                  <Text style={styles.biometricButtonText}>Tap to authenticate</Text>
                </TouchableOpacity>
              </Card>
            )}
          </View>

          {/* Security Info */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Your data is protected with {authMethod} authentication
            </Text>

            {/* Debug bypass button - only in development */}
            {__DEV__ && (
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: themeColors.warning + '20',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: themeColors.warning,
                }}
                onPress={() => {
                  unlockApp();
                }}
              >
                <Text style={{ color: themeColors.warning, textAlign: 'center', fontSize: 12 }}>
                  DEBUG: Bypass Lock
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AppLockScreen;
