#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts team images to WebP format with multiple responsive sizes
 * Run this script after adding new team member images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEAM_IMAGES_DIR = path.join(__dirname, '../public/team');
const SIZES = [150, 300, 600]; // Responsive image sizes
const QUALITY = 85; // WebP quality (0-100)

/**
 * Check if sharp is available
 */
async function checkDependencies() {
  try {
    await import('sharp');
    return true;
  } catch (error) {
    console.error('❌ Sharp is required for image optimization.');
    console.error('Install it with: npm install sharp --save-dev');
    return false;
  }
}

/**
 * Get all image files from the team directory
 */
function getImageFiles() {
  if (!fs.existsSync(TEAM_IMAGES_DIR)) {
    console.error(`❌ Team images directory not found: ${TEAM_IMAGES_DIR}`);
    return [];
  }

  return fs.readdirSync(TEAM_IMAGES_DIR)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext) && !file.startsWith('.');
    })
    .map(file => path.join(TEAM_IMAGES_DIR, file));
}

/**
 * Optimize a single image to multiple sizes and formats
 */
async function optimizeImage(inputPath) {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const outputDir = path.dirname(inputPath);
  
  console.log(`📸 Optimizing ${fileName}...`);
  
  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`   Original: ${metadata.width}x${metadata.height}, ${Math.round(metadata.size / 1024)}KB`);
    
    // Generate optimized versions for each size
    const optimizationPromises = SIZES.map(async (size) => {
      const webpOutputPath = path.join(outputDir, `${fileName}-${size}w.webp`);
      const jpegOutputPath = path.join(outputDir, `${fileName}-${size}w.jpg`);
      
      // Skip if files already exist and are newer than source
      if (fs.existsSync(webpOutputPath) && fs.existsSync(jpegOutputPath)) {
        const sourceStats = fs.statSync(inputPath);
        const webpStats = fs.statSync(webpOutputPath);
        
        if (webpStats.mtime > sourceStats.mtime) {
          console.log(`   Skipping ${size}w (already optimized)`);
          return;
        }
      }
      
      // Create sharp pipeline
      const pipeline = sharp(inputPath)
        .resize(size, size, {
          fit: 'cover',
          position: 'top'
        });
      
      // Generate WebP version
      await pipeline
        .clone()
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(webpOutputPath);
      
      // Generate optimized JPEG version (fallback)
      await pipeline
        .clone()
        .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
        .toFile(jpegOutputPath);
      
      // Get file sizes for reporting
      const webpSize = fs.statSync(webpOutputPath).size;
      const jpegSize = fs.statSync(jpegOutputPath).size;
      
      console.log(`   Generated ${size}w: WebP ${Math.round(webpSize / 1024)}KB, JPEG ${Math.round(jpegSize / 1024)}KB`);
    });
    
    await Promise.all(optimizationPromises);
    console.log(`✅ Completed ${fileName}`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${fileName}:`, error.message);
  }
}

/**
 * Clean up old optimized files that no longer have a source
 */
function cleanupOrphanedFiles(imageFiles) {
  console.log('\n🧹 Cleaning up orphaned optimized files...');
  
  const sourceBasenames = new Set(
    imageFiles.map(file => path.basename(file, path.extname(file)))
  );
  
  const allFiles = fs.readdirSync(TEAM_IMAGES_DIR);
  let cleanedCount = 0;
  
  allFiles.forEach(file => {
    const match = file.match(/^(.+)-(\d+)w\.(webp|jpg)$/);
    if (match) {
      const basename = match[1];
      if (!sourceBasenames.has(basename)) {
        const filePath = path.join(TEAM_IMAGES_DIR, file);
        fs.unlinkSync(filePath);
        console.log(`   Removed orphaned file: ${file}`);
        cleanedCount++;
      }
    }
  });
  
  if (cleanedCount === 0) {
    console.log('   No orphaned files found');
  } else {
    console.log(`   Cleaned up ${cleanedCount} orphaned files`);
  }
}

/**
 * Generate a summary report
 */
function generateReport(imageFiles) {
  console.log('\n📊 Optimization Report:');
  console.log(`   Source images: ${imageFiles.length}`);
  console.log(`   Sizes generated: ${SIZES.join(', ')}px`);
  console.log(`   Formats: WebP, JPEG`);
  console.log(`   Quality: ${QUALITY}%`);
  
  // Calculate total file sizes
  const allFiles = fs.readdirSync(TEAM_IMAGES_DIR);
  let originalSize = 0;
  let optimizedSize = 0;
  
  allFiles.forEach(file => {
    const filePath = path.join(TEAM_IMAGES_DIR, file);
    const fileSize = fs.statSync(filePath).size;
    
    if (file.match(/\.(jpg|jpeg|png)$/) && !file.match(/-\d+w\./)) {
      originalSize += fileSize;
    } else if (file.match(/-\d+w\.(webp|jpg)$/)) {
      optimizedSize += fileSize;
    }
  });
  
  console.log(`   Original total: ${Math.round(originalSize / 1024 / 1024 * 100) / 100}MB`);
  console.log(`   Optimized total: ${Math.round(optimizedSize / 1024 / 1024 * 100) / 100}MB`);
  
  if (originalSize > 0) {
    const savings = Math.round((1 - optimizedSize / originalSize) * 100);
    console.log(`   Space savings: ${savings}% (including multiple sizes)`);
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  // Check dependencies
  if (!(await checkDependencies())) {
    process.exit(1);
  }
  
  // Get image files
  const imageFiles = getImageFiles();
  
  if (imageFiles.length === 0) {
    console.log('❌ No image files found to optimize');
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to optimize\n`);
  
  // Optimize each image
  for (const imagePath of imageFiles) {
    await optimizeImage(imagePath);
  }
  
  // Cleanup orphaned files
  cleanupOrphanedFiles(imageFiles);
  
  // Generate report
  generateReport(imageFiles);
  
  console.log('\n✨ Image optimization completed!');
  console.log('\n💡 Next steps:');
  console.log('   1. Test the optimized images on your website');
  console.log('   2. Consider adding this script to your build process');
  console.log('   3. Monitor Core Web Vitals for performance improvements');
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { optimizeImage, getImageFiles }; 