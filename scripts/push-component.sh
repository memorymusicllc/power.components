#!/bin/bash

# Component Library Push Script
# Automatically pushes new components to the component repository

set -e

# Configuration
COMPONENT_REPO="git@github.com:memorymusicllc/power.components.git"
COMPONENT_BRANCH="main"
MAIN_REPO_BRANCH="component-library"

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

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository"
        exit 1
    fi
}

# Function to check if component repository remote exists
check_component_remote() {
    if ! git remote get-url components > /dev/null 2>&1; then
        print_status "Adding component repository remote..."
        git remote add components "$COMPONENT_REPO"
        print_success "Component repository remote added"
    fi
}

# Function to validate component files
validate_component() {
    local component_path="$1"
    
    print_status "Validating component: $component_path"
    
    # Check if component file exists
    if [[ ! -f "$component_path" ]]; then
        print_error "Component file not found: $component_path"
        return 1
    fi
    
    # Check if component follows naming convention
    if [[ ! "$component_path" =~ ^src/components/ ]]; then
        print_error "Component must be in src/components/ directory"
        return 1
    fi
    
    # Check if component has TypeScript extension
    if [[ ! "$component_path" =~ \.(tsx|ts)$ ]]; then
        print_error "Component must have .tsx or .ts extension"
        return 1
    fi
    
    # Check if component has proper imports
    if ! grep -q "from '@/lib/design-system'" "$component_path"; then
        print_warning "Component should import from design system"
    fi
    
    # Check if component has metadata
    if ! grep -q "metadata" "$component_path"; then
        print_warning "Component should include metadata"
    fi
    
    print_success "Component validation passed"
    return 0
}

# Function to run linting
run_linting() {
    print_status "Running linting checks..."
    
    if command -v npm > /dev/null 2>&1; then
        if npm run lint > /dev/null 2>&1; then
            print_success "Linting passed"
        else
            print_error "Linting failed"
            return 1
        fi
    else
        print_warning "npm not found, skipping linting"
    fi
    
    return 0
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    
    if command -v npm > /dev/null 2>&1; then
        if npm test > /dev/null 2>&1; then
            print_success "Tests passed"
        else
            print_error "Tests failed"
            return 1
        fi
    else
        print_warning "npm not found, skipping tests"
    fi
    
    return 0
}

# Function to commit changes
commit_changes() {
    local commit_message="$1"
    
    print_status "Committing changes..."
    
    git add .
    
    if git diff --cached --quiet; then
        print_warning "No changes to commit"
        return 0
    fi
    
    git commit -m "$commit_message"
    print_success "Changes committed"
}

# Function to push to component repository
push_to_component_repo() {
    print_status "Pushing to component repository..."
    
    # Fetch latest changes from component repository
    git fetch components "$COMPONENT_BRANCH"
    
    # Push current branch to component repository
    if git push components "HEAD:$COMPONENT_BRANCH"; then
        print_success "Successfully pushed to component repository"
    else
        print_error "Failed to push to component repository"
        return 1
    fi
}

# Function to create pull request
create_pull_request() {
    local component_name="$1"
    local branch_name="feature/$component_name"
    
    print_status "Creating pull request for component: $component_name"
    
    # Create a new branch for the component
    git checkout -b "$branch_name" 2>/dev/null || git checkout "$branch_name"
    
    # Push the branch
    git push components "$branch_name"
    
    print_success "Branch $branch_name created and pushed"
    print_status "Please create a pull request at: https://github.com/memorymusicllc/power.components/compare/$COMPONENT_BRANCH...$branch_name"
}

# Main function
main() {
    local component_path="$1"
    local commit_message="$2"
    
    # Validate inputs
    if [[ -z "$component_path" ]]; then
        print_error "Usage: $0 <component_path> [commit_message]"
        print_status "Example: $0 src/components/redux-ui/NewComponent.tsx 'feat: add new component'"
        exit 1
    fi
    
    if [[ -z "$commit_message" ]]; then
        commit_message="feat: add component $(basename "$component_path" .tsx)"
    fi
    
    print_status "Starting component push process..."
    print_status "Component: $component_path"
    print_status "Commit message: $commit_message"
    
    # Run validation checks
    check_git_repo
    check_component_remote
    validate_component "$component_path"
    run_linting
    run_tests
    
    # Commit and push
    commit_changes "$commit_message"
    push_to_component_repo
    
    # Create pull request
    local component_name=$(basename "$component_path" .tsx)
    create_pull_request "$component_name"
    
    print_success "Component push process completed successfully!"
    print_status "Next steps:"
    print_status "1. Review the pull request at the component repository"
    print_status "2. Merge the pull request after approval"
    print_status "3. Update the main application to use the new component"
}

# Run main function with all arguments
main "$@"
