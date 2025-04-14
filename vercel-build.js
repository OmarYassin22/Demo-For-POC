// vercel-build.js
const fs = require('fs-extra');
const path = require('path');

async function copyPublicToStatic() {
  try {
    // Ensure the dist directory exists
    await fs.ensureDir('dist');
    
    // Copy all contents from public to dist root for Vercel deployment
    await fs.copy('public', 'dist', {
      overwrite: true
    });
    
    console.log('Successfully copied public assets to dist for Vercel deployment');
  } catch (err) {
    console.error('Error copying public assets:', err);
    process.exit(1);
  }
}

// Execute the copy operation
copyPublicToStatic();