const fs = require('fs');

const readStream = fs.createReadStream('module/readme4.txt');
const writeStream = fs.createWriteStream('module/writeme3.txt');
readStream.pipe(writeStream);