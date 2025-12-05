# SalTaz Emulator - Deployment Guide

## Quick Start

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/sriail/Saltaz.git
cd Saltaz
```

2. **Start a local web server:**

Using Python 3:
```bash
python3 -m http.server 8000
```

Using Node.js:
```bash
npx http-server -p 8000
```

Using PHP:
```bash
php -S localhost:8000
```

3. **Open in browser:**
```
http://localhost:8000
```

## Deployment Options

### Static Hosting (Recommended)

Deploy to any static hosting service:

#### GitHub Pages
1. Go to repository Settings → Pages
2. Select source branch (main or copilot/build-v86-linux-emulator)
3. Click Save
4. Access at: `https://[username].github.io/Saltaz/`

#### Netlify
1. Connect your GitHub repository
2. Build command: (leave empty)
3. Publish directory: `/`
4. Deploy!

#### Vercel
1. Import GitHub repository
2. Framework Preset: Other
3. Root Directory: `/`
4. Deploy!

#### Cloudflare Pages
1. Connect GitHub repository
2. Build command: (none needed)
3. Build output directory: `/`
4. Deploy!

### CDN Integration

The application uses CDN for v86 library:
```
https://cdn.jsdelivr.net/npm/v86@latest/build/libv86.js
https://cdn.jsdelivr.net/npm/v86@latest/build/v86.wasm
```

For production, consider:
1. Self-hosting v86 files for better reliability
2. Using a specific version instead of `@latest`

### Self-Hosting v86

To self-host v86 library:

1. **Download v86 files:**
```bash
wget https://cdn.jsdelivr.net/npm/v86@latest/build/libv86.js
wget https://cdn.jsdelivr.net/npm/v86@latest/build/v86.wasm
mkdir -p bios
wget -P bios https://cdn.jsdelivr.net/npm/v86@latest/bios/seabios.bin
wget -P bios https://cdn.jsdelivr.net/npm/v86@latest/bios/vgabios.bin
```

2. **Update index.html:**
```html
<script src="libv86.js"></script>
```

3. **Update emulator.js:**
```javascript
const v86Config = {
    wasm_path: "v86.wasm",
    bios: {
        url: "bios/seabios.bin",
    },
    vga_bios: {
        url: "bios/vgabios.bin",
    },
    // ... rest of config
};
```

## Custom ISO Image

To use a custom SalTaz/SliTaz ISO:

1. **Prepare your ISO file**
2. **Host it on your server or CDN**
3. **Update emulator.js:**

```javascript
cdrom: {
    url: "/path/to/saltaz.iso",
    async: true,
    size: [SIZE_IN_BYTES]
},
```

## Configuration

### Memory Settings

Default: 512MB RAM, 8MB VGA
Adjust in `emulator.js`:

```javascript
this.config = {
    memory_size: 512 * 1024 * 1024, // 512MB
    vga_memory_size: 8 * 1024 * 1024, // 8MB
};
```

### Performance Tuning

For better performance:
1. Increase memory allocation (up to 1GB)
2. Enable hardware acceleration in browser
3. Use Chrome/Edge for best performance
4. Close unnecessary browser tabs

## Browser Compatibility

Minimum requirements:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- WebAssembly support required

## Security Considerations

1. **CORS Headers**: Ensure proper CORS headers for ISO files
2. **HTTPS**: Use HTTPS in production for security
3. **Content Security Policy**: Configure CSP headers appropriately

Example nginx configuration:
```nginx
add_header Access-Control-Allow-Origin *;
add_header Cross-Origin-Embedder-Policy require-corp;
add_header Cross-Origin-Opener-Policy same-origin;
```

## Troubleshooting

### v86 Library Not Loading

If v86 fails to load from CDN:
1. Check browser console for errors
2. Verify internet connectivity
3. Try self-hosting v86 files
4. Check for ad-blocker interference

### ISO Not Loading

1. Verify ISO file is accessible
2. Check CORS headers
3. Ensure ISO size is correct in config
4. Check browser console for download errors

### Performance Issues

1. Reduce memory allocation
2. Lower CPU speed multiplier
3. Disable ACPI if not needed
4. Close other applications
5. Use hardware-accelerated browser

### Mouse Lock Not Working

1. Must be triggered by user action (click)
2. Check browser permissions
3. Use HTTPS (required by some browsers)
4. Try fullscreen mode first

## Advanced Configuration

### Custom Network Routing

To configure custom network routing:

```javascript
createNetworkAdapter() {
    return {
        url: "ws://your-relay-server:8080",
        enabled: true
    };
}
```

### Local Storage Integration

Enable persistent storage:

```javascript
// In settings
localStorage: true

// Then in emulator config
fda: {
    buffer: savedStateBuffer,
},
```

## Monitoring & Logging

### Export Logs

Users can export logs via:
1. Settings → Export Logs
2. Metrics → Export Metrics

### View Console Output

Press `Ctrl+Alt+C` to toggle backend console

### Crash Reports

Crash reports are stored in localStorage:
```javascript
localStorage.getItem('saltaz-crashes')
```

## Performance Benchmarks

Typical performance on modern hardware:
- Boot time: 30-60 seconds
- Memory usage: 512MB-1GB
- CPU usage: 30-60%
- FPS: 30-60

## Support & Issues

For issues or questions:
1. Check the README.md
2. Review browser console errors
3. Open GitHub issue with details
4. Include browser version and OS

## License

See LICENSE file in repository.

## Credits

- v86: https://github.com/copy/v86
- SliTaz: http://www.slitaz.org/
