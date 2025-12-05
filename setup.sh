#!/bin/bash

# SliTaz v86 Emulator Setup Script
# This script downloads required v86 library and BIOS files

set -e

echo "=================================="
echo "SliTaz v86 Emulator Setup"
echo "=================================="
echo ""

# Create directories
echo "Creating directory structure..."
mkdir -p lib/v86/bios

# Download v86 library (browser-compatible version from CDN)
echo "Downloading v86 library files..."

if [ ! -f lib/v86/libv86.js ] || [ "$(wc -c < lib/v86/libv86.js)" -lt 100000 ]; then
    echo "Downloading libv86.js from CDN..."
    curl -L -o lib/v86/libv86.js https://cdn.jsdelivr.net/npm/v86@10.7.0/build/libv86.js || \
    wget -O lib/v86/libv86.js https://cdn.jsdelivr.net/npm/v86@10.7.0/build/libv86.js || \
    echo "Failed to download libv86.js - please download manually from: https://cdn.jsdelivr.net/npm/v86@10.7.0/build/libv86.js"
else
    echo "libv86.js already exists"
fi

if [ ! -f lib/v86/v86.wasm ] || [ "$(wc -c < lib/v86/v86.wasm)" -lt 100000 ]; then
    echo "Downloading v86.wasm..."
    curl -L -o lib/v86/v86.wasm https://cdn.jsdelivr.net/npm/v86@10.7.0/build/v86.wasm || \
    wget -O lib/v86/v86.wasm https://cdn.jsdelivr.net/npm/v86@10.7.0/build/v86.wasm || \
    echo "Failed to download v86.wasm - please download manually from: https://cdn.jsdelivr.net/npm/v86@10.7.0/build/v86.wasm"
else
    echo "v86.wasm already exists"
fi

# Download BIOS files
echo "Downloading BIOS files..."

if [ ! -f lib/v86/bios/seabios.bin ]; then
    echo "Downloading SeaBIOS..."
    curl -L -o lib/v86/bios/seabios.bin https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/seabios.bin || \
    wget -O lib/v86/bios/seabios.bin https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/seabios.bin || \
    echo "Failed to download seabios.bin - please download manually from: https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/seabios.bin"
else
    echo "SeaBIOS already exists"
fi

if [ ! -f lib/v86/bios/vgabios.bin ]; then
    echo "Downloading VGA BIOS..."
    curl -L -o lib/v86/bios/vgabios.bin https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/vgabios.bin || \
    wget -O lib/v86/bios/vgabios.bin https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/vgabios.bin || \
    echo "Failed to download vgabios.bin - please download manually from: https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/vgabios.bin"
else
    echo "VGA BIOS already exists"
fi

echo ""
echo "Setup complete!"
echo ""
echo "Files should be in lib/v86/:"
ls -lh lib/v86/ 2>/dev/null || true
echo ""
echo "BIOS files should be in lib/v86/bios/:"
ls -lh lib/v86/bios/ 2>/dev/null || true
echo ""
echo "If downloads failed, please download them manually:"
echo "  - libv86.js: https://cdn.jsdelivr.net/npm/v86@10.7.0/build/libv86.js"
echo "  - v86.wasm: https://cdn.jsdelivr.net/npm/v86@10.7.0/build/v86.wasm"
echo "  - SeaBIOS: https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/seabios.bin"
echo "  - VGA BIOS: https://cdn.jsdelivr.net/npm/v86@10.7.0/bios/vgabios.bin"
echo ""
echo "To run the emulator, start a local web server:"
echo "  python3 -m http.server 8000"
echo "  or"
echo "  npx http-server -p 8000"
echo ""
echo "Then open http://localhost:8000 in your browser"
echo "=================================="
