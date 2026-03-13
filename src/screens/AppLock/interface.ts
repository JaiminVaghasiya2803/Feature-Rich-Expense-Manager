export interface AppLockScreenProps {
  onUnlock?: () => void;
}

export interface AuthenticationState {
  password: string;
  showPassword: boolean;
  isAuthenticating: boolean;
  failedAttempts: number;
}

export interface BiometricAuthResult {
  success: boolean;
  error?: string;
}