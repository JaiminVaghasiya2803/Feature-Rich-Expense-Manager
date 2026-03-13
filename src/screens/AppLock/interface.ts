export interface AppLockScreenProps {
  // Props interface for AppLockScreen component
  // Currently no specific props needed as it uses context
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