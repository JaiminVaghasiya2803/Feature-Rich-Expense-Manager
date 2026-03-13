import { AuthMethod } from '../../contexts/SecurityContext';

export interface SecuritySettingsScreenProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

export interface PasswordSetupState {
  showPasswordSetup: boolean;
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
  isLoading: boolean;
}

export interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

export interface SecurityConfig {
  isEnabled: boolean;
  authMethod: AuthMethod;
  hasPassword: boolean;
  hasBiometric: boolean;
}