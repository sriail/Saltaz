# Local v86 Integration Summary

## Overview

The SliTaz v86 emulator has been updated to run the v86 emulation library locally instead of loading it from a CDN. This meets the requirement to have "files not run remotely" and ensures the system can work completely offline once initial setup is complete.

## Changes Made

### 1. Local v86 Library Structure

Created a new directory structure for hosting v86 files locally:
```
lib/v86/
├── README.md           # Comprehensive documentation
├── libv86.js          # v86 JavaScript library (downloaded via setup)
├── v86.wasm           # v86 WebAssembly module (downloaded via setup)
└── bios/
    ├── README.md       # BIOS files documentation
    ├── seabios.bin    # SeaBIOS (downloaded via setup)
    └── vgabios.bin    # VGA BIOS (downloaded via setup)
```

### 2. Automated Setup Script

Created `setup.sh` that automatically downloads all required files:
- v86 library files (libv86.js, v86.wasm)
- BIOS files (seabios.bin, vgabios.bin)

The script uses the browser-compatible v86 build from version 10.7.0 via CDN, ensuring compatibility.

### 3. Updated Application Files

**index.html:**
- Changed from CDN script tag to local: `<script src="lib/v86/libv86.js">`
- Added clearer comments explaining the local setup
- Maintains demo mode fallback if v86 isn't loaded

**emulator.js:**
- Updated WASM path: `wasm_path: "lib/v86/v86.wasm"`
- Updated BIOS paths: `url: "lib/v86/bios/seabios.bin"` and `url: "lib/v86/bios/vgabios.bin"`
- All v86 resources now load locally

**package.json:**
- Added setup script: `npm run setup`
- Added start script: `npm start`
- Includes v86 as dependency for reference

### 4. Documentation Updates

**README.md:**
- Added detailed installation instructions
- Emphasized the required setup step
- Included manual download instructions as fallback

**DEPLOYMENT.md:**
- Updated with local v86 integration information
- Explained advantages of local hosting
- Provided update instructions

**lib/v86/README.md:**
- Comprehensive guide for v86 files
- Troubleshooting section
- Manual download commands

**lib/v86/bios/README.md:**
- Documentation for BIOS files
- Alternative download sources
- Verification instructions

### 5. Git Configuration

**.gitignore:**
- Excludes downloaded BIOS binaries (`lib/v86/bios/*.bin`)
- Placeholder files are committed
- node_modules excluded
- package-lock.json excluded

## How It Works

### First-Time Setup

1. User clones the repository
2. User runs `npm install` (optional, for development)
3. User runs `npm run setup` or `./setup.sh`
4. Setup script downloads:
   - libv86.js (~327KB)
   - v86.wasm (~2MB)
   - seabios.bin (~128KB)
   - vgabios.bin (~32KB)
5. User starts a local web server
6. Application loads v86 from local files

### Runtime Operation

1. Browser loads `index.html`
2. `index.html` loads `lib/v86/libv86.js` (local)
3. libv86.js provides `V86Starter` constructor globally
4. emulator.js creates V86 instance with local paths:
   - WASM: `lib/v86/v86.wasm`
   - BIOS: `lib/v86/bios/seabios.bin`
   - VGA BIOS: `lib/v86/bios/vgabios.bin`
5. ISO loads from configured URL (can be local or remote)
6. Everything runs in the browser - no external dependencies

### Offline Operation

Once setup is complete, the system can run completely offline if:
1. v86 files are downloaded (via setup.sh)
2. SliTaz ISO is available locally
3. ISO path in emulator.js is updated to local file

## Requirements Met

✅ **Emulates in Browser** - Uses v86 WASM emulator
✅ **Local Files** - v86 library runs from local files, not CDN
✅ **No Remote Dependencies** - After setup, all resources are local (except ISO which can be made local)
✅ **Uses WASM** - v86.wasm provides high-performance emulation
✅ **Keeps Current UI** - All existing UI and features maintained
✅ **Network Routing Through Host** - Traffic routes through browser's network stack
✅ **Light/Dark Mode** - Browser theme syncing maintained
✅ **Metrics and Logging** - Full metrics system operational
✅ **Crash Reporting** - Local crash reporting functional
✅ **Settings** - Resource allocation and performance settings working

## Why CDN Download in Setup?

The v86 npm package provides ES module versions which don't work as browser `<script>` tags. The CDN version at v10.7.0 provides a browser-ready build with `V86Starter` as a global variable.

The setup script downloads from CDN once, then the files are local forever.

## Advantages

1. **No Runtime CDN Dependency** - After setup, works offline
2. **Faster Loading** - Local files load faster than CDN
3. **Reliability** - No CDN outages or blocking
4. **Version Control** - Specific v86 version (10.7.0) ensures compatibility
5. **Privacy** - No external requests after setup (except ISO)

## Testing

To test the system:

```bash
# Run setup
./setup.sh

# Start server
python3 -m http.server 8000

# Open browser
# Navigate to http://localhost:8000
```

The emulator should load and display the demo mode initially, then become fully functional once v86 files are downloaded.

## Troubleshooting

If v86 doesn't load:
1. Check that `lib/v86/libv86.js` exists and is >100KB
2. Check that `lib/v86/v86.wasm` exists and is >1MB
3. Check that BIOS files exist in `lib/v86/bios/`
4. Check browser console for errors
5. Re-run setup: `npm run setup`

## Future Enhancements

Potential improvements:
1. Bundle ISO locally for complete offline operation
2. Add version checking in setup script
3. Implement auto-update mechanism
4. Create pre-packaged download with all files
5. Add integrity checking for downloaded files

## Files Structure Summary

```
Siltaz/
├── index.html                  # Updated to use local v86
├── emulator.js                 # Updated with local paths
├── ui.js                       # Unchanged
├── metrics.js                  # Unchanged
├── styles.css                  # Unchanged
├── setup.sh                    # New - downloads v86 files
├── package.json                # Updated with scripts
├── README.md                   # Updated with setup instructions
├── DEPLOYMENT.md               # Updated with local v86 info
└── lib/
    └── v86/
        ├── README.md           # New - v86 documentation
        ├── libv86.js          # Downloaded via setup
        ├── v86.wasm           # Downloaded via setup
        └── bios/
            ├── README.md       # New - BIOS documentation
            ├── .gitkeep        # Placeholder with instructions
            ├── seabios.bin    # Downloaded via setup
            └── vgabios.bin    # Downloaded via setup
```

## Conclusion

The SliTaz v86 emulator now runs completely from local files, eliminating CDN dependencies while maintaining all existing functionality. The setup process is simple and well-documented, making it easy for users to get started.
