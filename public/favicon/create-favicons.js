const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');
const toIco = require('png-to-ico');

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
const outputDir = path.join(process.cwd(), 'public', 'favicon');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Render bolder JF on a canvas
function renderJF(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, size, size);
  
  // Text styling - BOLDER for better visibility at small sizes
  const fontSize = Math.floor(size * 0.6); // Larger text relative to icon size
  ctx.font = `bold ${fontSize}px Helvetica, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // White JF text
  ctx.fillStyle = 'white';
  ctx.fillText('JF', size/2, size/2 + fontSize * 0.05); // Slight vertical adjustment
  
  // Add a subtle border for better definition on larger sizes
  if (size > 24) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = Math.max(1, Math.floor(size * 0.03));
    ctx.strokeRect(2, 2, size - 4, size - 4);
  }
  
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
    
    // Copy apple-touch-icon to root
    if (name === 'apple-touch-icon.png') {
      fs.writeFileSync(path.join(process.cwd(), 'public', name), buffer);
    }
  }
  
  // Also generate favicon.ico with multiple sizes
  try {
    console.log('Creating favicon.ico...');
    const icoBuffer = await toIco(generatedFiles);
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.ico'), icoBuffer);
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