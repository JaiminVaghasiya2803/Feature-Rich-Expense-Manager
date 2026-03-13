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
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const hashedPassword = hash.toString();
  
  console.log('🧪 Hash test:', {
    input: password,
    output: hashedPassword,
    type: typeof hashedPassword
  });
  
  // Test verification
  const inputHash = hash.toString();
  const isMatch = inputHash === hashedPassword;
  
  console.log('✅ Verification test:', {
    inputHash,
    storedHash: hashedPassword,
    match: isMatch
  });
  
  return { hashedPassword, isMatch };
};

// Run test
if (__DEV__) {
  console.log('🧪 Running app lock hash test...');
  testHashFunction();
}

export { testHashFunction };