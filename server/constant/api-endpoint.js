/**
 * Api base url
 * @constant
 */
const apiBaseUrl = 'http://api.kawalcorona.com'

/**
  * List api endpoints
  * @enum
  */
const ApiEndpoint = {
  worldCountry: `${apiBaseUrl}`,
  worldPositive: `${apiBaseUrl}/positif`,
  worldRecovered: `${apiBaseUrl}/sembuh`,
  worldDeath: `${apiBaseUrl}/meninggal`,
  indonesia: `${apiBaseUrl}/indonesia`,
  indonesiaProvince: `${apiBaseUrl}/indonesia/provinsi`
}

module.exports = ApiEndpoint
