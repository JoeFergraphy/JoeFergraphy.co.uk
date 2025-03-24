const fs = require('fs');
const { PNG } = require('pngjs');
const toIco = require('png-to-ico');

// This script creates a multi-size favicon.ico file from PNG files
// It takes the 16x16, 32x32, and 48x48 PNG files and combines them

async function createFaviconIco() {
  try {
    console.log('Creating favicon.ico...');
    
    // These are the PNG files we will use for the ICO
    const pngFiles = [
      'public/favicon/favicon-16x16.png',
      'public/favicon/favicon-32x32.png',
      'public/favicon/favicon-48x48.png'
    ];
    
    // Check if all PNG files exist
    pngFiles.forEach(file => {
      if (!fs.existsSync(file)) {
        throw new Error(`Required file ${file} does not exist. Generate it first.`);
      }
    });
    
    // Create ICO file from PNGs
    const buf = await toIco(pngFiles);
    
    // Save the ICO file
    fs.writeFileSync('public/favicon.ico', buf);
    fs.writeFileSync('public/favicon/favicon.ico', buf);
    
    console.log('favicon.ico created successfully!');
  } catch (err) {
    console.error('Error creating favicon.ico:', err);
  }
}

createFaviconIco(); 