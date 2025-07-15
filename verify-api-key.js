// This script verifies that the API key is properly included in the build
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively search for files
function findFiles(dir, pattern) {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results.push(...findFiles(filePath, pattern));
    } else if (pattern.test(file)) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Find all JS files in the dist directory
const jsFiles = findFiles('./dist', /\.js$/);

// Check if any of the files contain the API key placeholder
let foundPlaceholder = false;
for (const file of jsFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('__OPENWEATHER_API_KEY__')) {
    console.error(`Found API key placeholder in ${file}`);
    foundPlaceholder = true;
  }
}

if (foundPlaceholder) {
  console.error('API key placeholder found in build files. The replacement did not work correctly.');
  process.exit(1);
} else {
  console.log('No API key placeholders found. The replacement worked correctly.');
}
