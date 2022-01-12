import ApiEndpoint from '@src/constant/api-endpoint'
import CoronaData from '@src/model/corona-data'

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
      .then(responses => responses.map(data => data.json()))
      .then(jsonPromises => Promise.all(jsonPromises))
      .then(cacheData => {
        const coronaData = new CoronaData({
          worldData: cacheData[0],
          worldCountryData: cacheData[1],
          indonesiaData: cacheData[2],
          indonesiaProvinceData: cacheData[3]
        })
        resolve(coronaData)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default ApiCacheData
