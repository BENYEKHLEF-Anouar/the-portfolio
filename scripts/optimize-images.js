import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = './public';
const extensions = ['.png', '.jpg', '.jpeg'];

async function optimizeImages() {
  console.log('🚀 Starting one-time image optimization...');
  
  const files = fs.readdirSync(PUBLIC_DIR);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (extensions.includes(ext)) {
      const filePath = path.join(PUBLIC_DIR, file);
      const stats = fs.statSync(filePath);
      
      // Only optimize if larger than 500KB
      if (stats.size > 500 * 1024) {
        console.log(`📦 Optimizing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
        
        const buffer = fs.readFileSync(filePath);
        const tempPath = filePath + '.tmp';
        
        try {
          let pipeline = sharp(buffer);
          
          if (ext === '.png') {
            pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
          } else {
            pipeline = pipeline.jpeg({ quality: 80 });
          }
          
          await pipeline.toFile(tempPath);
          
          const newStats = fs.statSync(tempPath);
          if (newStats.size < stats.size) {
            fs.renameSync(tempPath, filePath);
            console.log(`✅ Success! New size: ${(newStats.size / 1024 / 1024).toFixed(2)} MB (${((1 - newStats.size / stats.size) * 100).toFixed(1)}% reduction)`);
          } else {
            fs.unlinkSync(tempPath);
            console.log(`⏭️ Skipped (already optimized)`);
          }
        } catch (err) {
          console.error(`❌ Error optimizing ${file}:`, err);
        }
      }
    }
  }
  
  console.log('✨ Optimization complete.');
}

optimizeImages();
