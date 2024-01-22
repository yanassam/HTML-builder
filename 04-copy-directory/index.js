const fs = require('fs/promises');
const path = require('path');

async function copyDir(src, dest) {
  try {
    // Создаю папку назначения (если не существует)
    await fs.mkdir(dest, { recursive: true });

    // Чтение содержимого исходной папки
    const entries = await fs.readdir(src, { withFileTypes: true });

    // Копирую каждый файла из исходной папки
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        // Если это директория, рекурсивно копируем ее содержимое
        await copyDir(srcPath, destPath);
      } else {
        // Если это файл, копируем его
        await fs.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error('Ошибка при копировании:', err);
  }
}

const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

copyDir(srcPath, destPath);
