
import { CanvasSettings, UITheme, ControlPanelConfig } from '../types/PowerCanvas';

export class UIManager {
    private theme: UITheme;
    private settings: CanvasSettings | null = null;
    private styleSheet: HTMLStyleElement;
    private eventListeners: Map<string, EventListener[]> = new Map();

    constructor() {
        this.theme = this.getDefaultTheme();
        this.styleSheet = document.createElement('style');
        document.head.appendChild(this.styleSheet);
        this.applyTheme();
    }

    // Theme Management
    setTheme(theme: UITheme): void {
        this.theme = theme;
        this.applyTheme();
    }

    getTheme(): UITheme {
        return this.theme;
    }

    private getDefaultTheme(): UITheme {
        return {
            primary: '#8b5cf6',
            secondary: '#6366f1',
            accent: '#f59e0b',
            background: '#1f2937',
            surface: '#374151',
            text: '#f9fafb',
            textSecondary: '#d1d5db',
            border: '#4b5563',
            shadow: 'rgba(0, 0, 0, 0.25)',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
    }

    private applyTheme(): void {
        const css = `
            .power-canvas-container {
                --pc-primary: ${this.theme.primary};
                --pc-secondary: ${this.theme.secondary};
                --pc-accent: ${this.theme.accent};
                --pc-background: ${this.theme.background};
                --pc-surface: ${this.theme.surface};
                --pc-text: ${this.theme.text};
                --pc-text-secondary: ${this.theme.textSecondary};
                --pc-border: ${this.theme.border};
                --pc-shadow: ${this.theme.shadow};
                --pc-success: ${this.theme.success};
                --pc-warning: ${this.theme.warning};
                --pc-error: ${this.theme.error};
            }

            .power-canvas-main {
                background: var(--pc-background);
                color: var(--pc-text);
                border: 1px solid var(--pc-border);
                border-radius: 8px;
                width: 100%;
                height: 100%;
                position: relative;
                overflow: hidden;
            }

            .power-canvas-toolbar {
                position: absolute;
                top: 10px;
                left: 10px;
                right: 10px;
                height: 50px;
                background: var(--pc-surface);
                border: 1px solid var(--pc-border);
                border-radius: 8px;
                display: flex;
                align-items: center;
                padding: 0 15px;
                gap: 10px;
                box-shadow: 0 2px 8px var(--pc-shadow);
                z-index: 100;
            }

            .power-button {
                background: var(--pc-primary);
                color: white;
                border: none;
                border-radius: 6px;
                padding: 8px 16px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .power-button:hover {
                background: var(--pc-secondary);
                transform: translateY(-1px);
                box-shadow: 0 4px 12px var(--pc-shadow);
            }

            .power-button:active {
                transform: translateY(0);
            }

            .power-button.active {
                background: var(--pc-accent);
            }

            .control-panel {
                position: absolute;
                top: 80px;
                right: 10px;
                width: 280px;
                background: var(--pc-surface);
                border: 1px solid var(--pc-border);
                border-radius: 8px;
                box-shadow: 0 4px 16px var(--pc-shadow);
                z-index: 90;
                max-height: calc(100vh - 100px);
                overflow-y: auto;
            }

            .control-panel-header {
                padding: 15px;
                border-bottom: 1px solid var(--pc-border);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .control-panel-title {
                font-size: 16px;
                font-weight: 600;
                color: var(--pc-text);
            }

            .control-panel-collapse {
                background: none;
                border: none;
                color: var(--pc-text-secondary);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .control-panel-collapse:hover {
                background: var(--pc-border);
                color: var(--pc-text);
            }

            .control-panel-section {
                border-bottom: 1px solid var(--pc-border);
            }

            .control-panel-section:last-child {
                border-bottom: none;
            }

            .section-header {
                padding: 12px 15px;
                background: var(--pc-background);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-weight: 500;
                color: var(--pc-text);
                transition: background 0.2s ease;
            }

            .section-header:hover {
                background: var(--pc-border);
            }

            .section-content {
                padding: 15px;
                display: none;
            }

            .section-content.expanded {
                display: block;
            }

            .form-group {
                margin-bottom: 15px;
            }

            .form-group:last-child {
                margin-bottom: 0;
            }

            .form-label {
                display: block;
                margin-bottom: 6px;
                font-size: 13px;
                font-weight: 500;
                color: var(--pc-text);
            }

            .form-input {
                width: 100%;
                padding: 8px 12px;
                background: var(--pc-background);
                border: 1px solid var(--pc-border);
                border-radius: 4px;
                color: var(--pc-text);
                font-size: 13px;
                transition: border-color 0.2s ease;
            }

            .form-input:focus {
                outline: none;
                border-color: var(--pc-primary);
                box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
            }

            .form-select {
                width: 100%;
                padding: 8px 12px;
                background: var(--pc-background);
                border: 1px solid var(--pc-border);
                border-radius: 4px;
                color: var(--pc-text);
                font-size: 13px;
                cursor: pointer;
            }

            .form-checkbox {
                display: flex;
                align-items: center;
                gap: 8px;
                cursor: pointer;
            }

            .form-checkbox input {
                margin: 0;
                accent-color: var(--pc-primary);
            }

            .form-range {
                width: 100%;
                margin: 8px 0;
                accent-color: var(--pc-primary);
            }

            .button-group {
                display: flex;
                gap: 8px;
                margin-top: 10px;
            }

            .btn {
                padding: 6px 12px;
                border: 1px solid var(--pc-border);
                border-radius: 4px;
                background: var(--pc-surface);
                color: var(--pc-text);
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                flex: 1;
            }

            .btn:hover {
                background: var(--pc-border);
            }

            .btn.primary {
                background: var(--pc-primary);
                border-color: var(--pc-primary);
                color: white;
            }

            .btn.primary:hover {
                background: var(--pc-secondary);
                border-color: var(--pc-secondary);
            }

            .library-panel {
                position: absolute;
                bottom: 10px;
                left: 10px;
                width: 300px;
                height: 200px;
                background: var(--pc-surface);
                border: 1px solid var(--pc-border);
                border-radius: 8px;
                box-shadow: 0 4px 16px var(--pc-shadow);
                z-index: 80;
                display: flex;
                flex-direction: column;
            }

            .library-header {
                padding: 12px 15px;
                border-bottom: 1px solid var(--pc-border);
                display: flex;
                align-items: center;
                justify-content: between;
                gap: 10px;
            }

            .library-search {
                flex: 1;
                padding: 6px 10px;
                background: var(--pc-background);
                border: 1px solid var(--pc-border);
                border-radius: 4px;
                color: var(--pc-text);
                font-size: 12px;
            }

            .library-content {
                flex: 1;
                overflow-y: auto;
                padding: 10px;
            }

            .library-item {
                padding: 8px;
                border: 1px solid var(--pc-border);
                border-radius: 4px;
                margin-bottom: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .library-item:hover {
                background: var(--pc-border);
                transform: translateY(-1px);
            }

            .library-item-title {
                font-size: 13px;
                font-weight: 500;
                color: var(--pc-text);
                margin-bottom: 4px;
            }

            .library-item-description {
                font-size: 11px;
                color: var(--pc-text-secondary);
                line-height: 1.3;
            }

            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 16px;
                background: var(--pc-surface);
                border: 1px solid var(--pc-border);
                border-radius: 6px;
                color: var(--pc-text);
                box-shadow: 0 4px 16px var(--pc-shadow);
                z-index: 1000;
                animation: slideIn 0.3s ease;
            }

            .toast.success {
                border-color: var(--pc-success);
                background: var(--pc-success);
                color: white;
            }

            .toast.warning {
                border-color: var(--pc-warning);
                background: var(--pc-warning);
                color: white;
            }

            .toast.error {
                border-color: var(--pc-error);
                background: var(--pc-error);
                color: white;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal {
                background: var(--pc-surface);
                border: 1px solid var(--pc-border);
                border-radius: 8px;
                box-shadow: 0 8px 32px var(--pc-shadow);
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }

            .modal-header {
                padding: 20px;
                border-bottom: 1px solid var(--pc-border);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .modal-title {
                font-size: 18px;
                font-weight: 600;
                color: var(--pc-text);
            }

            .modal-close {
                background: none;
                border: none;
                color: var(--pc-text-secondary);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .modal-close:hover {
                background: var(--pc-border);
                color: var(--pc-text);
            }

            .modal-content {
                padding: 20px;
            }

            .modal-footer {
                padding: 20px;
                border-top: 1px solid var(--pc-border);
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            }

            /* Scrollbar styling */
            .control-panel::-webkit-scrollbar,
            .library-content::-webkit-scrollbar,
            .modal::-webkit-scrollbar {
                width: 6px;
            }

            .control-panel::-webkit-scrollbar-track,
            .library-content::-webkit-scrollbar-track,
            .modal::-webkit-scrollbar-track {
                background: var(--pc-background);
            }

            .control-panel::-webkit-scrollbar-thumb,
            .library-content::-webkit-scrollbar-thumb,
            .modal::-webkit-scrollbar-thumb {
                background: var(--pc-border);
                border-radius: 3px;
            }

            .control-panel::-webkit-scrollbar-thumb:hover,
            .library-content::-webkit-scrollbar-thumb:hover,
            .modal::-webkit-scrollbar-thumb:hover {
                background: var(--pc-text-secondary);
            }
        `;

        this.styleSheet.textContent = css;
    }

    // UI Component Creation
    createButton(text: string, className = '', onClick?: () => void): HTMLButtonElement {
        const button = document.createElement('button');
        button.textContent = text;
        button.className = `power-button ${className}`;
        
        if (onClick) {
            button.addEventListener('click', onClick);
            this.addEventListener('button-click', onClick);
        }

        return button;
    }

    createInput(type: string, placeholder = '', value = ''): HTMLInputElement {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value;
        input.className = 'form-input';
        
        return input;
    }

    createSelect(options: { value: string; text: string }[], selectedValue = ''): HTMLSelectElement {
        const select = document.createElement('select');
        select.className = 'form-select';

        options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option.value;
            optionEl.textContent = option.text;
            optionEl.selected = option.value === selectedValue;
            select.appendChild(optionEl);
        });

        return select;
    }

    createCheckbox(label: string, checked = false, onChange?: (checked: boolean) => void): HTMLLabelElement {
        const labelEl = document.createElement('label');
        labelEl.className = 'form-checkbox';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = checked;

        const span = document.createElement('span');
        span.textContent = label;

        if (onChange) {
            input.addEventListener('change', () => onChange(input.checked));
            this.addEventListener('checkbox-change', () => onChange(input.checked));
        }

        labelEl.appendChild(input);
        labelEl.appendChild(span);

        return labelEl;
    }

    createRange(min: number, max: number, value: number, step = 1, onChange?: (value: number) => void): HTMLInputElement {
        const input = document.createElement('input');
        input.type = 'range';
        input.min = min.toString();
        input.max = max.toString();
        input.value = value.toString();
        input.step = step.toString();
        input.className = 'form-range';

        if (onChange) {
            input.addEventListener('input', () => onChange(parseFloat(input.value)));
            this.addEventListener('range-change', () => onChange(parseFloat(input.value)));
        }

        return input;
    }

    // Toast Notifications
    showToast(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration = 3000): void {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    }

    // Modal Dialogs
    showModal(title: string, content: HTMLElement, buttons: { text: string; onClick: () => void; primary?: boolean }[] = []): HTMLElement {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'modal';

        // Header
        const header = document.createElement('div');
        header.className = 'modal-header';

        const titleEl = document.createElement('h3');
        titleEl.className = 'modal-title';
        titleEl.textContent = title;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => this.closeModal(overlay));

        header.appendChild(titleEl);
        header.appendChild(closeBtn);

        // Content
        const contentEl = document.createElement('div');
        contentEl.className = 'modal-content';
        contentEl.appendChild(content);

        // Footer
        const footer = document.createElement('div');
        footer.className = 'modal-footer';

        buttons.forEach(buttonConfig => {
            const button = document.createElement('button');
            button.textContent = buttonConfig.text;
            button.className = buttonConfig.primary ? 'btn primary' : 'btn';
            button.addEventListener('click', () => {
                buttonConfig.onClick();
                this.closeModal(overlay);
            });
            footer.appendChild(button);
        });

        modal.appendChild(header);
        modal.appendChild(contentEl);
        if (buttons.length > 0) {
            modal.appendChild(footer);
        }

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeModal(overlay);
            }
        });

        return overlay;
    }

    private closeModal(overlay: HTMLElement): void {
        document.body.removeChild(overlay);
    }

    // Form Helpers
    createFormGroup(label: string, input: HTMLElement): HTMLElement {
        const group = document.createElement('div');
        group.className = 'form-group';

        const labelEl = document.createElement('label');
        labelEl.className = 'form-label';
        labelEl.textContent = label;

        group.appendChild(labelEl);
        group.appendChild(input);

        return group;
    }

    // Event Management
    private addEventListener(type: string, listener: EventListener): void {
        if (!this.eventListeners.has(type)) {
            this.eventListeners.set(type, []);
        }
        this.eventListeners.get(type)!.push(listener);
    }

    // Settings Management
    setSettings(settings: CanvasSettings): void {
        this.settings = settings;
        this.setTheme(settings.ui.theme);
    }

    getSettings(): CanvasSettings | null {
        return this.settings;
    }

    // Utility Methods
    createElement(tag: string, className = '', textContent = ''): HTMLElement {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    formatFileSize(bytes: number): string {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    formatDate(date: Date): string {
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    // Cleanup
    cleanup(): void {
        // Remove event listeners
        this.eventListeners.clear();

        // Remove stylesheet
        if (this.styleSheet && this.styleSheet.parentNode) {
            this.styleSheet.parentNode.removeChild(this.styleSheet);
        }

        // Remove any remaining modals or toasts
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => modal.remove());

        const toasts = document.querySelectorAll('.toast');
        toasts.forEach(toast => toast.remove());
    }
}
