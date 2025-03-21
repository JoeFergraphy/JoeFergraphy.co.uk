import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Favicon sizes needed
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 120, name: 'apple-touch-icon.png' },
  { size: 144, name: 'mstile-144x144.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 180, name: 'apple-touch-icon-180x180.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'JF-512x512.png' }
];

// Render JF on a canvas
function renderJF(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, size, size);
  
  // White JF text
  ctx.fillStyle = 'white';
  
  // Font size proportional to canvas size
  const fontSize = Math.floor(size * 0.45);
  // Use Helvetica Thin with lighter weight
  ctx.font = `lighter ${fontSize}px Helvetica, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Draw the JF text
  ctx.fillText('JF', size/2, size/2);
  
  return canvas;
}

// Make sure the directory exists
const outputDir = path.resolve(__dirname);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate and save all sizes
sizes.forEach(({ size, name }) => {
  const canvas = renderJF(size);
  const outputPath = path.join(outputDir, name);
  
  const out = fs.createWriteStream(outputPath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  
  out.on('finish', () => {
    console.log(`Generated ${name} (${size}x${size})`);
  });
});

console.log('Started generating favicon images...'); 