import ApiBaseUrl from './api-base-url'

/**
 * List of api endpoint
 * @constant
 */
const ApiEndpoint = {
  world: `${ApiBaseUrl}/world`,
  worldCountry: `${ApiBaseUrl}/world/country`,
  indonesia: `${ApiBaseUrl}/indonesia`,
  indonesiaProvince: `${ApiBaseUrl}/indonesia/province`
}

export default ApiEndpoint
