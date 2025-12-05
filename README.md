# SliTaz - v86 Linux Emulator

A modern, lightweight browser-based Linux emulator powered by v86, providing a seamless experience for running SliTaz 4.0 (core edition with Midori browser) directly in your web browser.

## Features

### Core Functionality
- ✅ **Browser-based Emulation**: Runs entirely in the browser using v86 and WebAssembly
- ✅ **Local v86 Integration**: v86 emulator is bundled locally, no CDN dependencies
- ✅ **SliTaz 4.0 Core**: Pre-configured with SliTaz 4.0 ISO featuring Midori browser
- ✅ **Terminal Support**: Full terminal access for command-line operations
- ✅ **Pre-installed Applications**: Browser (Midori), Notepad, Settings, and base utilities
- ✅ **Network Routing**: All traffic routes through the host device (no external proxies)
- ✅ **Local Execution**: ISO files are sent to the client and run locally

### User Experience
- ✅ **Mouse Lock & Integration**: Seamless mouse capture with pointer lock API
- ✅ **Modern UI**: Clean, simplistic interface with SVG icons that complements SliTaz aesthetics
- ✅ **Light/Dark Mode**: Automatic theme syncing with browser preferences
- ✅ **Fullscreen Support**: Immersive full-screen mode
- ✅ **Keyboard Shortcuts**: Quick access to common functions

### Performance & Monitoring
- ✅ **Resource Allocation**: Configurable memory and VGA memory settings
- ✅ **Performance Settings**: Adjustable CPU speed and ACPI configuration
- ✅ **Enhanced Metrics Dashboard**: Real-time CPU, memory, FPS, network I/O, disk I/O, network packets, uptime, and emulator state monitoring
- ✅ **Low Latency**: Optimized for rapid input forwarding and minimal lag
- ✅ **Backend Console**: Viewable system logs and serial output

### Advanced Features
- ✅ **Crash Reporting**: Local logging for both the main site and v86 emulator
- ✅ **Metrics Export**: Export system metrics and logs in JSON format
- ✅ **Local Storage**: Advanced setting for persistent file storage
- ✅ **Screenshot Capture**: Take screenshots of the running system

## Getting Started

### Prerequisites
- Modern web browser with WebAssembly support (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- ~512MB RAM available for the emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sriail/Saltaz.git
cd Saltaz
```

2. Install dependencies:
```bash
npm install
```

3. Download v86 BIOS files (required):
```bash
npm run setup
# or
./setup.sh
```

4. Serve the files using any web server:
```bash
# Using npm
npm start

# Or using Python 3
python -m http.server 8000

# Or using Node.js http-server
npx http-server -p 8000

# Or using PHP
php -S localhost:8000
```

5. Open your browser and navigate to:
```
http://localhost:8000
```

### Quick Start

1. Wait for the emulator to initialize (progress bar will show loading status)
2. Click "Start Emulator" to boot the system
3. Use the sidebar controls for quick actions:
   - Lock Mouse: Capture mouse for seamless interaction
   - Fullscreen: Enter fullscreen mode
   - Screenshot: Capture the current screen
   - Reset: Restart the emulator

## Configuration

### Resource Allocation

Access settings via the gear icon in the header:

- **Memory**: Adjust RAM allocation (128MB - 1024MB)
- **VGA Memory**: Configure video memory (2MB - 64MB)
- **CPU Speed**: Set CPU speed multiplier (50% - 200%)
- **ACPI**: Enable/disable ACPI support

### Keyboard Shortcuts

- `Ctrl + Alt + C`: Toggle backend console
- `Ctrl + Alt + F`: Toggle fullscreen
- `Ctrl + Alt + M`: Toggle mouse lock

## Architecture

### Components

1. **index.html**: Main application structure and UI layout
2. **styles.css**: Modern styling with light/dark theme support
3. **emulator.js**: Core v86 emulation logic and system management
4. **ui.js**: User interface controller and event handling
5. **metrics.js**: Performance monitoring and metrics collection

### Data Flow

```
User Input → UI Controller → Emulator Core → v86 Engine
                ↓                              ↓
         Settings/State                  Serial Output
                ↓                              ↓
         Local Storage                 Console/Metrics
```

### Network Architecture

- All network traffic routes through the browser's network stack
- No external proxy servers required
- Direct host device routing for web browsing within the VM

## Logging & Monitoring

### Metrics Dashboard

Access via the metrics icon in the header to view:

- **CPU Usage**: Real-time processor utilization
- **Memory Usage**: RAM consumption tracking
- **Frame Rate**: FPS monitoring for performance
- **Network I/O**: Data transfer rates
- **Disk I/O**: Disk read/write speeds
- **Network Packets**: Packets per second
- **Uptime**: System running time
- **Emulator State**: Current state, boot time, and instructions count

### Export Options

- **Logs**: Export system logs as `.txt` file
- **Metrics**: Export full metrics data as `.json` file
- **Crash Reports**: Export crash reports for debugging

## Advanced Settings

### Local Storage (Experimental)

Enable local file storage for persistent data between sessions:

1. Open Settings
2. Enable "Local Storage"
3. Save and restart the emulator

### Crash Reporting

Automatic crash detection and logging:

- Crashes are logged locally (no external servers)
- Reports include timestamp, context, and stack trace
- Export reports via Settings → Export Logs

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full Support |
| Firefox | 88+     | ✅ Full Support |
| Safari  | 14+     | ✅ Full Support |
| Edge    | 90+     | ✅ Full Support |

## Performance Tips

1. **Allocate appropriate memory**: 512MB recommended for most use cases
2. **Close unnecessary browser tabs**: Free up system resources
3. **Use fullscreen mode**: Better performance and user experience
4. **Enable hardware acceleration**: In browser settings for better graphics

## Troubleshooting

### Emulator won't start
- Check browser console for errors
- Ensure JavaScript is enabled
- Verify WebAssembly support
- Try reducing memory allocation

### Poor performance
- Reduce CPU speed multiplier
- Lower memory allocation
- Close other applications
- Check metrics for bottlenecks

### Mouse not working
- Click "Lock Mouse" button
- Press `Ctrl + Alt + M`
- Check browser permissions

## Roadmap

### Planned Features (Future Releases)

- [ ] Offline HTML page support for standalone operation
- [ ] Chrome App functionality
- [ ] Enhanced local file caching system
- [ ] Multi-session support
- [ ] Snapshot/restore functionality

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [v86](https://github.com/copy/v86) - The x86 virtualization engine
- [SliTaz](http://www.slitaz.org/) - The base Linux distribution
- All contributors and users of the SliTaz project

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check the documentation above
- Review the browser console for error messages

---

**Note**: This is an emulation system running in a web browser. Performance may vary depending on your hardware and browser capabilities.
