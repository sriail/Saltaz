# v86 Library Files

This directory contains the v86 emulator library files required for SliTaz to run.

## What is v86?

v86 is an x86 virtualization engine that runs in the browser using WebAssembly. It allows us to run full operating systems like SliTaz Linux directly in the web browser without any plugins.

## Required Files

The following files must be present in this directory for the emulator to function:

### Core Library Files
- **libv86.js** (~327KB) - The main v86 JavaScript library
- **v86.wasm** (~2MB) - The WebAssembly module containing the x86 emulator

### BIOS Files (in `bios/` subdirectory)
- **seabios.bin** (~128KB) - SeaBIOS BIOS implementation
- **vgabios.bin** (~32KB) - VGA BIOS for graphics support

## Installation

### Automatic (Recommended)

Run the setup script from the project root:

```bash
npm run setup
```

or

```bash
./setup.sh
```

This will automatically download all required files.

### Manual Download

If automatic download fails, you can download the files manually:

**v86 Library Files:**
```bash
curl -L -o lib/v86/libv86.js https://cdn.jsdelivr.net/npm/v86@10.7.0/build/libv86.js
curl -L -o lib/v86/v86.wasm https://cdn.jsdelivr.net/npm/v86@10.7.0/build/v86.wasm
```

**BIOS Files:**
```bash
curl -L -o lib/v86/bios/seabios.bin https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/seabios.bin
curl -L -o lib/v86/bios/vgabios.bin https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/vgabios.bin
```

Or download from:
- libv86.js: https://cdn.jsdelivr.net/npm/v86@10.7.0/build/libv86.js
- v86.wasm: https://cdn.jsdelivr.net/npm/v86@10.7.0/build/v86.wasm
- seabios.bin: https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/seabios.bin
- vgabios.bin: https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/vgabios.bin

## Why Aren't These Files Included?

These files are not included in the repository for several reasons:

1. **Size** - The files total ~2.5MB, which would make the repository unnecessarily large
2. **Updates** - Users can easily update to newer versions of v86 by re-running the setup script
3. **Licensing** - While v86 is open source (BSD-2-Clause), it's better practice to have users download it directly
4. **Bandwidth** - Reduces clone times and bandwidth usage

## Verifying Installation

After running the setup script, verify the files exist:

```bash
ls -lh lib/v86/
ls -lh lib/v86/bios/
```

You should see:
```
lib/v86/
  libv86.js (~327KB)
  v86.wasm (~2MB)
  bios/
    seabios.bin (~128KB)
    vgabios.bin (~32KB)
```

## Troubleshooting

### Files Not Downloading

If the setup script can't download files:
1. Check your internet connection
2. Try downloading manually (see above)
3. Check if a firewall or proxy is blocking the CDN
4. Try using `wget` instead of `curl` (or vice versa)

### Emulator Not Starting

If the emulator doesn't start after setup:
1. Ensure all four files are present and not corrupted
2. Check browser console for errors
3. Verify file sizes match approximately:
   - libv86.js: 300-350KB
   - v86.wasm: 1.9-2.1MB
   - seabios.bin: 125-130KB
   - vgabios.bin: 30-35KB

### File Permissions

Ensure the files are readable:
```bash
chmod 644 lib/v86/libv86.js lib/v86/v86.wasm
chmod 644 lib/v86/bios/*.bin
```

## Updating v86

To update to a newer version of v86:

1. Delete the existing files:
   ```bash
   rm lib/v86/libv86.js lib/v86/v86.wasm lib/v86/bios/*.bin
   ```

2. Update the version in `setup.sh` (change `@10.7.0` to desired version)

3. Re-run the setup:
   ```bash
   npm run setup
   ```

## More Information

- v86 Project: https://github.com/copy/v86
- v86 Demos: https://copy.sh/v86/
- SeaBIOS: https://www.seabios.org/
- VGA BIOS: https://bochs.sourceforge.io/

## License

- v86: BSD-2-Clause License
- SeaBIOS: LGPLv3
- VGA BIOS (Bochs): LGPLv2+

See the respective project websites for full license texts.
