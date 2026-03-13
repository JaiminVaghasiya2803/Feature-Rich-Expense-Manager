/**
 * App Lock Demo Utility
 *
 * This utility provides helper functions to demonstrate and test
 * the app lock functionality during development.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SECURITY_ENABLED: '@security_enabled',
  AUTH_METHOD: '@auth_method',
  PASSWORD_HASH: '@password_hash',
};

/**
 * Demo: Enable app lock with a test password
 */
export const enableDemoAppLock = async (password: string = 'demo123') => {
  try {
    // Simple hash function (same as in SecurityContext)
    const hashPassword = (pwd: string): string => {
      let hash = 0;
      for (let i = 0; i < pwd.length; i++) {
        const char = pwd.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return hash.toString();
    };

    const hashedPassword = hashPassword(password);

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.SECURITY_ENABLED, 'true'],
      [STORAGE_KEYS.AUTH_METHOD, 'both'], // Enable both password and biometric
      [STORAGE_KEYS.PASSWORD_HASH, hashedPassword],
    ]);

    return true;
  } catch (error) {
    console.error('❌ Failed to enable demo app lock:', error);
    return false;
  }
};

/**
 * Demo: Disable app lock
 */
export const disableDemoAppLock = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.SECURITY_ENABLED,
      STORAGE_KEYS.AUTH_METHOD,
      STORAGE_KEYS.PASSWORD_HASH,
    ]);

    return true;
  } catch (error) {
    console.error('❌ Failed to disable demo app lock:', error);
    return false;
  }
};

/**
 * Demo: Check current app lock status
 */
export const checkAppLockStatus = async () => {
  try {
    const [enabled, method, hasPassword] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.SECURITY_ENABLED),
      AsyncStorage.getItem(STORAGE_KEYS.AUTH_METHOD),
      AsyncStorage.getItem(STORAGE_KEYS.PASSWORD_HASH),
    ]);

    const status = {
      isEnabled: enabled === 'true',
      authMethod: method || 'none',
      hasPassword: !!hasPassword,
    };

    return status;
  } catch (error) {
    console.error('❌ Failed to check app lock status:', error);
    return null;
  }
};

/**
 * Demo: Test password verification
 */
export const testPasswordVerification = async (password: string) => {
  try {
    const storedHash = await AsyncStorage.getItem(STORAGE_KEYS.PASSWORD_HASH);
    if (!storedHash) {
      return false;
    }

    // Hash the input password
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const inputHash = hash.toString();

    const isValid = inputHash === storedHash;

    return isValid;
  } catch (error) {
    console.error('❌ Failed to verify password:', error);
    return false;
  }
};

// Export demo functions for easy access in development
export const appLockDemo = {
  enable: enableDemoAppLock,
  disable: disableDemoAppLock,
  status: checkAppLockStatus,
  testPassword: testPasswordVerification,
};

// Usage examples:
// import { appLockDemo } from '../utils/appLockDemo';
//
// // Enable app lock with default password 'demo123'
// await appLockDemo.enable();
//
// // Enable app lock with custom password
// await appLockDemo.enable('mypassword');
//
// // Check current status
// await appLockDemo.status();
//
// // Test password
// await appLockDemo.testPassword('demo123');
//
// // Disable app lock
// await appLockDemo.disable();
