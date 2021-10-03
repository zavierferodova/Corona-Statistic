import ApiBaseUrl from './api-base-url'

/**
 * List of api endpoint
 * @constant
 */
const ApiEndpoint = {
  world: `${ApiBaseUrl.origin}/world`,
  worldCountry: `${ApiBaseUrl.origin}/world/country`,
  indonesia: `${ApiBaseUrl.origin}/indonesia`,
  indonesiaProvince: `${ApiBaseUrl.origin}/indonesia/province`
}

export default ApiEndpoint
