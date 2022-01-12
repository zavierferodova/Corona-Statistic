const path = require('path')
const axios = require('axios')
const clientPath = require('../constant/client-path')
const ApiEndpoint = require('../constant/api-endpoint')
const writeStringToFile = require('../utils/write-string-to-file')
const { sendJSONFile } = require('../utils/send-response')

/**
 * Application list route
 * @param {Express} app
 */
function routes (app) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'))
  })

  apiRoutes(app)
}

/**
 * API server routes
 * @param {Express} app
 */
function apiRoutes (app) {
  const dataDirectory = path.join(__dirname, '/../data')

  app.get('/world', async (req, res) => {
    const fileName = 'world.json'
    try {
      const responsePositive = await axios.get(ApiEndpoint.worldPositive)
      const responseRecovered = await axios.get(ApiEndpoint.worldRecovered)
      const responseDeath = await axios.get(ApiEndpoint.worldDeath)

      const responses = [responsePositive.data, responseRecovered.data, responseDeath.data]
      const isResponsesJSON = responses.every(response => (response instanceof Object))

      if (isResponsesJSON) {
        writeStringToFile(path.join(dataDirectory, fileName), JSON.stringify(responses))
        res.json(responses)
        return
      }

      throw new Error('Response is not JSON !')
    } catch (error) {
      sendJSONFile(res, path.join(dataDirectory, fileName))
    }
  })

  app.get('/world/country', async (req, res) => {
    const fileName = 'world-country.json'
    try {
      const response = await axios.get(ApiEndpoint.worldCountry)
      if (response.data instanceof Object || response.data instanceof Array) {
        writeStringToFile(path.join(dataDirectory, fileName), JSON.stringify(response.data))
        res.json(response.data)
        return
      }

      throw new Error('Response is not JSON !')
    } catch (error) {
      sendJSONFile(res, path.join(dataDirectory, fileName))
    }
  })

  app.get('/indonesia', async (req, res) => {
    const fileName = 'indonesia.json'
    try {
      const response = await axios.get(ApiEndpoint.indonesia)
      if (response.data instanceof Object || response.data instanceof Array) {
        writeStringToFile(path.join(dataDirectory, fileName), JSON.stringify(response.data))
        res.json(response.data)
        return
      }

      throw new Error('Response is not JSON !')
    } catch (error) {
      sendJSONFile(res, path.join(dataDirectory, fileName))
    }
  })

  app.get('/indonesia/province', async (req, res) => {
    const fileName = 'indonesia-province.json'
    try {
      const response = await axios.get(ApiEndpoint.indonesiaProvince)
      if (response.data instanceof Object || response.data instanceof Array) {
        writeStringToFile(path.join(dataDirectory, fileName), JSON.stringify(response.data))
        res.json(response.data)
        return
      }

      throw new Error('Response is not JSON !')
    } catch (error) {
      sendJSONFile(res, path.join(dataDirectory, fileName))
    }
  })
}

module.exports = routes
