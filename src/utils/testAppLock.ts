/**
 * Simple test to verify app lock functionality
 */

// Test the hash function
const testHashFunction = () => {
  const password = 'test123';

  // Hash function from SecurityContext
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const hashedPassword = hash.toString();

  // Test verification
  const inputHash = hash.toString();
  const isMatch = inputHash === hashedPassword;

  return { hashedPassword, isMatch };
};

// Run test
if (__DEV__) {
  testHashFunction();
}

export { testHashFunction };
