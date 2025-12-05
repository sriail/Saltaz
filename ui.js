// UI Controller for SalTaz Emulator
class UIController {
    constructor() {
        this.theme = this.getStoredTheme() || this.detectBrowserTheme();
        this.settingsModal = document.getElementById('settings-modal');
        this.metricsModal = document.getElementById('metrics-modal');
        this.setupEventListeners();
        this.applyTheme(this.theme);
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Start/Pause button
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.handleStartPause());
        }

        // Mouse lock
        const mouseLockBtn = document.getElementById('mouse-lock-btn');
        if (mouseLockBtn) {
            mouseLockBtn.addEventListener('click', () => {
                if (emulator) emulator.lockMouse();
            });
        }

        // Fullscreen
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        // Screenshot
        const screenshotBtn = document.getElementById('screenshot-btn');
        if (screenshotBtn) {
            screenshotBtn.addEventListener('click', () => {
                if (emulator) emulator.takeScreenshot();
            });
        }

        // Reset
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.handleReset());
        }

        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettings());
        }

        // Metrics button
        const metricsBtn = document.getElementById('metrics-btn');
        if (metricsBtn) {
            metricsBtn.addEventListener('click', () => this.openMetrics());
        }

        // Console toggle
        const consoleClose = document.getElementById('console-close');
        if (consoleClose) {
            consoleClose.addEventListener('click', () => this.toggleConsole());
        }

        // Settings inputs
        this.setupSettingsListeners();

        // Pointer lock change
        document.addEventListener('pointerlockchange', () => this.handlePointerLockChange());
        document.addEventListener('mozpointerlockchange', () => this.handlePointerLockChange());
        document.addEventListener('webkitpointerlockchange', () => this.handlePointerLockChange());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupSettingsListeners() {
        // Memory slider
        const memorySlider = document.getElementById('memory-size');
        const memoryValue = document.getElementById('memory-value');
        if (memorySlider && memoryValue) {
            memorySlider.addEventListener('input', (e) => {
                memoryValue.textContent = e.target.value + ' MB';
            });
        }

        // VGA memory slider
        const vgaSlider = document.getElementById('vga-memory');
        const vgaValue = document.getElementById('vga-memory-value');
        if (vgaSlider && vgaValue) {
            vgaSlider.addEventListener('input', (e) => {
                vgaValue.textContent = e.target.value + ' MB';
            });
        }

        // Export logs button
        const exportLogsBtn = document.getElementById('export-logs-btn');
        if (exportLogsBtn) {
            exportLogsBtn.addEventListener('click', () => {
                if (emulator && emulator.logger) {
                    emulator.logger.exportLogs();
                }
            });
        }
    }

    handleStartPause() {
        if (!emulator) return;

        const startBtn = document.getElementById('start-btn');
        const btnText = startBtn.querySelector('span:last-child');
        
        if (!emulator.isRunning) {
            emulator.start();
            btnText.textContent = 'Pause';
        } else {
            emulator.pause();
            btnText.textContent = 'Resume';
        }
    }

    handleReset() {
        if (!emulator) return;

        const confirmed = confirm('Are you sure you want to reset the emulator? All unsaved data will be lost.');
        if (confirmed) {
            emulator.reset();
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.saveTheme(this.theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    getStoredTheme() {
        return localStorage.getItem('slitaz-theme');
    }

    saveTheme(theme) {
        localStorage.setItem('slitaz-theme', theme);
    }

    detectBrowserTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    toggleFullscreen() {
        const container = document.getElementById('screen-container');
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    toggleConsole() {
        const consoleContainer = document.getElementById('console-container');
        if (consoleContainer) {
            consoleContainer.classList.toggle('hidden');
        }
    }

    handlePointerLockChange() {
        const mouseLockBtn = document.getElementById('mouse-lock-btn');
        if (!mouseLockBtn) return;

        const btnText = mouseLockBtn.querySelector('span');
        if (!btnText) {
            console.warn('Mouse lock button text element not found');
            return;
        }

        if (document.pointerLockElement === document.getElementById('screen-container')) {
            btnText.textContent = 'Unlock Mouse';
        } else {
            btnText.textContent = 'Lock Mouse';
        }
    }

    handleKeyboardShortcuts(e) {
        // Ctrl+Alt+C: Toggle console
        if (e.ctrlKey && e.altKey && e.key === 'c') {
            e.preventDefault();
            this.toggleConsole();
        }

        // Ctrl+Alt+F: Toggle fullscreen
        if (e.ctrlKey && e.altKey && e.key === 'f') {
            e.preventDefault();
            this.toggleFullscreen();
        }

        // Ctrl+Alt+M: Toggle mouse lock
        if (e.ctrlKey && e.altKey && e.key === 'm') {
            e.preventDefault();
            if (emulator) emulator.lockMouse();
        }
    }

    openSettings() {
        if (this.settingsModal) {
            this.settingsModal.classList.remove('hidden');
            this.loadCurrentSettings();
        }
    }

    loadCurrentSettings() {
        const savedSettings = localStorage.getItem('slitaz-settings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                
                const memorySlider = document.getElementById('memory-size');
                const memoryValue = document.getElementById('memory-value');
                if (memorySlider && settings.memorySize) {
                    memorySlider.value = settings.memorySize;
                    memoryValue.textContent = settings.memorySize + ' MB';
                }

                const vgaSlider = document.getElementById('vga-memory');
                const vgaValue = document.getElementById('vga-memory-value');
                if (vgaSlider && settings.vgaMemory) {
                    vgaSlider.value = settings.vgaMemory;
                    vgaValue.textContent = settings.vgaMemory + ' MB';
                }

                const cpuSpeed = document.getElementById('cpu-speed');
                if (cpuSpeed && settings.cpuSpeed) {
                    cpuSpeed.value = settings.cpuSpeed;
                }

                const acpiEnable = document.getElementById('acpi-enable');
                if (acpiEnable) {
                    acpiEnable.checked = settings.acpi !== false;
                }

                const localStorage = document.getElementById('local-storage-enable');
                if (localStorage) {
                    localStorage.checked = settings.localStorage || false;
                }

                const crashReporting = document.getElementById('crash-reporting');
                if (crashReporting) {
                    crashReporting.checked = settings.crashReporting !== false;
                }

                const metricsLogging = document.getElementById('metrics-logging');
                if (metricsLogging) {
                    metricsLogging.checked = settings.metricsLogging !== false;
                }
            } catch (e) {
                console.error('Failed to load settings:', e);
            }
        }
    }

    openMetrics() {
        if (this.metricsModal) {
            this.metricsModal.classList.remove('hidden');
            if (window.metricsCollector) {
                window.metricsCollector.updateDisplay();
            }
        }
    }
}

// Global functions called from HTML
function closeSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('hidden');
}

function saveSettings() {
    const settings = {
        memorySize: parseInt(document.getElementById('memory-size').value),
        vgaMemory: parseInt(document.getElementById('vga-memory').value),
        cpuSpeed: parseFloat(document.getElementById('cpu-speed').value),
        acpi: document.getElementById('acpi-enable').checked,
        localStorage: document.getElementById('local-storage-enable').checked,
        crashReporting: document.getElementById('crash-reporting').checked,
        metricsLogging: document.getElementById('metrics-logging').checked
    };

    localStorage.setItem('slitaz-settings', JSON.stringify(settings));

    // Update emulator if running
    if (emulator) {
        emulator.updateCPUSpeed(settings.cpuSpeed);
        if (emulator.crashReporter) {
            emulator.crashReporter.setEnabled(settings.crashReporting);
        }
    }

    alert('Settings saved! Some settings will take effect after restarting the emulator.');
    closeSettings();
}

function closeMetrics() {
    const modal = document.getElementById('metrics-modal');
    if (modal) modal.classList.add('hidden');
}

function exportMetrics() {
    if (window.metricsCollector) {
        window.metricsCollector.exportMetrics();
    }
}

// Initialize UI controller
let uiController = null;
window.addEventListener('DOMContentLoaded', () => {
    uiController = new UIController();
});

// Listen for browser theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (uiController && !uiController.getStoredTheme()) {
        uiController.applyTheme(e.matches ? 'dark' : 'light');
    }
});
