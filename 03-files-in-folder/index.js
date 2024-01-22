const fs = require('fs/promises');
const path = require('path');

async function listFilesInFolder(folderPath) {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const stats = await fs.stat(filePath);
        const ext = path.extname(file.name).slice(1);
        const size = stats.size; // Размер в байтах
        console.log(`${path.basename(file.name, `.${ext}`)} - ${ext} - ${size} bytes`);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

const folderPath = path.join(__dirname, 'secret-folder');
listFilesInFolder(folderPath);