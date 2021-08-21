import ApiEndpoint from '../constant/api-endpoint'

/**
 * Get api cache data
 * @async
 * @return {Promise} cache data
 */
function ApiCacheData () {
  return new Promise((resolve, reject) => {
    const urlRequest = [
      caches.match(ApiEndpoint.world),
      caches.match(ApiEndpoint.worldCountry),
      caches.match(ApiEndpoint.indonesia),
      caches.match(ApiEndpoint.indonesiaProvince)
    ]

    Promise.all(urlRequest)
      .then(responses => responses.map(async data => await data.json()))
      .then(cacheData => resolve(cacheData))
      .catch(error => {
        reject(error)
      })
  })
}

export default ApiCacheData
