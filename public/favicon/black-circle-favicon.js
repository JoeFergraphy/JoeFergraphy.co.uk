import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import pngToIco from 'png-to-ico';
import { fileURLToPath } from 'url';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Favicon sizes needed
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 180, name: 'apple-touch-icon-180x180.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'JF-512x512.png' }
];

// Ensure output directory exists
const outputDir = path.resolve(path.join(__dirname, '..', '..', 'public', 'favicon'));
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to generate a black circle favicon
function generateBlackCircleFavicon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, size, size);
  
  // Draw black circle
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  
  return canvas.toBuffer('image/png');
}

// Generate and save all favicon sizes
async function generateFavicons() {
  console.log('Generating black circle favicons...');
  
  const pngPaths = [];
  
  for (const { size, name } of sizes) {
    const buffer = generateBlackCircleFavicon(size);
    
    const outputPath = path.join(outputDir, name);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Generated ${name}`);
    
    // Save paths for ICO generation
    if (size <= 48) {
      pngPaths.push(outputPath);
    }
  }
  
  // Generate favicon.ico (multi-size icon)
  try {
    console.log('Creating favicon.ico...');
    const icoBuffer = await pngToIco(pngPaths);
    
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(outputDir, '..', 'favicon.ico'), icoBuffer);
    console.log('favicon.ico created successfully!');
  } catch (err) {
    console.error('Error creating favicon.ico:', err);
  }
  
  // Generate apple-touch-icon.png (duplicate of 180x180)
  const appleTouchIconPath = path.join(outputDir, 'apple-touch-icon.png');
  fs.copyFileSync(path.join(outputDir, 'apple-touch-icon-180x180.png'), appleTouchIconPath);
  
  console.log('All black circle favicons generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating black circle favicons:', err);
}); 