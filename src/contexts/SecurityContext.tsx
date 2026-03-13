import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, AppStateStatus } from 'react-native';
import '../utils/debugAppLock'; // Import debug utility

export type AuthMethod = 'password' | 'biometric' | 'both' | 'none';

interface SecurityContextType {
  isLocked: boolean;
  isEnabled: boolean;
  authMethod: AuthMethod;
  hasPassword: boolean;
  hasBiometric: boolean;
  lockApp: () => void;
  unlockApp: () => void;
  enableSecurity: (method: AuthMethod, password?: string) => Promise<void>;
  disableSecurity: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  verifyPassword: (password: string) => Promise<boolean>;
  checkBiometric: () => Promise<boolean>;
  authenticateWithBiometric: () => Promise<boolean>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SECURITY_ENABLED: '@security_enabled',
  AUTH_METHOD: '@auth_method',
  PASSWORD_HASH: '@password_hash',
  LOCK_TIMEOUT: '@lock_timeout',
};

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [authMethod, setAuthMethod] = useState<AuthMethod>('none');
  const [hasPassword, setHasPassword] = useState(false);
  const [hasBiometric, setHasBiometric] = useState(false);
  const [lockTimeout, setLockTimeout] = useState<NodeJS.Timeout | null>(null);
  const [justUnlocked, setJustUnlocked] = useState(false); // Prevent immediate re-lock

  // Debug state changes
  useEffect(() => {
    if (__DEV__) {
      console.log('🔄 Security state changed:', {
        isLocked,
        isEnabled,
        authMethod,
        hasPassword,
        hasBiometric,
        justUnlocked,
      });
    }
  }, [isLocked, isEnabled, authMethod, hasPassword, hasBiometric, justUnlocked]);

  useEffect(() => {
    loadSecuritySettings();
    checkBiometricAvailability();
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return; // Don't set up app state monitoring if security is disabled
    }

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        startLockTimer();
      } else if (nextAppState === 'active') {
        clearLockTimer();
        // Don't change lock state when app becomes active
        // Let the user unlock manually if needed
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]); // Only depend on isEnabled

  const loadSecuritySettings = async () => {
    try {
      const [enabled, method, passwordExists] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.SECURITY_ENABLED),
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_METHOD),
        AsyncStorage.getItem(STORAGE_KEYS.PASSWORD_HASH),
      ]);

      const securityEnabled = enabled === 'true';
      const authenticationMethod = (method as AuthMethod) || 'none';
      const passwordSet = !!passwordExists;

      setIsEnabled(securityEnabled);
      setAuthMethod(authenticationMethod);
      setHasPassword(passwordSet);

      // If security is enabled, lock the app initially
      if (securityEnabled) {
        setIsLocked(true);
      }
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Error loading security settings:', error);
      }
    }
  };

  const checkBiometricAvailability = async () => {
    try {
      // This would normally use react-native-biometrics or similar
      // For now, we'll simulate biometric availability
      setHasBiometric(true);
    } catch (error) {
      if (__DEV__) {
        console.error('Error checking biometric availability:', error);
      }
      setHasBiometric(false);
    }
  };

  const startLockTimer = () => {
    if (justUnlocked) {
      return;
    }

    clearLockTimer();
    // Lock after 30 seconds in background
    const timeout = setTimeout(() => {
      if (!justUnlocked) {
        // Double-check before locking
        setIsLocked(true);
      }
    }, 30000);
    setLockTimeout(timeout);
  };

  const clearLockTimer = () => {
    if (lockTimeout) {
      clearTimeout(lockTimeout);
      setLockTimeout(null);
    }
  };

  const hashPassword = async (password: string): Promise<string> => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
  };

  const lockApp = () => {
    setIsLocked(true);
  };

  const unlockApp = () => {
    setIsLocked(false);
    setJustUnlocked(true);
    clearLockTimer();

    // Clear the "just unlocked" flag after a short delay
    setTimeout(() => {
      setJustUnlocked(false);
    }, 2000);
  };

  const enableSecurity = async (method: AuthMethod, password?: string) => {
    try {
      if ((method === 'password' || method === 'both') && password) {
        const hashedPassword = await hashPassword(password);
        await AsyncStorage.setItem(STORAGE_KEYS.PASSWORD_HASH, hashedPassword);
        setHasPassword(true);
      }

      await AsyncStorage.setItem(STORAGE_KEYS.SECURITY_ENABLED, 'true');
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_METHOD, method);

      setIsEnabled(true);
      setAuthMethod(method);
      setIsLocked(true); // Lock immediately after enabling
    } catch (error) {
      console.error('Error enabling security:', error);
      throw error;
    }
  };

  const disableSecurity = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.SECURITY_ENABLED,
        STORAGE_KEYS.AUTH_METHOD,
        STORAGE_KEYS.PASSWORD_HASH,
      ]);

      setIsEnabled(false);
      setAuthMethod('none');
      setHasPassword(false);
      setIsLocked(false);
      clearLockTimer();
    } catch (error) {
      console.error('Error disabling security:', error);
      throw error;
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      const hashedPassword = await hashPassword(newPassword);
      await AsyncStorage.setItem(STORAGE_KEYS.PASSWORD_HASH, hashedPassword);
      setHasPassword(true);
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  const verifyPassword = async (password: string): Promise<boolean> => {
    try {
      const storedHash = await AsyncStorage.getItem(STORAGE_KEYS.PASSWORD_HASH);
      if (!storedHash) return false;

      const inputHash = await hashPassword(password);
      return inputHash === storedHash;
    } catch (error) {
      console.error('Error verifying password:', error);
      return false;
    }
  };

  const checkBiometric = async (): Promise<boolean> => {
    // This would check if biometric is available and enrolled
    return hasBiometric;
  };

  const authenticateWithBiometric = async (): Promise<boolean> => {
    try {
      // This would use react-native-biometrics or similar
      // For now, we'll simulate biometric authentication
      return new Promise(resolve => {
        setTimeout(() => {
          // Simulate successful biometric authentication
          resolve(true);
        }, 1000);
      });
    } catch (error) {
      console.error('Error with biometric authentication:', error);
      return false;
    }
  };

  return (
    <SecurityContext.Provider
      value={{
        isLocked,
        isEnabled,
        authMethod,
        hasPassword,
        hasBiometric,
        lockApp,
        unlockApp,
        enableSecurity,
        disableSecurity,
        changePassword,
        verifyPassword,
        checkBiometric,
        authenticateWithBiometric,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
