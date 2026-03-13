/**
 * Debug utility for App Lock system
 * Use this to test and debug app lock functionality
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SECURITY_ENABLED: '@security_enabled',
  AUTH_METHOD: '@auth_method',
  PASSWORD_HASH: '@password_hash',
};

export const debugAppLock = {
  // Check current storage values
  async checkStorage() {
    try {
      const values = await AsyncStorage.multiGet([
        STORAGE_KEYS.SECURITY_ENABLED,
        STORAGE_KEYS.AUTH_METHOD,
        STORAGE_KEYS.PASSWORD_HASH,
      ]);

      const result = {
        enabled: values[0][1],
        method: values[1][1],
        passwordHash: values[2][1],
      };

      return result;
    } catch (error) {
      console.error('❌ Error checking storage:', error);
      return null;
    }
  },

  // Set up test app lock
  async setupTestLock(password: string = 'test123') {
    try {
      // Hash password (same logic as SecurityContext)
      let hash = 0;
      for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      const hashedPassword = hash.toString();

      await AsyncStorage.multiSet([
        [STORAGE_KEYS.SECURITY_ENABLED, 'true'],
        [STORAGE_KEYS.AUTH_METHOD, 'both'],
        [STORAGE_KEYS.PASSWORD_HASH, hashedPassword],
      ]);

      return true;
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Error setting up test lock:', error);
      }
      return false;
    }
  },

  // Clear all app lock data
  async clearAppLock() {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.SECURITY_ENABLED,
        STORAGE_KEYS.AUTH_METHOD,
        STORAGE_KEYS.PASSWORD_HASH,
      ]);

      return true;
    } catch (error) {
      console.error('❌ Error clearing app lock:', error);
      return false;
    }
  },

  // Test password verification
  async testPassword(password: string) {
    try {
      const storedHash = await AsyncStorage.getItem(STORAGE_KEYS.PASSWORD_HASH);
      if (!storedHash) {
        return false;
      }

      // Hash input password
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
      console.error('❌ Error testing password:', error);
      return false;
    }
  },
};

export default debugAppLock;
