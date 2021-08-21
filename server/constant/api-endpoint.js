/**
 * Api base url
 * @constant
 */
const ApiBaseUrl = 'http://api.kawalcorona.com'

/**
  * List api endpoints
  * @enum
  */
const ApiEndpoint = {
  worldCountry: `${ApiBaseUrl}`,
  worldPositive: `${ApiBaseUrl}/positif`,
  worldRecovered: `${ApiBaseUrl}/sembuh`,
  worldDeath: `${ApiBaseUrl}/meninggal`,
  indonesia: `${ApiBaseUrl}/indonesia`,
  indonesiaProvince: `${ApiBaseUrl}/indonesia/provinsi`
}

module.exports = ApiEndpoint
