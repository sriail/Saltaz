# v86 BIOS Files

This directory contains the BIOS files required for the v86 emulator to function.

## Required Files

- `seabios.bin` - SeaBIOS BIOS implementation
- `vgabios.bin` - VGA BIOS for graphics support

## How to Obtain BIOS Files

### Automatic Method (Recommended)

Run the setup script from the root directory:

```bash
./setup.sh
```

This will automatically download the required BIOS files.

### Manual Method

If the automatic method fails, download the files manually:

1. **SeaBIOS** (128KB):
   ```bash
   curl -L -o lib/v86/bios/seabios.bin https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/seabios.bin
   ```
   Or download from: https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/seabios.bin

2. **VGA BIOS** (32KB):
   ```bash
   curl -L -o lib/v86/bios/vgabios.bin https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/vgabios.bin
   ```
   Or download from: https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/vgabios.bin

### Alternative Sources

The BIOS files can also be obtained from:
- The v86 npm package: `node_modules/v86/bios/` (if available in your v86 version)
- The v86 GitHub releases: https://github.com/copy/v86/releases
- Building from source: https://github.com/copy/v86

## File Verification

After downloading, verify the files exist and have reasonable sizes:

```bash
ls -lh lib/v86/bios/
```

You should see:
- `seabios.bin` (~128KB)
- `vgabios.bin` (~32KB)

## Troubleshooting

If the emulator doesn't start:
1. Ensure both BIOS files are present in this directory
2. Check file permissions (should be readable)
3. Check browser console for errors
4. Try re-downloading the files

## License

These BIOS files are part of the v86 project:
- SeaBIOS: Licensed under LGPLv3
- VGA BIOS: Part of the Bochs project, licensed under LGPLv2+

For more information, see:
- https://github.com/copy/v86
- https://www.seabios.org/
- https://bochs.sourceforge.io/
