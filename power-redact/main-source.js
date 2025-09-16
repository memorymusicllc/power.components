
/**
 * Power Redact Plugin v2.0 - Complete UX Overhaul
 * Enhanced reveal behavior with cursor-based interaction
 * Touch device support and iOS Format menu integration
 */

class PowerRedactPlugin {
    constructor() {
        this.version = '2.0.0';
        this.settings = {
            enabled: true,
            autoRedactPII: true,
            customPatterns: [],
            excludeTerms: [],
            revealBehavior: 'cursor', // cursor, click, hover
            blockStyle: true,
            touchSupport: true
        };
        
        this.redactedElements = new Set();
        this.isTouch = 'ontouchstart' in window;
        this.currentRevealedElement = null;
        this.settingsPanel = null;
        
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.createStyles();
        this.setupEventListeners();
        this.integrateWithFormatMenu();
        
        if (this.settings.enabled) {
            this.startAutoRedaction();
        }
    }
    
    loadSettings() {
        const saved = localStorage.getItem('power-redact-settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }
    
    saveSettings() {
        localStorage.setItem('power-redact-settings', JSON.stringify(this.settings));
    }
    
    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .power-redact-hidden {
                background: #000 !important;
                color: transparent !important;
                border-radius: 3px;
                position: relative;
                cursor: pointer;
                user-select: none;
                transition: all 0.2s ease;
            }
            
            .power-redact-hidden.block-style {
                display: inline-block;
                min-width: 60px;
                height: 1.2em;
                vertical-align: baseline;
            }
            
            .power-redact-revealed {
                background: rgba(255, 255, 0, 0.3) !important;
                color: inherit !important;
                animation: reveal-pulse 0.3s ease;
            }
            
            .power-redact-touch-lock::after {
                content: '🔒';
                position: absolute;
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 0.8em;
                opacity: 0.7;
            }
            
            @keyframes reveal-pulse {
                0% { background: rgba(255, 255, 0, 0.6); }
                100% { background: rgba(255, 255, 0, 0.3); }
            }
            
            .power-redact-settings {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 2px solid #333;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 400px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .power-redact-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
            }
            
            .settings-section {
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
            
            .settings-section:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            
            .settings-section h3 {
                margin: 0 0 10px 0;
                font-size: 16px;
                color: #333;
            }
            
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
                margin-left: 10px;
            }
            
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 24px;
            }
            
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 18px;
                width: 18px;
                left: 3px;
                bottom: 3px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .toggle-slider {
                background-color: #2196F3;
            }
            
            input:checked + .toggle-slider:before {
                transform: translateX(26px);
            }
            
            .advanced-accordion {
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-top: 10px;
            }
            
            .advanced-header {
                background: #f5f5f5;
                padding: 10px;
                cursor: pointer;
                user-select: none;
                border-radius: 4px 4px 0 0;
            }
            
            .advanced-content {
                padding: 15px;
                display: none;
            }
            
            .advanced-content.open {
                display: block;
            }
            
            .pattern-list {
                max-height: 120px;
                overflow-y: auto;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 5px;
                margin-top: 5px;
            }
            
            .pattern-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 5px;
                border-bottom: 1px solid #eee;
            }
            
            .pattern-item:last-child {
                border-bottom: none;
            }
            
            .remove-pattern {
                background: #ff4444;
                color: white;
                border: none;
                border-radius: 3px;
                padding: 2px 6px;
                cursor: pointer;
                font-size: 12px;
            }
            
            @media (max-width: 480px) {
                .power-redact-settings {
                    width: 95%;
                    padding: 15px;
                }
                
                .toggle-switch {
                    width: 40px;
                    height: 20px;
                }
                
                .toggle-slider:before {
                    height: 14px;
                    width: 14px;
                    left: 3px;
                    bottom: 3px;
                }
                
                input:checked + .toggle-slider:before {
                    transform: translateX(20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupEventListeners() {
        // Enhanced cursor-based reveal behavior
        document.addEventListener('mouseover', (e) => {
            if (!this.isTouch && e.target.classList.contains('power-redact-hidden')) {
                this.revealElement(e.target);
            }
        });
        
        document.addEventListener('mouseleave', (e) => {
            if (!this.isTouch && e.target.classList.contains('power-redact-hidden')) {
                this.hideElement(e.target);
            }
        });
        
        // Touch support with edit lock
        document.addEventListener('touchstart', (e) => {
            if (this.isTouch && e.target.classList.contains('power-redact-hidden')) {
                e.preventDefault();
                this.toggleRevealTouch(e.target);
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                e.preventDefault();
                this.showSettings();
            }
            
            if (e.key === 'Escape' && this.settingsPanel) {
                this.hideSettings();
            }
        });
    }
    
    revealElement(element) {
        if (this.currentRevealedElement && this.currentRevealedElement !== element) {
            this.hideElement(this.currentRevealedElement);
        }
        
        element.classList.remove('power-redact-hidden');
        element.classList.add('power-redact-revealed');
        this.currentRevealedElement = element;
    }
    
    hideElement(element) {
        element.classList.remove('power-redact-revealed');
        element.classList.add('power-redact-hidden');
        
        if (this.currentRevealedElement === element) {
            this.currentRevealedElement = null;
        }
    }
    
    toggleRevealTouch(element) {
        if (element.classList.contains('power-redact-revealed')) {
            this.hideElement(element);
            element.classList.remove('power-redact-touch-lock');
        } else {
            this.revealElement(element);
            element.classList.add('power-redact-touch-lock');
        }
    }
    
    integrateWithFormatMenu() {
        // iOS Format menu integration
        if (this.isTouch && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        const formatMenu = document.querySelector('.format-menu, .editing-menu');
                        if (formatMenu && !formatMenu.querySelector('.power-redact-option')) {
                            this.addFormatMenuOption(formatMenu);
                        }
                    }
                });
            });
            
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }
    
    addFormatMenuOption(menu) {
        const redactOption = document.createElement('button');
        redactOption.className = 'power-redact-option';
        redactOption.textContent = 'Redact';
        redactOption.onclick = () => {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                this.redactSelection(selection);
            }
        };
        menu.appendChild(redactOption);
    }
    
    redactSelection(selection) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'power-redact-hidden';
        
        if (this.settings.blockStyle) {
            span.classList.add('block-style');
        }
        
        try {
            range.surroundContents(span);
            this.redactedElements.add(span);
            selection.removeAllRanges();
        } catch (e) {
            console.warn('Could not redact complex selection:', e);
        }
    }
    
    startAutoRedaction() {
        if (!this.settings.autoRedactPII) return;
        
        const piiPatterns = [
            /\b\d{3}-\d{2}-\d{4}\b/g, // SSN
            /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, // Credit card
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email
            /\b\d{3}[\s.-]?\d{3}[\s.-]?\d{4}\b/g, // Phone
        ];
        
        const allPatterns = [...piiPatterns, ...this.settings.customPatterns];
        
        this.scanAndRedact(document.body, allPatterns);
    }
    
    scanAndRedact(element, patterns) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    return node.parentElement.closest('.power-redact-hidden, .power-redact-settings') 
                        ? NodeFilter.FILTER_REJECT 
                        : NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            let content = textNode.textContent;
            let modified = false;
            
            patterns.forEach(pattern => {
                if (pattern instanceof RegExp) {
                    content = content.replace(pattern, (match) => {
                        if (this.shouldExclude(match)) return match;
                        modified = true;
                        return `<span class="power-redact-hidden${this.settings.blockStyle ? ' block-style' : ''}">${match}</span>`;
                    });
                } else if (typeof pattern === 'string') {
                    const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                    content = content.replace(regex, (match) => {
                        if (this.shouldExclude(match)) return match;
                        modified = true;
                        return `<span class="power-redact-hidden${this.settings.blockStyle ? ' block-style' : ''}">${match}</span>`;
                    });
                }
            });
            
            if (modified) {
                const wrapper = document.createElement('div');
                wrapper.innerHTML = content;
                
                while (wrapper.firstChild) {
                    textNode.parentNode.insertBefore(wrapper.firstChild, textNode);
                }
                textNode.remove();
            }
        });
    }
    
    shouldExclude(text) {
        return this.settings.excludeTerms.some(term => 
            text.toLowerCase().includes(term.toLowerCase())
        );
    }
    
    showSettings() {
        if (this.settingsPanel) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'power-redact-overlay';
        
        const panel = document.createElement('div');
        panel.className = 'power-redact-settings';
        
        panel.innerHTML = `
            <h2>Power Redact Settings v${this.version}</h2>
            
            <div class="settings-section">
                <h3>Auto Redact Personally Identifiable Information</h3>
                <label>
                    Enable PII Auto-Redaction
                    <label class="toggle-switch">
                        <input type="checkbox" id="autoRedactPII" ${this.settings.autoRedactPII ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </label>
            </div>
            
            <div class="settings-section">
                <h3>Keywords or Phrases to Redact</h3>
                <input type="text" id="customPattern" placeholder="Enter keyword or phrase" style="width: 70%; margin-right: 5px;">
                <button onclick="powerRedact.addCustomPattern()" style="width: 25%;">Add</button>
                <div class="pattern-list" id="customPatterns"></div>
            </div>
            
            <div class="advanced-accordion">
                <div class="advanced-header" onclick="powerRedact.toggleAdvanced()">
                    <strong>⚙️ Advanced Settings</strong>
                </div>
                <div class="advanced-content" id="advancedContent">
                    <div class="settings-section">
                        <h3>Exclude Terms</h3>
                        <p style="font-size: 12px; color: #666; margin: 5px 0;">Terms that should NOT be redacted even if they match patterns</p>
                        <input type="text" id="excludeTerm" placeholder="Enter term to exclude" style="width: 70%; margin-right: 5px;">
                        <button onclick="powerRedact.addExcludeTerm()" style="width: 25%;">Add</button>
                        <div class="pattern-list" id="excludeTerms"></div>
                    </div>
                    
                    <div class="settings-section">
                        <h3>Display Options</h3>
                        <label>
                            <input type="checkbox" id="blockStyle" ${this.settings.blockStyle ? 'checked' : ''}> 
                            Block Style (recommended)
                        </label>
                        <br>
                        <label>
                            <input type="checkbox" id="touchSupport" ${this.settings.touchSupport ? 'checked' : ''}> 
                            Touch Device Support
                        </label>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
                <button onclick="powerRedact.saveAndClose()" style="background: #2196F3; color: white; border: none; padding: 10px 20px; border-radius: 4px; margin-right: 10px; cursor: pointer;">Save & Close</button>
                <button onclick="powerRedact.hideSettings()" style="background: #ccc; color: black; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Cancel</button>
            </div>
        `;
        
        overlay.onclick = (e) => {
            if (e.target === overlay) this.hideSettings();
        };
        
        document.body.appendChild(overlay);
        document.body.appendChild(panel);
        
        this.settingsPanel = panel;
        this.settingsOverlay = overlay;
        
        this.updatePatternLists();
    }
    
    hideSettings() {
        if (this.settingsPanel) {
            this.settingsPanel.remove();
            this.settingsOverlay.remove();
            this.settingsPanel = null;
            this.settingsOverlay = null;
        }
    }
    
    toggleAdvanced() {
        const content = document.getElementById('advancedContent');
        content.classList.toggle('open');
    }
    
    addCustomPattern() {
        const input = document.getElementById('customPattern');
        const pattern = input.value.trim();
        
        if (pattern && !this.settings.customPatterns.includes(pattern)) {
            this.settings.customPatterns.push(pattern);
            input.value = '';
            this.updatePatternLists();
        }
    }
    
    addExcludeTerm() {
        const input = document.getElementById('excludeTerm');
        const term = input.value.trim();
        
        if (term && !this.settings.excludeTerms.includes(term)) {
            this.settings.excludeTerms.push(term);
            input.value = '';
            this.updatePatternLists();
        }
    }
    
    removeCustomPattern(index) {
        this.settings.customPatterns.splice(index, 1);
        this.updatePatternLists();
    }
    
    removeExcludeTerm(index) {
        this.settings.excludeTerms.splice(index, 1);
        this.updatePatternLists();
    }
    
    updatePatternLists() {
        const customList = document.getElementById('customPatterns');
        const excludeList = document.getElementById('excludeTerms');
        
        if (customList) {
            customList.innerHTML = this.settings.customPatterns.map((pattern, index) => `
                <div class="pattern-item">
                    <span>${pattern}</span>
                    <button class="remove-pattern" onclick="powerRedact.removeCustomPattern(${index})">×</button>
                </div>
            `).join('');
        }
        
        if (excludeList) {
            excludeList.innerHTML = this.settings.excludeTerms.map((term, index) => `
                <div class="pattern-item">
                    <span>${term}</span>
                    <button class="remove-pattern" onclick="powerRedact.removeExcludeTerm(${index})">×</button>
                </div>
            `).join('');
        }
    }
    
    saveAndClose() {
        // Update settings from form
        this.settings.autoRedactPII = document.getElementById('autoRedactPII').checked;
        this.settings.blockStyle = document.getElementById('blockStyle').checked;
        this.settings.touchSupport = document.getElementById('touchSupport').checked;
        
        this.saveSettings();
        this.hideSettings();
        
        // Restart auto-redaction with new settings
        if (this.settings.autoRedactPII) {
            this.startAutoRedaction();
        }
    }
    
    // Public API methods
    redactText(text) {
        const span = document.createElement('span');
        span.className = 'power-redact-hidden';
        span.textContent = text;
        return span;
    }
    
    clearAllRedactions() {
        document.querySelectorAll('.power-redact-hidden').forEach(el => {
            const text = el.textContent;
            el.replaceWith(document.createTextNode(text));
        });
        this.redactedElements.clear();
    }
    
    exportRedactedContent() {
        const content = document.body.cloneNode(true);
        content.querySelectorAll('.power-redact-hidden').forEach(el => {
            el.textContent = '█'.repeat(Math.max(1, Math.floor(el.textContent.length / 2)));
        });
        return content.innerHTML;
    }
}

// Initialize plugin
const powerRedact = new PowerRedactPlugin();

// Global access for settings panel
window.powerRedact = powerRedact;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PowerRedactPlugin;
}
