module.exports = {
  root: true,
  extends: ['@react-native'],
  rules: {
    // Allow warnings but not errors
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-object-type': 'warn',
    '@typescript-eslint/no-namespace': 'warn',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-undef': 'off',
    'react-native/no-inline-styles': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-bitwise': 'off', // Allow bitwise operations
    'react-hooks/exhaustive-deps': 'warn', // Make this a warning instead of error
    'react-hooks/rules-of-hooks': 'error', // Keep this as error - it's critical
    'react/no-unstable-nested-components': 'warn', // Make this a warning
  },
};
