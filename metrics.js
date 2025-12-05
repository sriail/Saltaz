// Metrics Collection and Monitoring System
class MetricsCollector {
    constructor() {
        this.metrics = {
            cpu: [],
            memory: [],
            fps: [],
            network: [],
            disk: [],
            packets: []
        };
        this.maxDataPoints = 60; // Keep last 60 data points
        this.isRunning = false;
        this.charts = {};
        this.currentStats = {
            cpu: 0,
            memory: 0,
            fps: 0,
            network: 0,
            disk: 0,
            packets: 0,
            uptime: 0
        };
        this.lastNetworkBytes = 0;
        this.fpsCounter = 0;
        this.lastFpsTime = Date.now();
        
        // Chart rendering constants
        this.CHART_FILL_OPACITY = '20';
        this.CHART_GRID_COLOR = 'rgba(128, 128, 128, 0.2)';
        this.CHART_LINE_WIDTH = 2;
        this.CHART_GRID_LINES = 4;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.collectMetrics();
        this.updateDisplay();
        
        // Update metrics every second
        this.metricsInterval = setInterval(() => {
            this.collectMetrics();
        }, 1000);

        // Update display every 100ms for smooth updates
        this.displayInterval = setInterval(() => {
            this.updateDisplay();
        }, 100);

        // Update FPS counter
        this.fpsInterval = setInterval(() => {
            this.updateFPS();
        }, 1000);
    }

    stop() {
        this.isRunning = false;
        if (this.metricsInterval) clearInterval(this.metricsInterval);
        if (this.displayInterval) clearInterval(this.displayInterval);
        if (this.fpsInterval) clearInterval(this.fpsInterval);
    }

    collectMetrics() {
        // Simulate CPU usage (in a real implementation, this would come from v86)
        const cpuUsage = this.estimateCPUUsage();
        this.metrics.cpu.push(cpuUsage);
        this.currentStats.cpu = cpuUsage;

        // Simulate memory usage
        const memoryUsage = this.estimateMemoryUsage();
        this.metrics.memory.push(memoryUsage);
        this.currentStats.memory = memoryUsage;

        // Simulate network I/O
        const networkIO = this.estimateNetworkIO();
        this.metrics.network.push(networkIO);
        this.currentStats.network = networkIO;

        // Simulate disk I/O
        const diskIO = this.estimateDiskIO();
        this.metrics.disk.push(diskIO);
        this.currentStats.disk = diskIO;

        // Simulate network packets
        const packets = this.estimatePackets();
        this.metrics.packets.push(packets);
        this.currentStats.packets = packets;

        // Update uptime
        if (emulator && emulator.startTime) {
            this.currentStats.uptime = Math.floor((Date.now() - emulator.startTime) / 1000);
        }

        // Keep only recent data points
        if (this.metrics.cpu.length > this.maxDataPoints) {
            this.metrics.cpu.shift();
            this.metrics.memory.shift();
            this.metrics.network.shift();
            this.metrics.disk.shift();
            this.metrics.packets.shift();
        }

        // Log to event log
        this.logMetricEvent();
    }

    estimateCPUUsage() {
        // In a real implementation, this would get actual CPU usage from v86
        // For now, simulate based on emulator state
        if (!emulator || !emulator.isRunning) return 0;
        
        // Simulate varying CPU usage
        const baseUsage = 30;
        const variance = Math.random() * 20;
        return Math.min(100, baseUsage + variance);
    }

    estimateMemoryUsage() {
        // Get configured memory size
        if (!emulator) return 0;
        
        const configuredMemory = emulator.config.memory_size / (1024 * 1024); // Convert to MB
        const usagePercent = emulator.isRunning ? 0.6 + (Math.random() * 0.2) : 0.1;
        return Math.round(configuredMemory * usagePercent);
    }

    estimateNetworkIO() {
        // Simulate network I/O in KB/s
        if (!emulator || !emulator.isRunning) return 0;
        
        return Math.random() * 100;
    }

    estimateDiskIO() {
        // Simulate disk I/O in KB/s
        if (!emulator || !emulator.isRunning) return 0;
        
        return Math.random() * 50;
    }

    estimatePackets() {
        // Simulate network packets per second
        if (!emulator || !emulator.isRunning) return 0;
        
        return Math.floor(Math.random() * 200);
    }

    updateFPS() {
        // Calculate FPS based on frame counter
        const now = Date.now();
        const elapsed = (now - this.lastFpsTime) / 1000;
        const fps = this.fpsCounter / elapsed;
        
        this.currentStats.fps = Math.round(fps);
        this.metrics.fps.push(this.currentStats.fps);
        
        if (this.metrics.fps.length > this.maxDataPoints) {
            this.metrics.fps.shift();
        }
        
        this.fpsCounter = 0;
        this.lastFpsTime = now;
    }

    incrementFrameCounter() {
        this.fpsCounter++;
    }

    updateDisplay() {
        // Update sidebar status
        const cpuElement = document.getElementById('cpu-usage');
        if (cpuElement) {
            cpuElement.textContent = Math.round(this.currentStats.cpu) + '%';
        }

        const memoryElement = document.getElementById('memory-usage');
        if (memoryElement) {
            memoryElement.textContent = Math.round(this.currentStats.memory) + ' MB';
        }

        const fpsElement = document.getElementById('fps-counter');
        if (fpsElement) {
            fpsElement.textContent = this.currentStats.fps;
        }

        // Update metrics modal if open
        const metricsModal = document.getElementById('metrics-modal');
        if (metricsModal && !metricsModal.classList.contains('hidden')) {
            this.updateMetricsModal();
        }
    }

    updateMetricsModal() {
        // Update metric values
        const metricCPU = document.getElementById('metric-cpu');
        if (metricCPU) {
            metricCPU.textContent = Math.round(this.currentStats.cpu) + '%';
        }

        const metricMemory = document.getElementById('metric-memory');
        if (metricMemory) {
            metricMemory.textContent = Math.round(this.currentStats.memory) + ' MB';
        }

        const metricFPS = document.getElementById('metric-fps');
        if (metricFPS) {
            metricFPS.textContent = this.currentStats.fps + ' FPS';
        }

        const metricNetwork = document.getElementById('metric-network');
        if (metricNetwork) {
            metricNetwork.textContent = Math.round(this.currentStats.network) + ' KB/s';
        }

        const metricDisk = document.getElementById('metric-disk');
        if (metricDisk) {
            metricDisk.textContent = Math.round(this.currentStats.disk) + ' KB/s';
        }

        const metricPackets = document.getElementById('metric-packets');
        if (metricPackets) {
            metricPackets.textContent = Math.round(this.currentStats.packets) + ' pkt/s';
        }

        // Update uptime
        const metricUptime = document.getElementById('metric-uptime');
        const uptimeDetail = document.getElementById('uptime-detail');
        if (metricUptime && emulator) {
            const uptime = this.currentStats.uptime;
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = uptime % 60;
            metricUptime.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            if (uptimeDetail) {
                uptimeDetail.textContent = `${uptime} seconds`;
            }
        }

        // Update emulator state
        const metricState = document.getElementById('metric-state');
        const bootTimeElement = document.getElementById('boot-time');
        const instructionsElement = document.getElementById('instructions-count');
        
        if (metricState && emulator) {
            metricState.textContent = emulator.state.charAt(0).toUpperCase() + emulator.state.slice(1);
        }
        
        if (bootTimeElement && emulator && emulator.bootTime) {
            const bootDuration = Math.round((Date.now() - emulator.bootTime) / 1000);
            bootTimeElement.textContent = `${bootDuration}s ago`;
        } else if (bootTimeElement) {
            bootTimeElement.textContent = 'N/A';
        }
        
        if (instructionsElement && emulator && emulator.isRunning) {
            // Simulate instruction count
            instructionsElement.textContent = Math.floor(Math.random() * 1000000).toLocaleString();
        } else if (instructionsElement) {
            instructionsElement.textContent = '0';
        }

        // Update charts
        this.updateCharts();
    }

    updateCharts() {
        this.drawChart('cpu-chart', this.metrics.cpu, '#2563eb');
        this.drawChart('memory-chart', this.metrics.memory, '#10b981');
        this.drawChart('fps-chart', this.metrics.fps, '#f59e0b');
        this.drawChart('network-chart', this.metrics.network, '#8b5cf6');
        this.drawChart('disk-chart', this.metrics.disk, '#ec4899');
        this.drawChart('packets-chart', this.metrics.packets, '#06b6d4');
    }

    drawChart(canvasId, data, color) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        if (data.length === 0) return;

        // Find max value for scaling
        const maxValue = Math.max(...data, 1);

        // Draw grid lines
        ctx.strokeStyle = this.CHART_GRID_COLOR;
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= this.CHART_GRID_LINES; i++) {
            const y = (height / this.CHART_GRID_LINES) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Draw data line
        ctx.strokeStyle = color;
        ctx.lineWidth = this.CHART_LINE_WIDTH;
        ctx.beginPath();

        const pointSpacing = width / (this.maxDataPoints - 1);
        
        data.forEach((value, index) => {
            const x = index * pointSpacing;
            const y = height - (value / maxValue) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Fill area under line
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = color + this.CHART_FILL_OPACITY;
        ctx.fill();
    }

    logMetricEvent() {
        const eventLog = document.getElementById('event-log');
        if (!eventLog) return;

        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] CPU: ${Math.round(this.currentStats.cpu)}% | Memory: ${Math.round(this.currentStats.memory)}MB | FPS: ${this.currentStats.fps}\n`;
        
        const currentLog = eventLog.textContent;
        const lines = currentLog.split('\n');
        
        if (lines.length > 50) {
            lines.shift();
        }
        
        lines.push(logEntry);
        eventLog.textContent = lines.join('\n');
        eventLog.scrollTop = eventLog.scrollHeight;
    }

    exportMetrics() {
        const exportData = {
            timestamp: new Date().toISOString(),
            currentStats: this.currentStats,
            historicalData: {
                cpu: this.metrics.cpu,
                memory: this.metrics.memory,
                fps: this.metrics.fps,
                network: this.metrics.network,
                disk: this.metrics.disk,
                packets: this.metrics.packets
            },
            config: emulator ? emulator.config : null,
            logs: emulator && emulator.logger ? emulator.logger.getLogs() : []
        };

        const json = JSON.stringify(exportData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `slitaz-metrics-${Date.now()}.json`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }

    getMetrics() {
        return {
            current: this.currentStats,
            historical: this.metrics
        };
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.enabled = true;
        this.latencyMeasurements = [];
        this.inputLatency = 0;
    }

    measureInputLatency() {
        const start = performance.now();
        
        // Simulate input processing
        requestAnimationFrame(() => {
            const end = performance.now();
            this.inputLatency = end - start;
            this.latencyMeasurements.push(this.inputLatency);
            
            if (this.latencyMeasurements.length > 100) {
                this.latencyMeasurements.shift();
            }
        });
    }

    getAverageLatency() {
        if (this.latencyMeasurements.length === 0) return 0;
        
        const sum = this.latencyMeasurements.reduce((a, b) => a + b, 0);
        return sum / this.latencyMeasurements.length;
    }

    isLowLatency() {
        // Consider low latency as < 16ms (60 FPS)
        return this.getAverageLatency() < 16;
    }
}

// Initialize global metrics collector
window.metricsCollector = null;
window.performanceMonitor = null;

window.addEventListener('DOMContentLoaded', () => {
    window.metricsCollector = new MetricsCollector();
    window.performanceMonitor = new PerformanceMonitor();
    
    // Start metrics collection when emulator starts
    const originalStart = emulator ? emulator.start : null;
    if (originalStart) {
        emulator.start = function() {
            originalStart.call(this);
            if (window.metricsCollector) {
                window.metricsCollector.start();
            }
        };
    }

    // Track frame updates for FPS
    setInterval(() => {
        if (emulator && emulator.isRunning && window.metricsCollector) {
            window.metricsCollector.incrementFrameCounter();
        }
    }, 16); // ~60 FPS
});

// Keyboard and mouse input monitoring for latency tracking
document.addEventListener('keydown', () => {
    if (window.performanceMonitor) {
        window.performanceMonitor.measureInputLatency();
    }
});

document.addEventListener('mousedown', () => {
    if (window.performanceMonitor) {
        window.performanceMonitor.measureInputLatency();
    }
});
