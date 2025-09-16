
import { UIManager } from '../services/UIManager';

export class PowerButton {
    private plugin: any;
    private uiManager: UIManager;
    private button: HTMLButtonElement;
    private isActive = false;

    constructor(plugin: any) {
        this.plugin = plugin;
        this.uiManager = plugin.getUIManager();
        this.createButton();
    }

    private createButton(): void {
        this.button = this.uiManager.createButton(
            '⚡ Power Canvas',
            'power-button-main',
            () => this.togglePowerMode()
        );

        // Add power icon
        const icon = document.createElement('span');
        icon.innerHTML = '⚡';
        icon.style.fontSize = '16px';
        icon.style.marginRight = '4px';
        
        this.button.insertBefore(icon, this.button.firstChild);

        // Style the button with purple theme
        this.button.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
        this.button.style.border = 'none';
        this.button.style.borderRadius = '8px';
        this.button.style.padding = '10px 16px';
        this.button.style.fontSize = '14px';
        this.button.style.fontWeight = '600';
        this.button.style.color = 'white';
        this.button.style.cursor = 'pointer';
        this.button.style.transition = 'all 0.3s ease';
        this.button.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
        this.button.style.position = 'relative';
        this.button.style.overflow = 'hidden';

        // Add hover effects
        this.button.addEventListener('mouseenter', () => {
            if (!this.isActive) {
                this.button.style.transform = 'translateY(-2px)';
                this.button.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                this.button.style.background = 'linear-gradient(135deg, #9333ea, #7c3aed)';
            }
        });

        this.button.addEventListener('mouseleave', () => {
            if (!this.isActive) {
                this.button.style.transform = 'translateY(0)';
                this.button.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                this.button.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
            }
        });

        // Add click animation
        this.button.addEventListener('mousedown', () => {
            this.button.style.transform = 'translateY(0) scale(0.98)';
        });

        this.button.addEventListener('mouseup', () => {
            this.button.style.transform = this.isActive ? 'translateY(0) scale(1)' : 'translateY(-2px) scale(1)';
        });

        // Add ripple effect
        this.button.addEventListener('click', (e) => {
            this.createRipple(e);
        });
    }

    private createRipple(event: MouseEvent): void {
        const button = event.currentTarget as HTMLButtonElement;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        // Add ripple animation CSS if not already added
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    private togglePowerMode(): void {
        this.isActive = !this.isActive;
        
        if (this.isActive) {
            this.activatePowerMode();
        } else {
            this.deactivatePowerMode();
        }
    }

    private activatePowerMode(): void {
        // Update button appearance
        this.button.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        this.button.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)';
        this.button.style.transform = 'translateY(0) scale(1)';
        this.button.textContent = '⚡ Power Mode ON';

        // Add pulsing animation
        this.button.style.animation = 'pulse 2s infinite';
        
        // Add pulse animation CSS if not already added
        if (!document.querySelector('#pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0% {
                        box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
                    }
                    50% {
                        box-shadow: 0 6px 20px rgba(245, 158, 11, 0.7);
                    }
                    100% {
                        box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Activate 3D mode
        this.plugin.getRenderEngine().toggle3DMode();
        
        // Show power mode features
        this.showPowerModeFeatures();
        
        // Show notification
        this.uiManager.showToast('Power Mode Activated! 3D visualization enabled.', 'success');
    }

    private deactivatePowerMode(): void {
        // Update button appearance
        this.button.style.background = 'linear-gradient(135deg, #8b5cf6, #6366f1)';
        this.button.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
        this.button.style.animation = 'none';
        this.button.textContent = '⚡ Power Canvas';

        // Switch back to 2D mode
        const renderEngine = this.plugin.getRenderEngine();
        if (renderEngine.getMode() === '3d') {
            renderEngine.toggle3DMode();
        }

        // Hide power mode features
        this.hidePowerModeFeatures();
        
        // Show notification
        this.uiManager.showToast('Power Mode Deactivated. Switched to 2D mode.', 'info');
    }

    private showPowerModeFeatures(): void {
        // Enable advanced features
        const features = [
            '3D Visualization',
            'WebGL Rendering',
            'Advanced Animations',
            'Particle Effects',
            'Dynamic Lighting',
            'Auto-organize Algorithm',
            'Multi-format Export'
        ];

        // Create feature showcase
        const showcase = document.createElement('div');
        showcase.id = 'power-mode-showcase';
        showcase.style.position = 'fixed';
        showcase.style.top = '20px';
        showcase.style.left = '20px';
        showcase.style.background = 'rgba(0, 0, 0, 0.8)';
        showcase.style.color = 'white';
        showcase.style.padding = '15px';
        showcase.style.borderRadius = '8px';
        showcase.style.fontSize = '12px';
        showcase.style.zIndex = '1000';
        showcase.style.maxWidth = '200px';
        showcase.style.animation = 'fadeIn 0.5s ease';

        const title = document.createElement('div');
        title.textContent = '⚡ Power Mode Features';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        title.style.color = '#f59e0b';
        showcase.appendChild(title);

        features.forEach(feature => {
            const item = document.createElement('div');
            item.textContent = `✓ ${feature}`;
            item.style.marginBottom = '4px';
            item.style.opacity = '0';
            item.style.animation = `slideInLeft 0.3s ease ${features.indexOf(feature) * 0.1}s forwards`;
            showcase.appendChild(item);
        });

        // Add fade in animation
        if (!document.querySelector('#power-mode-animations')) {
            const style = document.createElement('style');
            style.id = 'power-mode-animations';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(showcase);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (showcase.parentNode) {
                showcase.style.animation = 'fadeOut 0.5s ease forwards';
                setTimeout(() => {
                    if (showcase.parentNode) {
                        showcase.parentNode.removeChild(showcase);
                    }
                }, 500);
            }
        }, 5000);
    }

    private hidePowerModeFeatures(): void {
        const showcase = document.getElementById('power-mode-showcase');
        if (showcase) {
            showcase.remove();
        }
    }

    // Public methods
    getButton(): HTMLButtonElement {
        return this.button;
    }

    isActivated(): boolean {
        return this.isActive;
    }

    activate(): void {
        if (!this.isActive) {
            this.togglePowerMode();
        }
    }

    deactivate(): void {
        if (this.isActive) {
            this.togglePowerMode();
        }
    }

    // Add to canvas toolbar
    addToToolbar(toolbar: HTMLElement): void {
        toolbar.appendChild(this.button);
    }

    // Update button state based on canvas mode
    updateState(mode: '2d' | '3d'): void {
        if (mode === '3d' && !this.isActive) {
            this.activate();
        } else if (mode === '2d' && this.isActive) {
            this.deactivate();
        }
    }

    // Cleanup
    cleanup(): void {
        if (this.button && this.button.parentNode) {
            this.button.parentNode.removeChild(this.button);
        }

        // Remove animations
        const rippleStyle = document.querySelector('#ripple-animation');
        if (rippleStyle) rippleStyle.remove();

        const pulseStyle = document.querySelector('#pulse-animation');
        if (pulseStyle) pulseStyle.remove();

        const powerModeStyle = document.querySelector('#power-mode-animations');
        if (powerModeStyle) powerModeStyle.remove();

        // Remove showcase
        this.hidePowerModeFeatures();
    }
}
