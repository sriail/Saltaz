# SalTaz Emulator - Deployment Guide

## Quick Start

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/sriail/Saltaz.git
cd Saltaz
```

2. **Install dependencies:**
```bash
npm install
```

3. **Download v86 BIOS files:**
```bash
npm run setup
# or
./setup.sh
```

This will download the required BIOS files (seabios.bin and vgabios.bin) to `lib/v86/bios/`.

4. **Start a local web server:**

Using npm:
```bash
npm start
```

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

5. **Open in browser:**
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

The application now uses locally bundled v86 library files instead of CDN:
```
lib/v86/libv86.js     - v86 JavaScript library
lib/v86/v86.wasm      - v86 WebAssembly module
lib/v86/bios/         - BIOS files (downloaded via setup.sh)
```

This provides several advantages:
1. Works completely offline (after initial ISO download)
2. No external dependencies or CDN failures
3. Faster loading times
4. Better reliability

### BIOS Files

The v86 emulator requires BIOS files to function. These are not included in the repository due to size and licensing considerations, but can be easily downloaded:

**Automatic download (recommended):**
```bash
npm run setup
# or
./setup.sh
```

**Manual download:**
```bash
curl -L -o lib/v86/bios/seabios.bin https://cdn.jsdelivr.net/npm/v86@latest/bios/seabios.bin
curl -L -o lib/v86/bios/vgabios.bin https://cdn.jsdelivr.net/npm/v86@latest/bios/vgabios.bin
```

The files should be placed in `lib/v86/bios/`:
- `seabios.bin` (~128KB)
- `vgabios.bin` (~32KB)

### Self-Hosting v86

v86 is now bundled locally in the `lib/v86/` directory. The repository includes:
- `lib/v86/libv86.js` - Main v86 library
- `lib/v86/v86.wasm` - WebAssembly module

The BIOS files are downloaded separately via the setup script to keep the repository size small.

If you need to update v86 to a different version:

1. **Install specific version via npm:**
```bash
npm install v86@10.7.0
```

2. **Copy files to lib directory:**
```bash
cp node_modules/v86/build/libv86.js lib/v86/
cp node_modules/v86/build/v86.wasm lib/v86/
```

3. **Download BIOS files:**
```bash
npm run setup
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
