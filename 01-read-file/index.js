// const fs = require('fs');
// const myFile = 'text.txt';

// function readFileAndDispl(filePath) {
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.log('File is bad', err)
//     }
//     console.log('File is ok',);
//     console.log(data)
//   })
// }
// readFileAndDispl(myFile)

const fs = require('fs');
const path = require('path');

// Создаем путь к файлу text.txt
const filePath = path.join(__dirname, 'text.txt');

// Создаем ReadStream для файла
const readStream = fs.createReadStream(filePath, 'utf8');

// Перенаправляем поток чтения в стандартный поток вывода
readStream.pipe(process.stdout);