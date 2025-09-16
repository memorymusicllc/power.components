
#!/bin/bash

# Power Components - Install All Script
# Installs both Power Redact and Power Canvas plugins to an Obsidian vault

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
VAULT_PATH="$1"
FORCE_INSTALL="${2:-false}"
BUILD_PLUGINS="${3:-true}"
ENABLE_PLUGINS="${4:-true}"

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

# Show help
show_help() {
    cat << EOF
Power Components Installation Script

Usage: $0 VAULT_PATH [FORCE_INSTALL] [BUILD_PLUGINS] [ENABLE_PLUGINS]

Arguments:
  VAULT_PATH      Path to your Obsidian vault (required)
  FORCE_INSTALL   Force reinstall if plugins exist: 'true' or 'false' (default)
  BUILD_PLUGINS   Build plugins before install: 'true' (default) or 'false'
  ENABLE_PLUGINS  Enable plugins after install: 'true' (default) or 'false'

Examples:
  $0 ~/Documents/MyVault
  $0 /path/to/vault true
  $0 /path/to/vault false false true

The script will:
1. Validate the vault path
2. Build both plugins (if BUILD_PLUGINS=true)
3. Install plugins to vault/.obsidian/plugins/
4. Enable plugins in Obsidian settings (if ENABLE_PLUGINS=true)

EOF
}

# Validate vault path
validate_vault() {
    if [ -z "$VAULT_PATH" ]; then
        log_error "Vault path is required"
        show_help
        exit 1
    fi
    
    # Expand tilde and resolve path
    VAULT_PATH=$(eval echo "$VAULT_PATH")
    VAULT_PATH=$(realpath "$VAULT_PATH" 2>/dev/null || echo "$VAULT_PATH")
    
    if [ ! -d "$VAULT_PATH" ]; then
        log_error "Vault directory does not exist: $VAULT_PATH"
        exit 1
    fi
    
    # Check if it's an Obsidian vault
    if [ ! -d "$VAULT_PATH/.obsidian" ]; then
        log_warning "Directory doesn't appear to be an Obsidian vault (no .obsidian folder)"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Installation cancelled"
            exit 0
        fi
        
        # Create .obsidian directory
        mkdir -p "$VAULT_PATH/.obsidian"
        log_info "Created .obsidian directory"
    fi
    
    # Create plugins directory if it doesn't exist
    mkdir -p "$VAULT_PATH/.obsidian/plugins"
    
    log_success "Vault validated: $VAULT_PATH"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    if [ "$BUILD_PLUGINS" = "true" ]; then
        if ! command_exists node; then
            log_error "Node.js is not installed. Please install Node.js 16+ or set BUILD_PLUGINS=false"
            exit 1
        fi
        
        if ! command_exists npm; then
            log_error "npm is not installed. Please install npm or set BUILD_PLUGINS=false"
            exit 1
        fi
        
        # Check Node.js version
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        REQUIRED_VERSION="16.0.0"
        
        if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION') ? 0 : 1)" 2>/dev/null; then
            log_warning "Node.js version $NODE_VERSION detected. Version $REQUIRED_VERSION or higher is recommended."
        fi
    fi
    
    log_success "Prerequisites check completed"
}

# Build plugins
build_plugins() {
    if [ "$BUILD_PLUGINS" = "true" ]; then
        log_info "Building plugins..."
        
        if [ -f "$SCRIPT_DIR/build-all.sh" ]; then
            chmod +x "$SCRIPT_DIR/build-all.sh"
            "$SCRIPT_DIR/build-all.sh" production false false
        else
            log_error "Build script not found: $SCRIPT_DIR/build-all.sh"
            exit 1
        fi
        
        log_success "Plugins built successfully"
    else
        log_info "Skipping plugin build (BUILD_PLUGINS=false)"
    fi
}

# Install a plugin
install_plugin() {
    local plugin_name="$1"
    local plugin_dir="$PROJECT_ROOT/$plugin_name"
    local target_dir="$VAULT_PATH/.obsidian/plugins/$plugin_name"
    
    log_info "Installing $plugin_name..."
    
    # Check if plugin source exists
    if [ ! -d "$plugin_dir" ]; then
        log_error "Plugin source directory not found: $plugin_dir"
        return 1
    fi
    
    # Check if plugin is already installed
    if [ -d "$target_dir" ] && [ "$FORCE_INSTALL" != "true" ]; then
        log_warning "$plugin_name is already installed"
        read -p "Overwrite existing installation? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "Skipping $plugin_name installation"
            return 0
        fi
    fi
    
    # Remove existing installation if force install
    if [ -d "$target_dir" ]; then
        rm -rf "$target_dir"
        log_info "Removed existing $plugin_name installation"
    fi
    
    # Create target directory
    mkdir -p "$target_dir"
    
    # Copy essential files
    local files_copied=0
    
    # Copy main plugin files
    for file in main.js manifest.json styles.css; do
        if [ -f "$plugin_dir/$file" ]; then
            cp "$plugin_dir/$file" "$target_dir/"
            files_copied=$((files_copied + 1))
            log_info "Copied $file"
        fi
    done
    
    # Copy README if it exists
    if [ -f "$plugin_dir/README.md" ]; then
        cp "$plugin_dir/README.md" "$target_dir/"
        files_copied=$((files_copied + 1))
    fi
    
    # Verify essential files
    if [ ! -f "$target_dir/main.js" ] || [ ! -f "$target_dir/manifest.json" ]; then
        log_error "Essential plugin files missing for $plugin_name"
        log_error "Required: main.js, manifest.json"
        return 1
    fi
    
    log_success "$plugin_name installed successfully ($files_copied files copied)"
    return 0
}

# Enable plugins in Obsidian settings
enable_plugins() {
    if [ "$ENABLE_PLUGINS" != "true" ]; then
        log_info "Skipping plugin enablement (ENABLE_PLUGINS=false)"
        return 0
    fi
    
    log_info "Enabling plugins in Obsidian settings..."
    
    local config_file="$VAULT_PATH/.obsidian/config.json"
    local community_plugins_file="$VAULT_PATH/.obsidian/community-plugins.json"
    
    # Create config.json if it doesn't exist
    if [ ! -f "$config_file" ]; then
        echo '{}' > "$config_file"
        log_info "Created config.json"
    fi
    
    # Enable community plugins in config
    if command_exists jq; then
        # Use jq for JSON manipulation
        jq '.communityPluginSortOrder = "download" | .enabledPlugins = (.enabledPlugins // [])' "$config_file" > "$config_file.tmp" && mv "$config_file.tmp" "$config_file"
    else
        # Fallback: simple text replacement (less reliable)
        log_warning "jq not found, using basic JSON manipulation"
        if ! grep -q "communityPluginSortOrder" "$config_file"; then
            sed -i 's/}$/,"communityPluginSortOrder":"download"}/' "$config_file"
        fi
    fi
    
    # Create community-plugins.json
    local plugins_json='["power-redact","power-canvas"]'
    
    if [ -f "$community_plugins_file" ]; then
        if command_exists jq; then
            # Merge with existing plugins
            existing_plugins=$(cat "$community_plugins_file")
            plugins_json=$(echo "$existing_plugins" | jq '. + ["power-redact","power-canvas"] | unique')
        else
            log_warning "Overwriting existing community-plugins.json (jq not available for merging)"
        fi
    fi
    
    echo "$plugins_json" > "$community_plugins_file"
    log_success "Plugins enabled in Obsidian settings"
}

# Create installation report
create_report() {
    local report_file="$VAULT_PATH/.obsidian/power-components-install.log"
    
    cat > "$report_file" << EOF
Power Components Installation Report
===================================
Installation Date: $(date)
Vault Path: $VAULT_PATH
Script Version: 1.0.0

Installed Plugins:
EOF
    
    # Check Power Redact installation
    if [ -f "$VAULT_PATH/.obsidian/plugins/power-redact/main.js" ]; then
        echo "  ✓ Power Redact Plugin v2.0" >> "$report_file"
        echo "    Location: .obsidian/plugins/power-redact/" >> "$report_file"
        echo "    Size: $(du -h "$VAULT_PATH/.obsidian/plugins/power-redact/main.js" | cut -f1)" >> "$report_file"
    else
        echo "  ✗ Power Redact Plugin - Installation failed" >> "$report_file"
    fi
    
    # Check Power Canvas installation
    if [ -f "$VAULT_PATH/.obsidian/plugins/power-canvas/main.js" ]; then
        echo "  ✓ Power Canvas Plugin v1.0" >> "$report_file"
        echo "    Location: .obsidian/plugins/power-canvas/" >> "$report_file"
        echo "    Size: $(du -h "$VAULT_PATH/.obsidian/plugins/power-canvas/main.js" | cut -f1)" >> "$report_file"
    else
        echo "  ✗ Power Canvas Plugin - Installation failed" >> "$report_file"
    fi
    
    cat >> "$report_file" << EOF

Configuration:
  Force Install: $FORCE_INSTALL
  Build Plugins: $BUILD_PLUGINS
  Enable Plugins: $ENABLE_PLUGINS

Next Steps:
1. Restart Obsidian
2. Go to Settings → Community Plugins
3. Verify both plugins are enabled
4. Configure plugin settings as needed

For help and documentation:
https://github.com/memorymusicllc/power.components

Installation completed at: $(date)
EOF
    
    log_success "Installation report created: $report_file"
}

# Verify installation
verify_installation() {
    log_info "Verifying installation..."
    
    local success=true
    
    # Check Power Redact
    if [ -f "$VAULT_PATH/.obsidian/plugins/power-redact/main.js" ] && [ -f "$VAULT_PATH/.obsidian/plugins/power-redact/manifest.json" ]; then
        log_success "Power Redact Plugin verified"
    else
        log_error "Power Redact Plugin verification failed"
        success=false
    fi
    
    # Check Power Canvas
    if [ -f "$VAULT_PATH/.obsidian/plugins/power-canvas/main.js" ] && [ -f "$VAULT_PATH/.obsidian/plugins/power-canvas/manifest.json" ]; then
        log_success "Power Canvas Plugin verified"
    else
        log_error "Power Canvas Plugin verification failed"
        success=false
    fi
    
    if [ "$success" = true ]; then
        log_success "Installation verification completed successfully"
        return 0
    else
        log_error "Installation verification failed"
        return 1
    fi
}

# Main installation process
main() {
    log_info "Starting Power Components installation..."
    log_info "Target vault: $VAULT_PATH"
    log_info "Force install: $FORCE_INSTALL"
    log_info "Build plugins: $BUILD_PLUGINS"
    log_info "Enable plugins: $ENABLE_PLUGINS"
    
    # Validate inputs
    validate_vault
    
    # Check prerequisites
    check_prerequisites
    
    # Build plugins if requested
    build_plugins
    
    # Install plugins
    log_info "=== Installing Plugins ==="
    
    local install_success=true
    
    if ! install_plugin "power-redact"; then
        install_success=false
    fi
    
    if ! install_plugin "power-canvas"; then
        install_success=false
    fi
    
    if [ "$install_success" != true ]; then
        log_error "Some plugins failed to install"
        exit 1
    fi
    
    # Enable plugins
    enable_plugins
    
    # Verify installation
    verify_installation
    
    # Create report
    create_report
    
    log_success "Installation completed successfully!"
    log_info ""
    log_info "Next steps:"
    log_info "1. Restart Obsidian"
    log_info "2. Go to Settings → Community Plugins"
    log_info "3. Verify both plugins are enabled:"
    log_info "   - Power Redact Plugin v2.0"
    log_info "   - Power Canvas Plugin v1.0"
    log_info "4. Configure plugin settings as needed"
    log_info ""
    log_info "Documentation:"
    log_info "- Installation Guide: INSTALLATION.md"
    log_info "- Power Redact Guide: docs/POWER_REDACT_GUIDE.md"
    log_info "- Power Canvas Guide: docs/POWER_CANVAS_GUIDE.md"
    log_info "- Integration Guide: docs/INTEGRATION_GUIDE.md"
    log_info ""
    log_info "Support: https://github.com/memorymusicllc/power.components"
}

# Handle command line arguments
case "$1" in
    -h|--help|help)
        show_help
        exit 0
        ;;
    "")
        log_error "Vault path is required"
        show_help
        exit 1
        ;;
    *)
        main "$@"
        ;;
esac

