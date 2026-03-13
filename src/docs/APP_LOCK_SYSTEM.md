# App Lock System Documentation

## Overview
The app lock system provides comprehensive security for the application using password and/or biometric authentication. It automatically locks the app when backgrounded and requires authentication to unlock.

## Components

### 1. SecurityContext (`src/contexts/SecurityContext.tsx`)
- Manages app lock state and authentication methods
- Handles password hashing and verification
- Monitors app state changes for automatic locking
- Provides biometric authentication simulation
- Stores settings in AsyncStorage

### 2. AppLockScreen (`src/screens/AppLock/AppLockScreen.tsx`)
- Authentication interface when app is locked
- Supports both password and biometric authentication
- Tracks failed attempts (max 5)
- Provides visual feedback and error handling

### 3. SecuritySettingsScreen (`src/screens/SecuritySettings/SecuritySettingsScreen.tsx`)
- Configuration interface for app lock settings
- Enable/disable app lock
- Set up password authentication
- Change existing passwords
- Test app lock functionality

### 4. AppContainer Integration (`src/components/AppContainer.tsx`)
- Checks security state on app load
- Shows AppLockScreen when app is locked
- Maintains proper flow: Splash → Lock → Main App

## Features

### Authentication Methods
- **Password Only**: 4+ character password requirement
- **Biometric Only**: Fingerprint/Face ID (simulated)
- **Both**: Password + Biometric for enhanced security
- **None**: No authentication (default)

### Security Features
- Automatic lock after 30 seconds in background
- Failed attempt tracking (max 5 attempts)
- Secure password hashing
- Persistent settings storage
- App state monitoring

### User Experience
- Smooth integration with existing app flow
- Theme-aware UI components
- Comprehensive error handling
- Visual feedback for all actions
- Test functionality for verification

## Usage Flow

### Initial Setup
1. User navigates to Settings → App Lock
2. Toggles "Enable App Lock" switch
3. Sets up password (4+ characters)
4. Biometric is automatically enabled if available
5. App locks immediately after setup

### Daily Usage
1. App locks when backgrounded for 30+ seconds
2. User returns to app and sees AppLockScreen
3. User authenticates with password or biometric
4. App unlocks and shows main interface

### Configuration Changes
1. User can change password anytime
2. User can disable app lock completely
3. User can test lock functionality
4. Settings persist across app restarts

## Technical Implementation

### State Management
```typescript
interface SecurityContextType {
  isLocked: boolean;
  isEnabled: boolean;
  authMethod: AuthMethod;
  hasPassword: boolean;
  hasBiometric: boolean;
  // ... methods
}
```

### App Flow Integration
```
App Start → Splash Screen → Security Check → Main App
                              ↓
                         App Lock Screen (if locked)
```

### Storage Keys
- `@security_enabled`: Boolean for app lock status
- `@auth_method`: Authentication method preference
- `@password_hash`: Hashed password storage
- `@lock_timeout`: Lock timeout configuration

## Security Considerations

### Password Security
- Passwords are hashed before storage
- Simple hash function (production should use crypto library)
- No plain text password storage
- Minimum 4 character requirement

### Biometric Security
- Currently simulated for development
- Production should use react-native-biometrics
- Fallback to password if biometric fails
- Device-level security integration

### App State Security
- Monitors app background/foreground states
- Automatic locking prevents unauthorized access
- Timer-based locking mechanism
- Immediate lock on security enable

## Future Enhancements

### Planned Features
- Real biometric library integration
- Configurable lock timeout
- PIN code authentication option
- Security question backup
- Encryption for sensitive data

### Production Considerations
- Replace hash function with crypto library
- Add proper biometric library
- Implement secure keychain storage
- Add audit logging
- Enhanced error handling

## Testing

### Manual Testing
1. Enable app lock with password
2. Background app for 30+ seconds
3. Return to app and verify lock screen
4. Test password authentication
5. Test biometric authentication (simulated)
6. Test failed attempt handling
7. Test settings changes

### Integration Points
- Splash screen integration ✅
- Theme system integration ✅
- Navigation integration ✅
- Settings screen integration ✅
- Context provider integration ✅

## Troubleshooting

### Common Issues
- **App not locking**: Check if security is enabled in settings
- **Password not working**: Verify password was set correctly
- **Biometric not available**: Check device capabilities
- **Settings not persisting**: Verify AsyncStorage permissions

### Debug Steps
1. Check SecurityContext state
2. Verify AsyncStorage values
3. Monitor app state changes
4. Test authentication methods individually
5. Check navigation flow integration