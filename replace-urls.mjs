import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk('./src', function(filePath) {
  if (filePath.endsWith('api.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/const BACKEND_URL = "";/g, 'const BACKEND_URL = import.meta.env.VITE_API_URL || "";');
    
    if (content.includes('const PRODUCTS_BASE')) {
      content = content.replace(
        /const PRODUCTS_BASE\s*=\s*"http:\/\/localhost:4000\/products";/,
        'const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";\nconst PRODUCTS_BASE  = `${baseUrl}/products`;'
      );
      content = content.replace(
        /const REVIEWS_BASE\s*=\s*"http:\/\/localhost:4000\/reviews";/,
        'const REVIEWS_BASE   = `${baseUrl}/reviews`;'
      );
      content = content.replace(
        /const PROFILE_BASE\s*=\s*"http:\/\/localhost:4000\/profile";/,
        'const PROFILE_BASE   = `${baseUrl}/profile`;'
      );
    }
    
    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }

  if (filePath.endsWith('apiService.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(
      /const JSON_SERVER_BASE\s*=\s*'http:\/\/localhost:4000';/g,
      "const JSON_SERVER_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';"
    );

    if (original !== content) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
