# CI/CD Pipeline Setup

## Overview
This project uses GitHub Actions for continuous integration and deployment, ensuring code quality and preventing issues from reaching production.

## Pipeline Structure

### 1. Lint Check Pipeline (`.github/workflows/lint.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests
**Purpose:** Fast feedback on code quality

- ✅ ESLint validation
- ✅ TypeScript compilation check
- ⚡ Runs in ~2-3 minutes

### 2. Full CI Pipeline (`.github/workflows/ci.yml`)
**Triggers:** Push to `main`/`develop`, Pull Requests
**Purpose:** Comprehensive testing and building

- ✅ Lint and TypeScript checks
- ✅ Unit tests with coverage
- ✅ Android APK build
- ✅ iOS build (macOS runner)
- ✅ Security audit
- ⚡ Runs in ~15-20 minutes

### 3. Branch Protection (`.github/workflows/branch-protection.yml`)
**Triggers:** Pull Requests to `main`
**Purpose:** Strict quality gate for production

- ✅ Zero lint errors allowed (`lint:check`)
- ✅ TypeScript compilation required
- ✅ 80% test coverage minimum
- ✅ Security audit (high severity only)
- ✅ TODO/FIXME comment limit (max 10)

## Pre-commit Hooks

### Husky Setup
Automatically installed via `npm install`:
```bash
npm run prepare  # Sets up husky hooks
```

### Pre-commit Checks
Before each commit, the following runs automatically:
- ESLint with auto-fix
- TypeScript compilation check
- Unit tests
- Prettier formatting

### Lint-staged
Only lints and formats changed files for faster commits:
```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md}": ["prettier --write"]
}
```

## Available Scripts

### Linting
```bash
npm run lint          # Check for lint issues
npm run lint:fix      # Fix auto-fixable lint issues
npm run lint:check    # Strict lint check (zero warnings)
```

### TypeScript
```bash
npm run type-check    # Check TypeScript compilation
```

### Testing
```bash
npm test              # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Formatting
```bash
npx prettier --write . # Format all files
```

## Branch Protection Rules

### Main Branch
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Require linear history
- ✅ Include administrators

### Required Status Checks
1. `lint / ESLint Check`
2. `typescript-check / TypeScript Check`
3. `quality-gate / Quality Gate`
4. `lint-and-test / Lint and Test`

## Quality Standards

### Code Quality
- **Zero ESLint errors** in production branches
- **Maximum 78 warnings** allowed (current baseline)
- **TypeScript strict mode** enabled
- **Prettier formatting** enforced

### Test Coverage
- **Minimum 80%** overall coverage
- **Unit tests required** for new features
- **Integration tests** for critical paths

### Security
- **npm audit** with high severity threshold
- **Dependency vulnerability** scanning
- **No hardcoded secrets** in code

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Git Hooks
```bash
npm run prepare
```

### 3. Configure GitHub Repository

#### Branch Protection Rules
1. Go to Settings → Branches
2. Add rule for `main` branch:
   - Require pull request reviews (1 reviewer)
   - Require status checks to pass
   - Require branches to be up to date
   - Include administrators

#### Required Status Checks
Add these checks as required:
- `lint / ESLint Check`
- `typescript-check / TypeScript Check`
- `quality-gate / Quality Gate`

### 4. Environment Variables (Optional)
For enhanced features, add these secrets:
- `CODECOV_TOKEN` - For coverage reporting
- `SLACK_WEBHOOK` - For build notifications

## Workflow Examples

### Feature Development
```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes
# ... code changes ...

# 3. Pre-commit hooks run automatically
git add .
git commit -m "feat: add new feature"

# 4. Push and create PR
git push origin feature/new-feature
# Create PR via GitHub UI

# 5. CI pipeline runs automatically
# 6. Address any failures
# 7. Merge after approval
```

### Hotfix Process
```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix

# 2. Make minimal changes
# ... fix code ...

# 3. Commit and push
git add .
git commit -m "fix: critical security issue"
git push origin hotfix/critical-fix

# 4. Create PR with "hotfix" label
# 5. Fast-track review and merge
```

## Troubleshooting

### Common Issues

#### Pre-commit Hook Failures
```bash
# Skip hooks temporarily (not recommended)
git commit --no-verify -m "message"

# Fix lint issues
npm run lint:fix

# Fix TypeScript issues
npm run type-check
```

#### CI Pipeline Failures
```bash
# Run checks locally
npm run lint:check
npm run type-check
npm run test:coverage

# Check specific file
npx eslint src/path/to/file.ts
```

#### Coverage Below Threshold
```bash
# Generate coverage report
npm run test:coverage

# Open coverage report
open coverage/lcov-report/index.html
```

### Performance Optimization

#### Faster CI Runs
- Use `npm ci` instead of `npm install`
- Cache node_modules between runs
- Run lint and tests in parallel
- Skip unnecessary steps for draft PRs

#### Local Development
- Use `lint-staged` for faster commits
- Run `type-check` in watch mode during development
- Use Jest watch mode for TDD

## Monitoring and Metrics

### Build Status
- Monitor pipeline success rates
- Track build duration trends
- Set up alerts for failures

### Code Quality Metrics
- ESLint warning trends
- Test coverage over time
- TypeScript error reduction
- Security vulnerability count

### Performance Metrics
- Bundle size tracking
- Build time optimization
- Test execution time

## Future Enhancements

### Planned Improvements
- [ ] Automated dependency updates (Dependabot)
- [ ] Performance regression testing
- [ ] Visual regression testing
- [ ] Automated changelog generation
- [ ] Release automation
- [ ] Slack/Discord notifications
- [ ] Code quality badges
- [ ] Deployment previews

### Advanced Features
- [ ] Parallel test execution
- [ ] Cross-platform testing matrix
- [ ] E2E testing with Detox
- [ ] Bundle analysis and optimization
- [ ] Lighthouse CI for performance
- [ ] Semantic versioning automation

This CI/CD setup ensures high code quality while maintaining developer productivity and fast feedback loops.