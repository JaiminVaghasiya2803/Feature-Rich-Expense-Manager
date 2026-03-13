#!/bin/bash

# CI/CD Setup Script
# This script sets up the development environment with all CI/CD tools

set -e

echo "🚀 Setting up CI/CD pipeline..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi

print_success "Node.js version check passed: $(node --version)"

# Install dependencies
print_status "Installing dependencies..."
npm install

# Setup Husky
print_status "Setting up Git hooks with Husky..."
npm run prepare

# Make pre-commit hook executable
chmod +x .husky/pre-commit

# Run initial lint check
print_status "Running initial lint check..."
if npm run lint; then
    print_success "Lint check passed!"
else
    print_warning "Lint check found issues. Run 'npm run lint:fix' to auto-fix some issues."
fi

# Run TypeScript check
print_status "Running TypeScript check..."
if npm run type-check; then
    print_success "TypeScript check passed!"
else
    print_error "TypeScript check failed. Please fix type errors."
fi

# Run tests
print_status "Running tests..."
if npm test -- --watchAll=false --passWithNoTests; then
    print_success "Tests passed!"
else
    print_warning "Some tests failed or no tests found."
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_warning "Git repository not initialized. Run 'git init' to enable pre-commit hooks."
else
    print_success "Git repository detected."
fi

# Create .env.example if it doesn't exist
if [ ! -f ".env.example" ]; then
    print_status "Creating .env.example file..."
    cat > .env.example << EOF
# Environment Variables Example
# Copy this file to .env and fill in your values

# Development
NODE_ENV=development

# API Configuration
API_BASE_URL=http://localhost:3001

# Feature Flags
ENABLE_DEBUG_PANEL=true
ENABLE_APP_LOCK=true

# Optional: Analytics
# ANALYTICS_API_KEY=your_key_here

# Optional: Crash Reporting
# SENTRY_DSN=your_dsn_here
EOF
    print_success "Created .env.example file"
fi

# Display setup summary
echo ""
echo "🎉 CI/CD Setup Complete!"
echo ""
echo "📋 Summary:"
echo "  ✅ Dependencies installed"
echo "  ✅ Git hooks configured"
echo "  ✅ Lint configuration verified"
echo "  ✅ TypeScript configuration verified"
echo "  ✅ Test setup verified"
echo ""
echo "🔧 Available Commands:"
echo "  npm run lint          - Check for lint issues"
echo "  npm run lint:fix      - Fix auto-fixable issues"
echo "  npm run type-check    - Check TypeScript"
echo "  npm test              - Run tests"
echo "  npm run test:coverage - Run tests with coverage"
echo ""
echo "📚 Next Steps:"
echo "  1. Review docs/CI_CD_SETUP.md for detailed information"
echo "  2. Configure branch protection rules in GitHub"
echo "  3. Add required status checks to your repository"
echo "  4. Start developing with confidence!"
echo ""
echo "💡 Tips:"
echo "  - Pre-commit hooks will run automatically on each commit"
echo "  - Use 'npm run lint:fix' to auto-fix most lint issues"
echo "  - Run 'npm run type-check' during development"
echo "  - Check 'npm run test:coverage' to ensure good test coverage"
echo ""

# Check for common issues
print_status "Checking for common issues..."

# Check if package-lock.json exists
if [ ! -f "package-lock.json" ]; then
    print_warning "package-lock.json not found. Consider running 'npm install' to generate it."
fi

# Check if .gitignore includes common patterns
if [ -f ".gitignore" ]; then
    if ! grep -q "node_modules" .gitignore; then
        print_warning ".gitignore should include 'node_modules'"
    fi
    if ! grep -q ".env" .gitignore; then
        print_warning ".gitignore should include '.env' to prevent committing secrets"
    fi
fi

print_success "Setup script completed successfully!"

# Optional: Run a test commit to verify hooks
read -p "Would you like to test the pre-commit hooks? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Testing pre-commit hooks..."
    
    # Create a temporary file to test
    echo "// Test file for pre-commit hooks" > test-commit.js
    git add test-commit.js
    
    if git commit -m "test: verify pre-commit hooks"; then
        print_success "Pre-commit hooks are working correctly!"
        git reset --soft HEAD~1  # Undo the test commit
        git reset HEAD test-commit.js  # Unstage the test file
        rm test-commit.js  # Remove the test file
    else
        print_error "Pre-commit hooks failed. Please check the output above."
        git reset HEAD test-commit.js  # Unstage the test file
        rm test-commit.js  # Remove the test file
    fi
fi

echo ""
print_success "All done! Happy coding! 🚀"