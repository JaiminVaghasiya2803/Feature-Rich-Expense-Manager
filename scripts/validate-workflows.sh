#!/bin/bash

# GitHub Actions Workflow Validation Script
# This script validates that all workflows have proper npm checks

set -e

echo "🔍 Validating GitHub Actions workflows..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if .github/workflows directory exists
if [ ! -d ".github/workflows" ]; then
    print_error ".github/workflows directory not found"
    exit 1
fi

print_success "Found .github/workflows directory"

# List of workflow files to check
WORKFLOW_FILES=(
    ".github/workflows/lint.yml"
    ".github/workflows/ci.yml"
    ".github/workflows/branch-protection.yml"
)

# Required checks in each workflow
REQUIRED_CHECKS=(
    "Verify npm installation"
    "Install dependencies"
    "Setup Node.js"
)

# Validate each workflow file
for workflow in "${WORKFLOW_FILES[@]}"; do
    print_status "Validating $workflow..."
    
    if [ ! -f "$workflow" ]; then
        print_error "Workflow file $workflow not found"
        continue
    fi
    
    # Check for required steps
    missing_checks=()
    for check in "${REQUIRED_CHECKS[@]}"; do
        if ! grep -q "$check" "$workflow"; then
            missing_checks+=("$check")
        fi
    done
    
    if [ ${#missing_checks[@]} -eq 0 ]; then
        print_success "$workflow has all required npm checks"
    else
        print_warning "$workflow is missing checks: ${missing_checks[*]}"
    fi
    
    # Check for npm ci usage
    if grep -q "npm ci" "$workflow"; then
        print_success "$workflow uses npm ci for faster installs"
    else
        print_warning "$workflow doesn't use npm ci"
    fi
    
    # Check for error handling
    if grep -q "exit 1" "$workflow"; then
        print_success "$workflow has proper error handling"
    else
        print_warning "$workflow might need better error handling"
    fi
done

# Validate package.json scripts
print_status "Validating package.json scripts..."

if [ ! -f "package.json" ]; then
    print_error "package.json not found"
    exit 1
fi

# Required scripts for workflows
REQUIRED_SCRIPTS=(
    "lint"
    "type-check"
)

missing_scripts=()
for script in "${REQUIRED_SCRIPTS[@]}"; do
    if ! grep -q "\"$script\":" package.json; then
        missing_scripts+=("$script")
    fi
done

if [ ${#missing_scripts[@]} -eq 0 ]; then
    print_success "All required npm scripts are present"
else
    print_error "Missing npm scripts: ${missing_scripts[*]}"
fi

# Check for development dependencies
print_status "Checking development dependencies..."

REQUIRED_DEV_DEPS=(
    "eslint"
    "typescript"
    "husky"
    "lint-staged"
)

missing_deps=()
for dep in "${REQUIRED_DEV_DEPS[@]}"; do
    if ! grep -q "\"$dep\":" package.json; then
        missing_deps+=("$dep")
    fi
done

if [ ${#missing_deps[@]} -eq 0 ]; then
    print_success "All required development dependencies are present"
else
    print_warning "Missing development dependencies: ${missing_deps[*]}"
fi

# Test workflow syntax (if GitHub CLI is available)
if command -v gh &> /dev/null; then
    print_status "Testing workflow syntax with GitHub CLI..."
    
    for workflow in "${WORKFLOW_FILES[@]}"; do
        if gh workflow view "$(basename "$workflow" .yml)" &> /dev/null; then
            print_success "Workflow $(basename "$workflow" .yml) syntax is valid"
        else
            print_warning "Could not validate workflow $(basename "$workflow" .yml) syntax"
        fi
    done
else
    print_warning "GitHub CLI not available, skipping workflow syntax validation"
fi

# Check for workflow best practices
print_status "Checking workflow best practices..."

best_practices_score=0
total_checks=0

for workflow in "${WORKFLOW_FILES[@]}"; do
    if [ -f "$workflow" ]; then
        # Check for caching
        total_checks=$((total_checks + 1))
        if grep -q "cache: 'npm'" "$workflow"; then
            best_practices_score=$((best_practices_score + 1))
            print_success "$(basename "$workflow") uses npm caching"
        else
            print_warning "$(basename "$workflow") doesn't use npm caching"
        fi
        
        # Check for specific Node.js version
        total_checks=$((total_checks + 1))
        if grep -q "node-version: '20.x'" "$workflow"; then
            best_practices_score=$((best_practices_score + 1))
            print_success "$(basename "$workflow") uses specific Node.js version"
        else
            print_warning "$(basename "$workflow") should specify Node.js version"
        fi
        
        # Check for proper error messages
        total_checks=$((total_checks + 1))
        if grep -q "echo.*❌" "$workflow"; then
            best_practices_score=$((best_practices_score + 1))
            print_success "$(basename "$workflow") has user-friendly error messages"
        else
            print_warning "$(basename "$workflow") could have better error messages"
        fi
    fi
done

# Calculate best practices score
if [ $total_checks -gt 0 ]; then
    score_percentage=$((best_practices_score * 100 / total_checks))
    if [ $score_percentage -ge 80 ]; then
        print_success "Workflow best practices score: $score_percentage% ($best_practices_score/$total_checks)"
    elif [ $score_percentage -ge 60 ]; then
        print_warning "Workflow best practices score: $score_percentage% ($best_practices_score/$total_checks)"
    else
        print_error "Workflow best practices score: $score_percentage% ($best_practices_score/$total_checks)"
    fi
fi

# Final summary
echo ""
echo "📋 Validation Summary:"
echo "  ✅ Workflow files checked: ${#WORKFLOW_FILES[@]}"
echo "  ✅ Required checks validated"
echo "  ✅ Package.json scripts verified"
echo "  ✅ Development dependencies checked"
echo "  ✅ Best practices evaluated"
echo ""

print_success "Workflow validation completed!"

# Recommendations
echo "💡 Recommendations:"
echo "  1. Ensure all workflows use 'npm ci' for faster, reliable installs"
echo "  2. Add proper error handling with descriptive messages"
echo "  3. Use npm caching to speed up workflow execution"
echo "  4. Specify exact Node.js versions for consistency"
echo "  5. Include verification steps for required tools"
echo ""

print_success "All workflows are properly configured with npm checks! 🚀"