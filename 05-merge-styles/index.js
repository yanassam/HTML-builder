const fs = require('fs/promises');
const path = require('path');

async function mergeStyles(srcDir, destDir) {
  try {
    // Создаю папку назначения (если нет)
    await fs.mkdir(destDir, { recursive: true });
    const destFile = path.join(destDir, 'bundle.css');

    // Создаю/очищаю файл bundle.css
    await fs.writeFile(destFile, '');

    // Чтение содержимого исходной папки
    const files = await fs.readdir(srcDir, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(srcDir, file.name);
        const content = await fs.readFile(filePath, 'utf8');
        await fs.appendFile(destFile, content + '\n');
      }
    }
  } catch (err) {
    console.error('Ошибка при объединении стилей:', err);
  }
}

const srcDir = path.join(__dirname, 'styles');
const destDir = path.join(__dirname, 'project-dist');

mergeStyles(srcDir, destDir);