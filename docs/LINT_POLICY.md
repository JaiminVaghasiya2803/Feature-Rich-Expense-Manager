# Lint Policy

## Overview
This document outlines the linting policy for the React Native expense manager application.

## Policy: Errors Block, Warnings Allow

### Philosophy
- **ESLint Errors**: Block commits and deployments
- **ESLint Warnings**: Allow but encourage fixing
- **TypeScript Errors**: Block commits and deployments
- **Formatting Issues**: Allow but encourage fixing

### Implementation

#### GitHub Actions CI/CD
- **Command Used**: `npm run lint` (not `npm run lint:check`)
- **Behavior**: Fails only on ESLint errors, warnings are reported but don't block
- **Exit Code**: 0 for warnings, 1 for errors

#### Pre-commit Hooks
- **Command Used**: `npm run lint` 
- **Behavior**: Blocks commits only on ESLint errors
- **lint-staged**: Auto-fixes what it can, reports remaining issues

#### Available Scripts
```json
{
  "lint": "eslint .",                    // Fails on errors only
  "lint:fix": "eslint . --fix",          // Auto-fix what can be fixed
  "lint:check": "eslint . --max-warnings 0"  // Fails on warnings (strict mode)
}
```

## Current Status
- **49 ESLint warnings** - Allowed, not blocking
- **0 ESLint errors** - Would block if present
- **0 TypeScript errors** - Would block if present

## Benefits of This Approach

### Developer Experience
- ✅ **Faster development** - warnings don't block progress
- ✅ **Flexible workflow** - developers can address warnings incrementally
- ✅ **Focus on critical issues** - errors indicate real problems

### Code Quality
- ✅ **Prevents broken code** - errors block deployment
- ✅ **Encourages best practices** - warnings provide guidance
- ✅ **Gradual improvement** - warnings can be addressed over time

### Team Productivity
- ✅ **Reduces friction** - no need to fix every warning immediately
- ✅ **Maintains momentum** - features can be shipped with warnings
- ✅ **Quality awareness** - warnings are visible but not blocking

## When Warnings Become Errors

Certain ESLint rules are configured as errors (not warnings) because they indicate serious issues:

### Current Error-Level Rules
- **Syntax errors** - Invalid JavaScript/TypeScript syntax
- **Undefined variables** - Using variables that don't exist
- **Unreachable code** - Code that will never execute
- **Duplicate keys** - Object keys defined multiple times

### Current Warning-Level Rules
- **@typescript-eslint/no-explicit-any** - Using `any` type
- **@typescript-eslint/no-unused-vars** - Unused variables
- **@typescript-eslint/no-empty-object-type** - Empty interfaces
- **@typescript-eslint/no-namespace** - Using namespaces instead of modules

## Monitoring and Improvement

### Regular Review
- **Weekly**: Review warning count trends
- **Monthly**: Evaluate if warnings should be promoted to errors
- **Quarterly**: Review and update ESLint configuration

### Metrics to Track
- Total warning count over time
- New warnings introduced per PR
- Warning resolution rate
- Developer feedback on policy

### Gradual Improvement Strategy
1. **Fix easy warnings** during regular development
2. **Batch fix similar warnings** during maintenance windows
3. **Promote critical warnings to errors** after team discussion
4. **Update documentation** as policies evolve

## Developer Guidelines

### When Working on Features
- ✅ **Fix errors immediately** - they will block your PR
- ⚠️ **Consider fixing warnings** - especially if they're in code you're touching
- 📝 **Don't introduce new warnings** - try to leave code better than you found it

### When Doing Maintenance
- 🎯 **Target warning reduction** - good time to clean up warnings
- 📊 **Track progress** - celebrate warning count reductions
- 🔄 **Share learnings** - help team understand common warning patterns

### Best Practices
- **Use `npm run lint:fix`** before committing to auto-fix what you can
- **Run `npm run lint`** to see current warnings in your changes
- **Use `npm run lint:check`** when you want to see all warnings as failures (optional)

## Configuration Files

### ESLint Config (`eslint.config.mts`)
```typescript
export default [
  // ... other config
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",     // Warning, not error
      "@typescript-eslint/no-unused-vars": "warn",      // Warning, not error
      "@typescript-eslint/no-empty-object-type": "warn", // Warning, not error
      "no-undef": "off"  // Disabled for TypeScript
    }
  }
];
```

### Package.json Scripts
```json
{
  "scripts": {
    "lint": "eslint .",                    // Used in CI - errors only
    "lint:fix": "eslint . --fix",          // Auto-fix command
    "lint:check": "eslint . --max-warnings 0"  // Strict mode - optional use
  }
}
```

## Conclusion

This policy balances code quality with developer productivity. By blocking only on errors while allowing warnings, we:

- **Prevent broken code** from reaching production
- **Maintain development velocity** without unnecessary friction
- **Encourage continuous improvement** through visible warnings
- **Provide flexibility** for teams to address warnings incrementally

The policy can be adjusted based on team feedback and project maturity.