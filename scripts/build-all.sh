
#!/bin/bash

# Power Components - Build All Script
# Builds both Power Redact and Power Canvas plugins

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Configuration
BUILD_MODE="${1:-production}"  # production or development
VERBOSE="${2:-false}"
CLEAN_BUILD="${3:-false}"

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if ! command_exists node; then
        log_error "Node.js is not installed. Please install Node.js 16+ and try again."
        exit 1
    fi
    
    if ! command_exists npm; then
        log_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    REQUIRED_VERSION="16.0.0"
    
    if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION') ? 0 : 1)" 2>/dev/null; then
        log_warning "Node.js version $NODE_VERSION detected. Version $REQUIRED_VERSION or higher is recommended."
    fi
    
    log_success "Prerequisites check completed"
}

# Clean build directories
clean_build_dirs() {
    if [ "$CLEAN_BUILD" = "true" ]; then
        log_info "Cleaning build directories..."
        
        # Clean Power Redact
        if [ -d "$PROJECT_ROOT/power-redact/dist" ]; then
            rm -rf "$PROJECT_ROOT/power-redact/dist"
            log_info "Cleaned Power Redact dist directory"
        fi
        
        if [ -d "$PROJECT_ROOT/power-redact/node_modules" ]; then
            rm -rf "$PROJECT_ROOT/power-redact/node_modules"
            log_info "Cleaned Power Redact node_modules"
        fi
        
        # Clean Power Canvas
        if [ -d "$PROJECT_ROOT/power-canvas/dist" ]; then
            rm -rf "$PROJECT_ROOT/power-canvas/dist"
            log_info "Cleaned Power Canvas dist directory"
        fi
        
        if [ -d "$PROJECT_ROOT/power-canvas/node_modules" ]; then
            rm -rf "$PROJECT_ROOT/power-canvas/node_modules"
            log_info "Cleaned Power Canvas node_modules"
        fi
        
        log_success "Build directories cleaned"
    fi
}

# Install dependencies for a plugin
install_dependencies() {
    local plugin_dir="$1"
    local plugin_name="$2"
    
    log_info "Installing dependencies for $plugin_name..."
    
    cd "$plugin_dir"
    
    if [ "$VERBOSE" = "true" ]; then
        npm install
    else
        npm install --silent
    fi
    
    if [ $? -eq 0 ]; then
        log_success "$plugin_name dependencies installed"
    else
        log_error "Failed to install dependencies for $plugin_name"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
}

# Build a plugin
build_plugin() {
    local plugin_dir="$1"
    local plugin_name="$2"
    
    log_info "Building $plugin_name..."
    
    cd "$plugin_dir"
    
    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        log_error "package.json not found in $plugin_dir"
        return 1
    fi
    
    # Run build command based on mode
    if [ "$BUILD_MODE" = "development" ]; then
        BUILD_CMD="npm run build:dev"
    else
        BUILD_CMD="npm run build"
    fi
    
    # Check if build script exists
    if ! npm run | grep -q "build"; then
        log_warning "Build script not found for $plugin_name, trying alternative commands..."
        
        # Try common build alternatives
        if npm run | grep -q "compile"; then
            BUILD_CMD="npm run compile"
        elif npm run | grep -q "dist"; then
            BUILD_CMD="npm run dist"
        else
            log_error "No suitable build command found for $plugin_name"
            return 1
        fi
    fi
    
    # Execute build
    if [ "$VERBOSE" = "true" ]; then
        eval "$BUILD_CMD"
    else
        eval "$BUILD_CMD" --silent
    fi
    
    if [ $? -eq 0 ]; then
        log_success "$plugin_name built successfully"
        
        # Verify build output
        if [ -f "main.js" ] && [ -f "manifest.json" ]; then
            log_success "$plugin_name build artifacts verified"
        else
            log_warning "$plugin_name build completed but some artifacts may be missing"
        fi
    else
        log_error "Failed to build $plugin_name"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
}

# Run tests for a plugin
run_tests() {
    local plugin_dir="$1"
    local plugin_name="$2"
    
    if [ "$BUILD_MODE" = "production" ]; then
        log_info "Running tests for $plugin_name..."
        
        cd "$plugin_dir"
        
        # Check if test script exists
        if npm run | grep -q "test"; then
            if [ "$VERBOSE" = "true" ]; then
                npm test
            else
                npm test --silent
            fi
            
            if [ $? -eq 0 ]; then
                log_success "$plugin_name tests passed"
            else
                log_error "$plugin_name tests failed"
                return 1
            fi
        else
            log_warning "No test script found for $plugin_name"
        fi
        
        cd "$PROJECT_ROOT"
    fi
}

# Lint code for a plugin
lint_code() {
    local plugin_dir="$1"
    local plugin_name="$2"
    
    if [ "$BUILD_MODE" = "production" ]; then
        log_info "Linting code for $plugin_name..."
        
        cd "$plugin_dir"
        
        # Check if lint script exists
        if npm run | grep -q "lint"; then
            if [ "$VERBOSE" = "true" ]; then
                npm run lint
            else
                npm run lint --silent
            fi
            
            if [ $? -eq 0 ]; then
                log_success "$plugin_name code linting passed"
            else
                log_warning "$plugin_name code linting found issues"
                # Don't fail build on linting issues, just warn
            fi
        else
            log_warning "No lint script found for $plugin_name"
        fi
        
        cd "$PROJECT_ROOT"
    fi
}

# Generate build report
generate_build_report() {
    log_info "Generating build report..."
    
    REPORT_FILE="$PROJECT_ROOT/build-report.txt"
    
    cat > "$REPORT_FILE" << EOF
Power Components Build Report
============================
Build Date: $(date)
Build Mode: $BUILD_MODE
Node Version: $(node --version)
npm Version: $(npm --version)

Power Redact Plugin:
EOF
    
    if [ -f "$PROJECT_ROOT/power-redact/main.js" ]; then
        echo "  Status: Built successfully" >> "$REPORT_FILE"
        echo "  Size: $(du -h "$PROJECT_ROOT/power-redact/main.js" | cut -f1)" >> "$REPORT_FILE"
    else
        echo "  Status: Build failed or missing" >> "$REPORT_FILE"
    fi
    
    cat >> "$REPORT_FILE" << EOF

Power Canvas Plugin:
EOF
    
    if [ -f "$PROJECT_ROOT/power-canvas/main.js" ]; then
        echo "  Status: Built successfully" >> "$REPORT_FILE"
        echo "  Size: $(du -h "$PROJECT_ROOT/power-canvas/main.js" | cut -f1)" >> "$REPORT_FILE"
    else
        echo "  Status: Build failed or missing" >> "$REPORT_FILE"
    fi
    
    echo "" >> "$REPORT_FILE"
    echo "Build completed at: $(date)" >> "$REPORT_FILE"
    
    log_success "Build report generated: $REPORT_FILE"
}

# Main build process
main() {
    log_info "Starting Power Components build process..."
    log_info "Build mode: $BUILD_MODE"
    log_info "Project root: $PROJECT_ROOT"
    
    # Check prerequisites
    check_prerequisites
    
    # Clean build directories if requested
    clean_build_dirs
    
    # Build Power Redact Plugin
    log_info "=== Building Power Redact Plugin ==="
    
    if [ -d "$PROJECT_ROOT/power-redact" ]; then
        install_dependencies "$PROJECT_ROOT/power-redact" "Power Redact"
        lint_code "$PROJECT_ROOT/power-redact" "Power Redact"
        run_tests "$PROJECT_ROOT/power-redact" "Power Redact"
        build_plugin "$PROJECT_ROOT/power-redact" "Power Redact"
    else
        log_error "Power Redact plugin directory not found"
        exit 1
    fi
    
    # Build Power Canvas Plugin
    log_info "=== Building Power Canvas Plugin ==="
    
    if [ -d "$PROJECT_ROOT/power-canvas" ]; then
        install_dependencies "$PROJECT_ROOT/power-canvas" "Power Canvas"
        lint_code "$PROJECT_ROOT/power-canvas" "Power Canvas"
        run_tests "$PROJECT_ROOT/power-canvas" "Power Canvas"
        build_plugin "$PROJECT_ROOT/power-canvas" "Power Canvas"
    else
        log_error "Power Canvas plugin directory not found"
        exit 1
    fi
    
    # Generate build report
    generate_build_report
    
    log_success "All plugins built successfully!"
    log_info "Build artifacts:"
    log_info "  - Power Redact: $PROJECT_ROOT/power-redact/main.js"
    log_info "  - Power Canvas: $PROJECT_ROOT/power-canvas/main.js"
    
    if [ "$BUILD_MODE" = "development" ]; then
        log_info "Development build completed. Use 'npm run dev' for hot reload."
    else
        log_info "Production build completed. Ready for distribution."
    fi
}

# Help function
show_help() {
    cat << EOF
Power Components Build Script

Usage: $0 [BUILD_MODE] [VERBOSE] [CLEAN_BUILD]

Arguments:
  BUILD_MODE    Build mode: 'production' (default) or 'development'
  VERBOSE       Verbose output: 'true' or 'false' (default)
  CLEAN_BUILD   Clean before build: 'true' or 'false' (default)

Examples:
  $0                           # Production build, quiet
  $0 development               # Development build
  $0 production true           # Production build, verbose
  $0 production true true      # Production build, verbose, clean

Environment Variables:
  NODE_ENV      Set to 'development' or 'production'
  CI            Set to 'true' for CI/CD environments

EOF
}

# Handle command line arguments
case "$1" in
    -h|--help|help)
        show_help
        exit 0
        ;;
    *)
        main "$@"
        ;;
esac

