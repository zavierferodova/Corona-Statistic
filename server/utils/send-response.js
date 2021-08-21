/**
 * Send json data to client
 * @param {Express.Response} res
 * @param {JSON} data
 */
function sendJSONFile (res, filePath) {
  res.setHeader('Content-Type', 'application/json')
  res.sendFile(filePath)
}

module.exports = { sendJSONFile }
