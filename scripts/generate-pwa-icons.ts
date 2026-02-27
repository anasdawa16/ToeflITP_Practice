/**
 * PWA Icon Generator Script
 *
 * Run this script to generate the required PWA icon sizes from a base SVG.
 * Requires: npm install --save-dev sharp (server-side only)
 *
 * Usage: npx tsx scripts/generate-pwa-icons.ts
 */

// This is a placeholder — in production, use a tool like:
// 1. https://realfavicongenerator.net/ → upload ToeflMaster logo → download icons
// 2. Or run: npx pwa-asset-generator ./public/logo.png ./public/icons
//
// Required sizes: 72, 96, 128, 144, 152, 192, 384, 512
//
// Paste the generated icons into public/icons/

export const REQUIRED_ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

export const ICON_GENERATION_COMMAND =
  "npx pwa-asset-generator ./public/logo.png ./public/icons --background '#0a0f1e' --padding '20%' --icon-only";
