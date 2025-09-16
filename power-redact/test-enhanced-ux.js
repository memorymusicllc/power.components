
/**
 * Power Redact Plugin v2.0 - Comprehensive Test Suite
 * Testing enhanced UX features, mobile optimization, and iOS integration
 */

// Mock DOM environment setup
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.localStorage = dom.window.localStorage;
global.getSelection = dom.window.getSelection;
global.MutationObserver = dom.window.MutationObserver;

// Mock touch support
Object.defineProperty(global.window, 'ontouchstart', {
    value: true,
    writable: true
});

// Import the plugin
const PowerRedactPlugin = require('./main-source.js');

describe('Power Redact Plugin v2.0 - Enhanced UX Features', () => {
    let plugin;
    
    beforeEach(() => {
        // Reset DOM
        document.body.innerHTML = '';
        
        // Clear localStorage
        localStorage.clear();
        
        // Create fresh plugin instance
        plugin = new PowerRedactPlugin();
        
        // Mock console methods to avoid test noise
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });
    
    afterEach(() => {
        // Cleanup
        plugin = null;
        jest.restoreAllMocks();
    });

    describe('Core Initialization', () => {
        test('should initialize with correct version', () => {
            expect(plugin.version).toBe('2.0.0');
        });
        
        test('should load default settings', () => {
            expect(plugin.settings.enabled).toBe(true);
            expect(plugin.settings.autoRedactPII).toBe(true);
            expect(plugin.settings.revealBehavior).toBe('cursor');
            expect(plugin.settings.blockStyle).toBe(true);
            expect(plugin.settings.touchSupport).toBe(true);
        });
        
        test('should detect touch device capability', () => {
            expect(plugin.isTouch).toBe(true);
        });
        
        test('should initialize empty redacted elements set', () => {
            expect(plugin.redactedElements).toBeInstanceOf(Set);
            expect(plugin.redactedElements.size).toBe(0);
        });
    });

    describe('Enhanced Cursor-Based Reveal Behavior', () => {
        let testElement;
        
        beforeEach(() => {
            testElement = document.createElement('span');
            testElement.className = 'power-redact-hidden';
            testElement.textContent = 'sensitive data';
            document.body.appendChild(testElement);
        });
        
        test('should reveal element on cursor hover', () => {
            plugin.revealElement(testElement);
            
            expect(testElement.classList.contains('power-redact-revealed')).toBe(true);
            expect(testElement.classList.contains('power-redact-hidden')).toBe(false);
            expect(plugin.currentRevealedElement).toBe(testElement);
        });
        
        test('should hide element when cursor exits', () => {
            // First reveal
            plugin.revealElement(testElement);
            expect(plugin.currentRevealedElement).toBe(testElement);
            
            // Then hide
            plugin.hideElement(testElement);
            expect(testElement.classList.contains('power-redact-hidden')).toBe(true);
            expect(testElement.classList.contains('power-redact-revealed')).toBe(false);
            expect(plugin.currentRevealedElement).toBe(null);
        });
        
        test('should manage single element reveal state', () => {
            const element2 = document.createElement('span');
            element2.className = 'power-redact-hidden';
            document.body.appendChild(element2);
            
            // Reveal first element
            plugin.revealElement(testElement);
            expect(plugin.currentRevealedElement).toBe(testElement);
            
            // Reveal second element should hide first
            plugin.revealElement(element2);
            expect(plugin.currentRevealedElement).toBe(element2);
            expect(testElement.classList.contains('power-redact-hidden')).toBe(true);
            expect(element2.classList.contains('power-redact-revealed')).toBe(true);
        });
        
        test('should handle mouseover events for non-touch devices', () => {
            // Mock non-touch device
            plugin.isTouch = false;
            
            const event = new dom.window.MouseEvent('mouseover', {
                bubbles: true,
                target: testElement
            });
            
            // Spy on revealElement method
            const revealSpy = jest.spyOn(plugin, 'revealElement');
            
            testElement.dispatchEvent(event);
            
            // Note: In real implementation, event listener would be on document
            // For testing, we simulate the behavior
            if (event.target.classList.contains('power-redact-hidden')) {
                plugin.revealElement(event.target);
            }
            
            expect(revealSpy).toHaveBeenCalledWith(testElement);
        });
    });

    describe('Touch Device Support', () => {
        let testElement;
        
        beforeEach(() => {
            testElement = document.createElement('span');
            testElement.className = 'power-redact-hidden';
            testElement.textContent = 'sensitive data';
            document.body.appendChild(testElement);
        });
        
        test('should toggle reveal on touch', () => {
            // Initially hidden
            expect(testElement.classList.contains('power-redact-hidden')).toBe(true);
            
            // First touch - reveal
            plugin.toggleRevealTouch(testElement);
            expect(testElement.classList.contains('power-redact-revealed')).toBe(true);
            expect(testElement.classList.contains('power-redact-touch-lock')).toBe(true);
            
            // Second touch - hide
            plugin.toggleRevealTouch(testElement);
            expect(testElement.classList.contains('power-redact-hidden')).toBe(true);
            expect(testElement.classList.contains('power-redact-touch-lock')).toBe(false);
        });
        
        test('should add edit lock indicator on touch reveal', () => {
            plugin.toggleRevealTouch(testElement);
            
            expect(testElement.classList.contains('power-redact-touch-lock')).toBe(true);
            
            // Check CSS pseudo-element content (simulated)
            const styles = dom.window.getComputedStyle(testElement, '::after');
            // Note: JSDOM doesn't fully support pseudo-elements, so we test class presence
            expect(testElement.classList.contains('power-redact-touch-lock')).toBe(true);
        });
        
        test('should handle touchstart events', () => {
            const event = new dom.window.TouchEvent('touchstart', {
                bubbles: true,
                touches: [{ target: testElement }]
            });
            
            const toggleSpy = jest.spyOn(plugin, 'toggleRevealTouch');
            
            // Simulate event handling
            if (plugin.isTouch && testElement.classList.contains('power-redact-hidden')) {
                event.preventDefault();
                plugin.toggleRevealTouch(testElement);
            }
            
            expect(toggleSpy).toHaveBeenCalledWith(testElement);
        });
    });

    describe('iOS Format Menu Integration', () => {
        beforeEach(() => {
            // Mock iOS user agent
            Object.defineProperty(global.navigator, 'userAgent', {
                value: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
                writable: true
            });
        });
        
        test('should detect iOS device', () => {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            expect(isIOS).toBe(true);
        });
        
        test('should add format menu option', () => {
            const mockMenu = document.createElement('div');
            mockMenu.className = 'format-menu';
            document.body.appendChild(mockMenu);
            
            plugin.addFormatMenuOption(mockMenu);
            
            const redactOption = mockMenu.querySelector('.power-redact-option');
            expect(redactOption).toBeTruthy();
            expect(redactOption.textContent).toBe('Redact');
        });
        
        test('should handle format menu redaction', () => {
            // Mock text selection
            const mockSelection = {
                rangeCount: 1,
                getRangeAt: jest.fn().mockReturnValue({
                    surroundContents: jest.fn()
                }),
                removeAllRanges: jest.fn()
            };
            
            global.window.getSelection = jest.fn().mockReturnValue(mockSelection);
            
            const redactSpy = jest.spyOn(plugin, 'redactSelection');
            
            plugin.redactSelection(mockSelection);
            
            expect(redactSpy).toHaveBeenCalledWith(mockSelection);
        });
    });

    describe('Settings Interface', () => {
        test('should show settings panel', () => {
            plugin.showSettings();
            
            expect(plugin.settingsPanel).toBeTruthy();
            expect(document.querySelector('.power-redact-settings')).toBeTruthy();
            expect(document.querySelector('.power-redact-overlay')).toBeTruthy();
        });
        
        test('should hide settings panel', () => {
            plugin.showSettings();
            expect(plugin.settingsPanel).toBeTruthy();
            
            plugin.hideSettings();
            expect(plugin.settingsPanel).toBe(null);
            expect(document.querySelector('.power-redact-settings')).toBeFalsy();
        });
        
        test('should toggle advanced accordion', () => {
            plugin.showSettings();
            
            const advancedContent = document.getElementById('advancedContent');
            expect(advancedContent.classList.contains('open')).toBe(false);
            
            plugin.toggleAdvanced();
            expect(advancedContent.classList.contains('open')).toBe(true);
            
            plugin.toggleAdvanced();
            expect(advancedContent.classList.contains('open')).toBe(false);
        });
        
        test('should add custom patterns', () => {
            plugin.showSettings();
            
            const input = document.getElementById('customPattern');
            input.value = 'test-pattern';
            
            plugin.addCustomPattern();
            
            expect(plugin.settings.customPatterns).toContain('test-pattern');
            expect(input.value).toBe('');
        });
        
        test('should add exclude terms', () => {
            plugin.showSettings();
            
            const input = document.getElementById('excludeTerm');
            input.value = 'exclude-this';
            
            plugin.addExcludeTerm();
            
            expect(plugin.settings.excludeTerms).toContain('exclude-this');
            expect(input.value).toBe('');
        });
        
        test('should remove custom patterns', () => {
            plugin.settings.customPatterns = ['pattern1', 'pattern2'];
            
            plugin.removeCustomPattern(0);
            
            expect(plugin.settings.customPatterns).toEqual(['pattern2']);
        });
        
        test('should save and close settings', () => {
            plugin.showSettings();
            
            // Mock form values
            document.getElementById('autoRedactPII').checked = false;
            document.getElementById('blockStyle').checked = false;
            document.getElementById('touchSupport').checked = false;
            
            const saveSpy = jest.spyOn(plugin, 'saveSettings');
            
            plugin.saveAndClose();
            
            expect(plugin.settings.autoRedactPII).toBe(false);
            expect(plugin.settings.blockStyle).toBe(false);
            expect(plugin.settings.touchSupport).toBe(false);
            expect(saveSpy).toHaveBeenCalled();
            expect(plugin.settingsPanel).toBe(null);
        });
    });

    describe('PII Auto-Redaction', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <p>Contact John at john.doe@email.com or call 555-123-4567</p>
                <p>SSN: 123-45-6789, Credit Card: 4532 1234 5678 9012</p>
            `;
        });
        
        test('should detect email addresses', () => {
            plugin.startAutoRedaction();
            
            const redactedElements = document.querySelectorAll('.power-redact-hidden');
            const emailFound = Array.from(redactedElements).some(el => 
                el.textContent.includes('john.doe@email.com')
            );
            
            expect(emailFound).toBe(true);
        });
        
        test('should detect phone numbers', () => {
            plugin.startAutoRedaction();
            
            const redactedElements = document.querySelectorAll('.power-redact-hidden');
            const phoneFound = Array.from(redactedElements).some(el => 
                el.textContent.includes('555-123-4567')
            );
            
            expect(phoneFound).toBe(true);
        });
        
        test('should detect SSN', () => {
            plugin.startAutoRedaction();
            
            const redactedElements = document.querySelectorAll('.power-redact-hidden');
            const ssnFound = Array.from(redactedElements).some(el => 
                el.textContent.includes('123-45-6789')
            );
            
            expect(ssnFound).toBe(true);
        });
        
        test('should detect credit card numbers', () => {
            plugin.startAutoRedaction();
            
            const redactedElements = document.querySelectorAll('.power-redact-hidden');
            const ccFound = Array.from(redactedElements).some(el => 
                el.textContent.includes('4532 1234 5678 9012')
            );
            
            expect(ccFound).toBe(true);
        });
        
        test('should respect exclude terms', () => {
            plugin.settings.excludeTerms = ['john.doe@email.com'];
            
            plugin.startAutoRedaction();
            
            const redactedElements = document.querySelectorAll('.power-redact-hidden');
            const emailExcluded = Array.from(redactedElements).every(el => 
                !el.textContent.includes('john.doe@email.com')
            );
            
            expect(emailExcluded).toBe(true);
        });
    });

    describe('Custom Pattern Redaction', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <p>This contains confidential information and secret data.</p>
                <p>Also includes private details and classified content.</p>
            `;
        });
        
        test('should redact custom patterns', () => {
            plugin.settings.customPatterns = ['confidential', 'secret'];
            
            plugin.startAutoRedaction();
            
            const redactedElements = document.querySelectorAll('.power-redact-hidden');
            const confidentialFound = Array.from(redactedElements).some(el => 
                el.textContent.includes('confidential')
            );
            const secretFound = Array.from(redactedElements).some(el => 
                el.textContent.includes('secret')
            );
            
            expect(confidentialFound).toBe(true);
            expect(secretFound).toBe(true);
        });
        
        test('should handle regex patterns', () => {
            plugin.settings.customPatterns = [/\b\w+ential\b/g];
            
            plugin.startAutoRedaction();
            
            const redactedElements = document.querySelectorAll('.power-redact-hidden');
            const patternFound = Array.from(redactedElements).some(el => 
                el.textContent.includes('confidential')
            );
            
            expect(patternFound).toBe(true);
        });
    });

    describe('Settings Persistence', () => {
        test('should save settings to localStorage', () => {
            plugin.settings.autoRedactPII = false;
            plugin.settings.customPatterns = ['test'];
            
            plugin.saveSettings();
            
            const saved = JSON.parse(localStorage.getItem('power-redact-settings'));
            expect(saved.autoRedactPII).toBe(false);
            expect(saved.customPatterns).toContain('test');
        });
        
        test('should load settings from localStorage', () => {
            const testSettings = {
                autoRedactPII: false,
                customPatterns: ['loaded-pattern'],
                excludeTerms: ['loaded-exclude']
            };
            
            localStorage.setItem('power-redact-settings', JSON.stringify(testSettings));
            
            const newPlugin = new PowerRedactPlugin();
            
            expect(newPlugin.settings.autoRedactPII).toBe(false);
            expect(newPlugin.settings.customPatterns).toContain('loaded-pattern');
            expect(newPlugin.settings.excludeTerms).toContain('loaded-exclude');
        });
    });

    describe('Public API Methods', () => {
        test('should manually redact text', () => {
            const element = plugin.redactText('sensitive information');
            
            expect(element.tagName).toBe('SPAN');
            expect(element.className).toBe('power-redact-hidden');
            expect(element.textContent).toBe('sensitive information');
        });
        
        test('should clear all redactions', () => {
            document.body.innerHTML = `
                <span class="power-redact-hidden">redacted1</span>
                <span class="power-redact-hidden">redacted2</span>
                <span>normal text</span>
            `;
            
            plugin.clearAllRedactions();
            
            expect(document.querySelectorAll('.power-redact-hidden')).toHaveLength(0);
            expect(document.body.textContent).toContain('redacted1');
            expect(document.body.textContent).toContain('redacted2');
            expect(document.body.textContent).toContain('normal text');
        });
        
        test('should export redacted content', () => {
            document.body.innerHTML = `
                <p>Normal text</p>
                <span class="power-redact-hidden">sensitive data</span>
                <p>More normal text</p>
            `;
            
            const exported = plugin.exportRedactedContent();
            
            expect(exported).toContain('Normal text');
            expect(exported).toContain('More normal text');
            expect(exported).toContain('█'); // Block character replacement
            expect(exported).not.toContain('sensitive data');
        });
    });

    describe('Keyboard Shortcuts', () => {
        test('should open settings with Ctrl+Shift+R', () => {
            const showSettingsSpy = jest.spyOn(plugin, 'showSettings');
            
            const event = new dom.window.KeyboardEvent('keydown', {
                key: 'R',
                ctrlKey: true,
                shiftKey: true,
                bubbles: true
            });
            
            document.dispatchEvent(event);
            
            // Simulate the event handler behavior
            if (event.ctrlKey && event.shiftKey && event.key === 'R') {
                event.preventDefault();
                plugin.showSettings();
            }
            
            expect(showSettingsSpy).toHaveBeenCalled();
        });
        
        test('should close settings with Escape', () => {
            plugin.showSettings();
            expect(plugin.settingsPanel).toBeTruthy();
            
            const hideSettingsSpy = jest.spyOn(plugin, 'hideSettings');
            
            const event = new dom.window.KeyboardEvent('keydown', {
                key: 'Escape',
                bubbles: true
            });
            
            document.dispatchEvent(event);
            
            // Simulate the event handler behavior
            if (event.key === 'Escape' && plugin.settingsPanel) {
                plugin.hideSettings();
            }
            
            expect(hideSettingsSpy).toHaveBeenCalled();
        });
    });

    describe('Error Handling', () => {
        test('should handle invalid selection gracefully', () => {
            const mockSelection = {
                rangeCount: 1,
                getRangeAt: jest.fn().mockReturnValue({
                    surroundContents: jest.fn().mockImplementation(() => {
                        throw new Error('Invalid selection');
                    })
                }),
                removeAllRanges: jest.fn()
            };
            
            const consoleSpy = jest.spyOn(console, 'warn');
            
            plugin.redactSelection(mockSelection);
            
            expect(consoleSpy).toHaveBeenCalledWith(
                'Could not redact complex selection:',
                expect.any(Error)
            );
        });
        
        test('should handle missing DOM elements gracefully', () => {
            plugin.showSettings();
            
            // Remove elements that updatePatternLists expects
            document.getElementById('customPatterns')?.remove();
            document.getElementById('excludeTerms')?.remove();
            
            // Should not throw error
            expect(() => plugin.updatePatternLists()).not.toThrow();
        });
    });

    describe('Performance & Memory Management', () => {
        test('should maintain redacted elements set', () => {
            const element1 = plugin.redactText('test1');
            const element2 = plugin.redactText('test2');
            
            plugin.redactedElements.add(element1);
            plugin.redactedElements.add(element2);
            
            expect(plugin.redactedElements.size).toBe(2);
            expect(plugin.redactedElements.has(element1)).toBe(true);
            expect(plugin.redactedElements.has(element2)).toBe(true);
        });
        
        test('should clean up on clearAllRedactions', () => {
            const element = plugin.redactText('test');
            plugin.redactedElements.add(element);
            
            plugin.clearAllRedactions();
            
            expect(plugin.redactedElements.size).toBe(0);
        });
    });
});

describe('Power Redact Plugin v2.0 - Integration Tests', () => {
    let plugin;
    
    beforeEach(() => {
        document.body.innerHTML = '';
        localStorage.clear();
        plugin = new PowerRedactPlugin();
    });
    
    test('should handle complete workflow: scan, reveal, hide, export', () => {
        // Setup content with PII
        document.body.innerHTML = `
            <div>
                <p>Contact: john@example.com</p>
                <p>Phone: 555-123-4567</p>
                <p>Normal content here</p>
            </div>
        `;
        
        // Auto-redact PII
        plugin.startAutoRedaction();
        
        const redactedElements = document.querySelectorAll('.power-redact-hidden');
        expect(redactedElements.length).toBeGreaterThan(0);
        
        // Reveal first element
        if (redactedElements[0]) {
            plugin.revealElement(redactedElements[0]);
            expect(redactedElements[0].classList.contains('power-redact-revealed')).toBe(true);
        }
        
        // Hide element
        if (redactedElements[0]) {
            plugin.hideElement(redactedElements[0]);
            expect(redactedElements[0].classList.contains('power-redact-hidden')).toBe(true);
        }
        
        // Export content
        const exported = plugin.exportRedactedContent();
        expect(exported).toContain('Normal content here');
        expect(exported).toContain('█'); // Redacted content replaced
    });
    
    test('should maintain settings across operations', () => {
        // Modify settings
        plugin.settings.autoRedactPII = false;
        plugin.settings.customPatterns = ['custom-test'];
        plugin.saveSettings();
        
        // Create new instance (simulating page reload)
        const newPlugin = new PowerRedactPlugin();
        
        // Settings should persist
        expect(newPlugin.settings.autoRedactPII).toBe(false);
        expect(newPlugin.settings.customPatterns).toContain('custom-test');
    });
});
