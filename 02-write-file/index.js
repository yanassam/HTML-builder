const fs = require('fs');
const readline = require('readline');
const path = require('path');

// путь к файлу
const filePath = path.join(__dirname, 'output.txt');

//поток записи
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

//интерфейс readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Вывод приветственного сообщения
console.log('Введите текст для записи в файл. Введите "exit" для выхода.');

rl.on('line', (input) => {
  if (input.trim() === 'exit') {
    rl.close();
  } else {
    writeStream.write(input + '\n');
  }
});

rl.on('close', () => {
  console.log('Запись в файл завершена. До свидания!');
  process.exit(0);
});

// Обработка события нажатия Ctrl+C
process.on('SIGINT', () => {
  rl.close();
});