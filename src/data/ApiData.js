import ApiEndpoint from '@src/constant/api-endpoint'
import CoronaData from '@src/model/corona-data'

function resolveTimeout (callback, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      callback()
        .then(data => resolve(data))
        .catch(error => reject(error))
    }, ms)
  })
}

class ApiData {
  /**
   * Fetch all data from api
   * @async
   * @returns {String}
   */
  async loadData () {
    try {
      const worldData = await resolveTimeout(this.getWorldData, 50)
      const indonesiaData = await this.getIndonesiaData()
      const indonesiaProvinceData = await resolveTimeout(this.getIndonesiaProvinceData, 100)
      const worldCountryData = await this.getWorldCountryData()

      const coronaData = new CoronaData({
        worldData,
        indonesiaData,
        indonesiaProvinceData,
        worldCountryData
      })

      return coronaData
    } catch (error) {
      throw new Error('Failed to get api data')
    }
  }

  /**
   * Fetch summary World Coronavirus data (positive, recovered, death)
   * @async
   * @returns {Array}
   */
  async getWorldData () {
    const response = await fetch(ApiEndpoint.world)
    return response.json()
  }

  /**
   * Fetch World Coronavirus data
   * @async
   * @returns {Object}
   */
  async getWorldCountryData () {
    const response = await fetch(ApiEndpoint.worldCountry)
    return response.json()
  }

  /**
   * Fetch summary Indonesia Coronavirus data (positive, recovered, death)
   * @async
   * @returns {Object}
   */
  async getIndonesiaData () {
    const response = await fetch(ApiEndpoint.indonesia)
    return response.json()
  }

  /**
   * Fetch Indonesia province Coronavirus data
   * @async
   * @returns {Object}
   */
  async getIndonesiaProvinceData () {
    const response = await fetch(ApiEndpoint.indonesiaProvince)
    return response.json()
  }
}

export default ApiData
