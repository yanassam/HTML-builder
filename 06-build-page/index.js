const fs = require('fs/promises');
const path = require('path');

async function buildPage() {
  const projectDist = path.join(__dirname, 'project-dist');
  const templatePath = path.join(__dirname, 'template.html');
  const componentsPath = path.join(__dirname, 'components');
  const stylesPath = path.join(__dirname, 'styles');
  const assetsPath = path.join(__dirname, 'assets');
  const assetsDistPath = path.join(projectDist, 'assets');

  await fs.mkdir(projectDist, { recursive: true });
  await createHtml(templatePath, componentsPath, projectDist);
  await mergeStyles(stylesPath, projectDist);
  await copyDir(assetsPath, assetsDistPath);
}

async function createHtml(templatePath, componentsPath, projectDist) {
  let template = await fs.readFile(templatePath, 'utf-8');
  const componentFiles = await fs.readdir(componentsPath);

  for (const file of componentFiles) {
    const filePath = path.join(componentsPath, file);
    if (path.extname(file) === '.html') {
      const componentName = path.basename(file, '.html');
      const componentContent = await fs.readFile(filePath, 'utf-8');
      template = template.replace(new RegExp(`{{${componentName}}}`, 'g'), componentContent);
    }
  }

  await fs.writeFile(path.join(projectDist, 'index.html'), template);
}

async function mergeStyles(stylesPath, projectDist) {
  const files = await fs.readdir(stylesPath, { withFileTypes: true });
  const output = path.join(projectDist, 'style.css');
  await fs.writeFile(output, '');

  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const content = await fs.readFile(path.join(stylesPath, file.name), 'utf-8');
      await fs.appendFile(output, content + '\n');
    }
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

buildPage().catch(err => console.error(err));