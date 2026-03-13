/**
 * Debug panel for App Lock system
 * Only shows in development mode
 * Can be temporarily added to any screen for testing
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSecurity } from '../contexts/SecurityContext';
import { debugAppLock } from '../utils/debugAppLock';

const AppLockDebugPanel: React.FC = () => {
  const security = useSecurity();
  const [expanded, setExpanded] = useState(false);

  if (!__DEV__) {
    return null; // Only show in development
  }

  const handleSetupTestLock = async () => {
    const success = await debugAppLock.setupTestLock('test123');
    if (success) {
      Alert.alert('Success', 'Test app lock setup with password: test123');
    }
  };

  const handleClearLock = async () => {
    const success = await debugAppLock.clearAppLock();
    if (success) {
      Alert.alert('Success', 'App lock cleared');
    }
  };

  const handleCheckStorage = async () => {
    await debugAppLock.checkStorage();
    Alert.alert('Check Console', 'Storage values logged to console');
  };

  const handleTestPassword = async () => {
    const result = await debugAppLock.testPassword('test123');
    Alert.alert('Password Test', `Result: ${result ? 'Valid' : 'Invalid'}`);
  };

  const handleForceUnlock = () => {
    security.unlockApp();
    Alert.alert('Debug', 'Force unlock called');
  };

  const handleForceLock = () => {
    security.lockApp();
    Alert.alert('Debug', 'Force lock called');
  };

  return (
    <View style={{
      position: 'absolute',
      top: 50,
      right: 10,
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'red',
      zIndex: 1000,
    }}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={{ color: 'red', fontWeight: 'bold' }}>
          🛠️ DEBUG {expanded ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>

      {expanded && (
        <View style={{ marginTop: 10, gap: 5 }}>
          <Text style={{ fontSize: 10, color: 'red' }}>
            Locked: {security.isLocked ? 'YES' : 'NO'}
          </Text>
          <Text style={{ fontSize: 10, color: 'red' }}>
            Enabled: {security.isEnabled ? 'YES' : 'NO'}
          </Text>
          <Text style={{ fontSize: 10, color: 'red' }}>
            Method: {security.authMethod}
          </Text>

          <TouchableOpacity
            onPress={handleSetupTestLock}
            style={{ backgroundColor: 'orange', padding: 5, borderRadius: 3 }}
          >
            <Text style={{ fontSize: 10, color: 'white' }}>Setup Test Lock</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClearLock}
            style={{ backgroundColor: 'red', padding: 5, borderRadius: 3 }}
          >
            <Text style={{ fontSize: 10, color: 'white' }}>Clear Lock</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCheckStorage}
            style={{ backgroundColor: 'blue', padding: 5, borderRadius: 3 }}
          >
            <Text style={{ fontSize: 10, color: 'white' }}>Check Storage</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTestPassword}
            style={{ backgroundColor: 'green', padding: 5, borderRadius: 3 }}
          >
            <Text style={{ fontSize: 10, color: 'white' }}>Test Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleForceUnlock}
            style={{ backgroundColor: 'purple', padding: 5, borderRadius: 3 }}
          >
            <Text style={{ fontSize: 10, color: 'white' }}>Force Unlock</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleForceLock}
            style={{ backgroundColor: 'gray', padding: 5, borderRadius: 3 }}
          >
            <Text style={{ fontSize: 10, color: 'white' }}>Force Lock</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AppLockDebugPanel;