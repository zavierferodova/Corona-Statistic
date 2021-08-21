const fs = require('fs')

/**
 * Write string to file output
 * @param {String} name
 * @param {String} data
 */
function writeStringToFile (filePath, data) {
  const writableStream = fs.createWriteStream(filePath)
  writableStream.write(data)
}

module.exports = writeStringToFile
