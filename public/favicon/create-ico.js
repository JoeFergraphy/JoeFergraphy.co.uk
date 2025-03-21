import pngToIco from 'png-to-ico';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Array of PNG files to include in the ICO
const pngFiles = [
  path.join(__dirname, 'favicon-16x16.png'),
  path.join(__dirname, 'favicon-32x32.png'),
  path.join(__dirname, 'favicon-48x48.png')
];

async function createIco() {
  try {
    const buffer = await pngToIco(pngFiles);
    fs.writeFileSync(path.join(__dirname, 'favicon.ico'), buffer);
    console.log('favicon.ico created successfully!');
  } catch (error) {
    console.error('Error creating favicon.ico:', error);
  }
}

createIco(); 