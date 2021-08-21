const express = require('express')
const path = require('path')
const cors = require('cors')
const routes = require('./routes/routes')

// Call main function to initialize application
main()

/**
 * Initializing application
 */
function main () {
  const app = express()
  const port = process.env.PORT || 3000
  app.use(cors())
  app.use(express.static(path.join(__dirname, 'build')))
  app.listen(port, () => startApplication(app, port))
}

/**
 * Starting aplication
 * @param {Express} app
 * @param {String|Number} port
 */
function startApplication (app, port) {
  routes(app)
  console.log(`App server listening on http://localhost:${port}`)
}
