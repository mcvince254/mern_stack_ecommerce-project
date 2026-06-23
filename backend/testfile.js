import crypto from 'crypto'

const test = crypto.createHash('sha256').update('bbdb67c5d034896fc33deacea3c44728e0fddf6f').digest('hex');
console.log(test)