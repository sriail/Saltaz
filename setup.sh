#!/bin/bash

# SliTaz v86 Emulator Setup Script
# This script downloads required v86 BIOS files

set -e

echo "=================================="
echo "SliTaz v86 Emulator Setup"
echo "=================================="
echo ""

# Create directories
echo "Creating directory structure..."
mkdir -p lib/v86/bios

# Download BIOS files
echo "Downloading BIOS files..."

# SeaBIOS
if [ ! -f lib/v86/bios/seabios.bin ]; then
    echo "Downloading SeaBIOS..."
    curl -L -o lib/v86/bios/seabios.bin https://cdn.jsdelivr.net/npm/v86@latest/bios/seabios.bin || \
    wget -O lib/v86/bios/seabios.bin https://cdn.jsdelivr.net/npm/v86@latest/bios/seabios.bin || \
    echo "Failed to download seabios.bin - please download manually from: https://cdn.jsdelivr.net/npm/v86@latest/bios/seabios.bin"
else
    echo "SeaBIOS already exists"
fi

# VGA BIOS
if [ ! -f lib/v86/bios/vgabios.bin ]; then
    echo "Downloading VGA BIOS..."
    curl -L -o lib/v86/bios/vgabios.bin https://cdn.jsdelivr.net/npm/v86@latest/bios/vgabios.bin || \
    wget -O lib/v86/bios/vgabios.bin https://cdn.jsdelivr.net/npm/v86@latest/bios/vgabios.bin || \
    echo "Failed to download vgabios.bin - please download manually from: https://cdn.jsdelivr.net/npm/v86@latest/bios/vgabios.bin"
else
    echo "VGA BIOS already exists"
fi

echo ""
echo "Setup complete!"
echo ""
echo "BIOS files should be in lib/v86/bios/"
echo "If downloads failed, please download them manually:"
echo "  - SeaBIOS: https://cdn.jsdelivr.net/npm/v86@latest/bios/seabios.bin"
echo "  - VGA BIOS: https://cdn.jsdelivr.net/npm/v86@latest/bios/vgabios.bin"
echo ""
echo "To run the emulator, start a local web server:"
echo "  python3 -m http.server 8000"
echo "  or"
echo "  npx http-server -p 8000"
echo ""
echo "Then open http://localhost:8000 in your browser"
echo "=================================="
