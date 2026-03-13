import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Shield, 
  Lock, 
  Fingerprint, 
  Key,
  ChevronRight,
  AlertTriangle
} from 'lucide-react-native';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useCustomTheme } from '../../contexts/CustomThemeContext';
import { useSecurity, AuthMethod } from '../../contexts/SecurityContext';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: any;
}

const SecuritySettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const styles = useStyles({ theme, customTheme: customTheme || undefined });
  
  const { 
    isEnabled, 
    authMethod, 
    hasBiometric,
    enableSecurity,
    disableSecurity,
    changePassword,
    lockApp
  } = useSecurity();

  const [showPasswordSetup, setShowPasswordSetup] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSecurity = async (enabled: boolean) => {
    if (enabled) {
      setShowPasswordSetup(true);
    } else {
      Alert.alert(
        'Disable App Lock',
        'Are you sure you want to disable app lock? Your data will no longer be protected.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Disable', 
            style: 'destructive',
            onPress: async () => {
              try {
                await disableSecurity();
                Alert.alert('Success', 'App lock has been disabled');
              } catch (error) {
                Alert.alert('Error', 'Failed to disable app lock');
              }
            }
          }
        ]
      );
    }
  };

  const handleSetupPassword = async () => {
    if (!newPassword.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (newPassword.length < 4) {
      Alert.alert('Error', 'Password must be at least 4 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const method: AuthMethod = hasBiometric ? 'both' : 'password';
      await enableSecurity(method, newPassword);
      
      setShowPasswordSetup(false);
      setNewPassword('');
      setConfirmPassword('');
      
      Alert.alert(
        'Success', 
        `App lock has been enabled with ${method === 'both' ? 'password and biometric' : 'password'} authentication`
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to enable app lock');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLock = () => {
    Alert.alert(
      'Test App Lock',
      'This will lock the app immediately. You will need to authenticate to unlock it.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Lock App', 
          onPress: () => lockApp()
        }
      ]
    );
  };

  const getAuthMethodText = () => {
    switch (authMethod) {
      case 'password': return 'Password only';
      case 'biometric': return 'Biometric only';
      case 'both': return 'Password + Biometric';
      default: return 'None';
    }
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight size={20} color={themeColors.textTertiary} />}
    </TouchableOpacity>
  );

  if (showPasswordSetup) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top']} />
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Set Up App Lock</Text>
          <Text style={styles.headerSubtitle}>Create a password to secure your app</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Card style={styles.setupCard}>
            <Text style={styles.setupTitle}>Create Password</Text>
            
            <Input
              label="New Password"
              placeholder="Enter a secure password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
              leftIcon={<Lock size={20} color={themeColors.textSecondary} />}
            />

            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              leftIcon={<Lock size={20} color={themeColors.textSecondary} />}
            />

            {hasBiometric && (
              <View style={styles.biometricInfo}>
                <Fingerprint size={24} color={themeColors.success} />
                <Text style={styles.biometricInfoText}>
                  Biometric authentication will also be enabled
                </Text>
              </View>
            )}

            <View style={styles.setupButtons}>
              <Button
                title="Cancel"
                onPress={() => setShowPasswordSetup(false)}
                variant="ghost"
                style={styles.cancelButton}
              />
              <Button
                title="Enable App Lock"
                onPress={handleSetupPassword}
                loading={isLoading}
                style={styles.enableButton}
              />
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Security Settings</Text>
        <Text style={styles.headerSubtitle}>Protect your app with authentication</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Lock Toggle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Lock</Text>
          <Card style={styles.sectionCard}>
            <View style={styles.toggleItem}>
              <View style={styles.toggleContent}>
                <Shield size={24} color={isEnabled ? themeColors.success : themeColors.textSecondary} />
                <View style={styles.toggleText}>
                  <Text style={styles.toggleTitle}>Enable App Lock</Text>
                  <Text style={styles.toggleSubtitle}>
                    {isEnabled ? 'App is protected' : 'App is not protected'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isEnabled}
                onValueChange={handleToggleSecurity}
                trackColor={{ false: themeColors.borderMedium, true: themeColors.success + '40' }}
                thumbColor={isEnabled ? themeColors.success : themeColors.textTertiary}
              />
            </View>
          </Card>
        </View>

        {isEnabled && (
          <>
            {/* Current Settings */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Current Settings</Text>
              <Card style={styles.sectionCard}>
                <SettingItem
                  icon={<Key size={24} color={themeColors.primary} />}
                  title="Authentication Method"
                  subtitle={getAuthMethodText()}
                />
                
                <View style={styles.separator} />
                
                <SettingItem
                  icon={<Lock size={24} color={themeColors.warning} />}
                  title="Change Password"
                  subtitle="Update your app password"
                  onPress={() => {
                    Alert.prompt(
                      'Change Password',
                      'Enter your new password:',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        { 
                          text: 'Change',
                          onPress: (password) => {
                            if (password && password.length >= 4) {
                              changePassword(password);
                            } else {
                              Alert.alert('Error', 'Password must be at least 4 characters');
                            }
                          }
                        }
                      ],
                      'secure-text'
                    );
                  }}
                />
              </Card>
            </View>

            {/* Test & Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Test & Actions</Text>
              <Card style={styles.sectionCard}>
                <SettingItem
                  icon={<AlertTriangle size={24} color={themeColors.warning} />}
                  title="Test App Lock"
                  subtitle="Lock the app to test authentication"
                  onPress={handleTestLock}
                />
              </Card>
            </View>

            {/* Security Info */}
            <View style={styles.section}>
              <Card style={styles.infoCard}>
                <Text style={styles.infoTitle}>🔒 Security Information</Text>
                <Text style={styles.infoText}>
                  • App locks automatically when backgrounded for 30 seconds{'\n'}
                  • Failed password attempts are limited to 5{'\n'}
                  • Biometric authentication is available when supported{'\n'}
                  • Your password is securely stored on device
                </Text>
              </Card>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default SecuritySettingsScreen;