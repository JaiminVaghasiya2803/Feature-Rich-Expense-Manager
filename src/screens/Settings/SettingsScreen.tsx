import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Moon, 
  Sun, 
  Bell, 
  Shield, 
  HelpCircle, 
  Info,
  ChevronRight,
  Palette
} from 'lucide-react-native';

import Card from '../../components/ui/Card';
import { createUseStyles } from '../../styles/createUseStyles';
import { getThemeColors } from '../../styles/colors';
import { useTheme } from '../../contexts/ThemeContext';
import { useCustomTheme } from '../../contexts/CustomThemeContext';
import { getStyles } from './styles';

const useStyles = createUseStyles(getStyles);

interface Props {
  navigation: any;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { customTheme } = useCustomTheme();
  const themeColors = getThemeColors(theme, customTheme || undefined);
  const styles = useStyles({ theme, customTheme: customTheme || undefined });

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

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your app experience</Text>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <Card style={styles.sectionCard}>
            <SettingItem
              icon={isDark ? <Moon size={24} color={themeColors.primary} /> : <Sun size={24} color={themeColors.primary} />}
              title="Theme"
              subtitle={isDark ? 'Dark mode' : 'Light mode'}
              onPress={toggleTheme}
            />
            
            <View style={styles.separator} />
            
            <SettingItem
              icon={<Palette size={24} color={themeColors.secondary} />}
              title="Theme Customization"
              subtitle="Customize colors and appearance"
              onPress={() => navigation.navigate('ThemeSettings')}
            />
          </Card>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <Card style={styles.sectionCard}>
            <SettingItem
              icon={<Bell size={24} color={themeColors.warning} />}
              title="Push Notifications"
              subtitle="Get notified about new expenses and settlements"
            />
          </Card>
        </View>

        {/* Privacy & Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>
          <Card style={styles.sectionCard}>
            <SettingItem
              icon={<Shield size={24} color={themeColors.success} />}
              title="App Lock"
              subtitle="Secure your app with password or biometrics"
              onPress={() => navigation.navigate('SecuritySettings')}
            />
            
            <View style={styles.separator} />
            
            <SettingItem
              icon={<Shield size={24} color={themeColors.success} />}
              title="Privacy Policy"
              subtitle="How we handle your data"
            />
          </Card>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <Card style={styles.sectionCard}>
            <SettingItem
              icon={<HelpCircle size={24} color={themeColors.info} />}
              title="Help & FAQ"
              subtitle="Get help with using the app"
            />
            
            <View style={styles.separator} />
            
            <SettingItem
              icon={<Info size={24} color={themeColors.textSecondary} />}
              title="About"
              subtitle="Version 1.0.0 - Made in India"
            />
          </Card>
        </View>

        {/* Currency Info */}
        <View style={styles.section}>
          <Card style={styles.currencyCard}>
            <Text style={styles.currencyTitle}>💰 Indian Rupee (₹)</Text>
            <Text style={styles.currencySubtitle}>
              All amounts are displayed in Indian Rupees. Perfect for tracking your expenses in India.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;