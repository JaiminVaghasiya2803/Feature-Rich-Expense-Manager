# App Lock Troubleshooting Guide

## Issue: App Not Getting Unlocked

### Debugging Steps

1. **Check Console Logs**
   - Look for debug messages starting with 🔐, 🔓, ✅, ❌
   - Key messages to look for:
     - "🔍 Loading security settings..."
     - "🔒 Security enabled, locking app initially"
     - "🔐 Attempting password authentication..."
     - "🔓 Unlocking app..."

2. **Verify Storage Values**
   ```javascript
   // In React Native debugger console:
   global.debugAppLock.checkStorage()
   ```

3. **Test Password Verification**
   ```javascript
   // Test if password verification works:
   global.debugAppLock.testPassword("your_password")
   ```

4. **Check Security State**
   - Look for "📊 Current Security State" logs
   - Verify `isLocked`, `isEnabled`, `authMethod` values

### Common Issues & Solutions

#### 1. Password Not Working
**Symptoms:** Password entered but app doesn't unlock
**Debug:** Check console for "🔍 Password verification result: false"
**Solution:** 
- Verify password was set correctly
- Test with `global.debugAppLock.testPassword("password")`
- Clear and reset app lock if needed

#### 2. Biometric Authentication Failing
**Symptoms:** Biometric prompt appears but doesn't unlock
**Debug:** Look for "🔍 Biometric authentication result: false"
**Solution:**
- Currently using simulated biometric (always returns true after 1 second)
- Check if `hasBiometric` is true in security state

#### 3. App Immediately Locks After Setup
**Symptoms:** App locks right after enabling security
**Debug:** Look for "🔒 Security enabled, locking app initially"
**Solution:** This is expected behavior - app should lock immediately after enabling security

#### 4. State Not Updating
**Symptoms:** `unlockApp()` called but app still shows lock screen
**Debug:** Look for "🔄 Security state changed" logs
**Solution:** 
- Check if `isLocked` state is actually changing to `false`
- Verify React context is properly connected

#### 5. App Container Not Responding to State Changes
**Symptoms:** Security state changes but UI doesn't update
**Debug:** Look for "🏠 AppContainer render" logs
**Solution:**
- Verify `useSecurity()` hook is working in AppContainer
- Check if SecurityProvider is properly wrapping the app

### Testing Commands

#### Setup Test Lock
```javascript
// Set up app lock with password "test123"
global.debugAppLock.setupTestLock("test123")
```

#### Clear App Lock
```javascript
// Remove all app lock data
global.debugAppLock.clearAppLock()
```

#### Check Current State
```javascript
// View current AsyncStorage values
global.debugAppLock.checkStorage()
```

### Debug Bypass

In development mode, there's a "DEBUG: Bypass Lock" button at the bottom of the AppLockScreen that will immediately unlock the app for testing purposes.

### Expected Flow

1. **App Start:** 
   - SecurityContext loads settings from AsyncStorage
   - If security enabled, sets `isLocked = true`
   - AppContainer shows AppLockScreen

2. **Authentication:**
   - User enters password or uses biometric
   - Verification succeeds
   - `unlockApp()` called, sets `isLocked = false`
   - AppContainer re-renders and shows main app

3. **State Changes:**
   - Every state change should log "🔄 Security state changed"
   - AppContainer should log render decisions

### Manual Testing Steps

1. **Enable App Lock:**
   ```javascript
   global.debugAppLock.setupTestLock("mypassword")
   ```

2. **Reload App:**
   - App should show lock screen immediately

3. **Test Password:**
   - Enter "mypassword" and tap "Unlock with Password"
   - Should see success logs and app should unlock

4. **Test Biometric:**
   - Tap biometric button
   - Should unlock after 1 second (simulated)

5. **Test Debug Bypass:**
   - Tap "DEBUG: Bypass Lock" button
   - Should unlock immediately

### Production Considerations

- Remove all console.log statements
- Remove debug bypass button
- Implement real biometric authentication
- Add proper error handling
- Consider adding retry limits and timeouts

### If Still Not Working

1. Check React Native debugger console for errors
2. Verify AsyncStorage permissions
3. Test with a fresh app install
4. Check if SecurityProvider is properly positioned in provider hierarchy
5. Verify all imports are correct

### Contact Information

If the issue persists, provide:
- Console logs from app start to unlock attempt
- Security state values
- AsyncStorage values
- Steps to reproduce the issue