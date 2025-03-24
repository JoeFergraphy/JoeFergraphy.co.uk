import fs from 'fs';
import { createCanvas } from 'canvas';
import path from 'path';
import { fileURLToPath } from 'url';
import toIco from 'png-to-ico';

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

// Create directories if they don't exist
const outputDir = path.resolve(__dirname);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Render JF on a canvas - with thin font but larger letters
function renderJF(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, size, size);
  
  // Text styling - Finding the right balance between size and aesthetics
  const fontSize = Math.floor(size * 0.55); // More moderate size (was 0.45 originally, 0.75 in last version)
  ctx.font = `200 ${fontSize}px Helvetica, Arial, sans-serif`; // Slightly less thin font for better visibility
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // White JF text
  ctx.fillStyle = 'white';
  ctx.fillText('JF', size/2, size/2); // Centered text
  
  // No border - keeping the minimalist aesthetic
  
  return canvas;
}

// Generate and save all favicon sizes
async function generateFavicons() {
  console.log('Generating favicons...');
  
  const generatedFiles = [];
  
  // Generate each size
  for (const { size, name } of sizes) {
    const canvas = renderJF(size);
    const outputPath = path.join(outputDir, name);
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`Generated ${name} (${size}x${size})`);
    
    // Keep track of the 16x16, 32x32, and 48x48 files for ICO generation
    if (size === 16 || size === 32 || size === 48) {
      generatedFiles.push(outputPath);
    }
    
    // Copy apple-touch-icon to root public directory
    if (name === 'apple-touch-icon.png') {
      fs.writeFileSync(path.join(outputDir, '..', name), buffer);
    }
  }
  
  // Also generate favicon.ico with multiple sizes
  try {
    console.log('Creating favicon.ico...');
    const icoBuffer = await toIco(generatedFiles);
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(outputDir, '..', 'favicon.ico'), icoBuffer);
    console.log('favicon.ico created successfully!');
  } catch (err) {
    console.error('Error creating favicon.ico:', err);
  }
  
  console.log('All favicons generated successfully!');
}

// Run the generator
generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
}); 