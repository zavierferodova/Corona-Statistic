import ApiBaseUrl from '../constant/api-base-url.js'

/**
 * Get api cache data
 * @async
 * @return {Promise} cache data
 */
function ApiCacheData () {
  return new Promise((resolve, reject) => {
    const baseurl = ApiBaseUrl
    const urlReq = [
      caches.match(`${baseurl}/positif/`),
      caches.match(`${baseurl}/sembuh/`),
      caches.match(`${baseurl}/meninggal/`),
      caches.match(`${baseurl}/indonesia/`),
      caches.match(`${baseurl}/indonesia/provinsi/`),
      caches.match(`${baseurl}`)
    ]

    Promise.all(urlReq).then(response => {
      const jsonProm = [
        response[0].json(),
        response[1].json(),
        response[2].json(),
        response[3].json(),
        response[4].json(),
        response[5].json()
      ]

      return jsonProm
    }).then(jsonProm => {
      Promise.all(jsonProm).then(jsonArr => {
        resolve(jsonArr)
      })
    }).catch(error => {
      reject(error)
    })
  })
}

export default ApiCacheData
