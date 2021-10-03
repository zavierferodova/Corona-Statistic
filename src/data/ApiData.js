import ApiEndpoint from '@src/constant/api-endpoint'

class CoronaData {
  /**
   * Fetch all data from api
   * @async
   * @returns {String}
   */
  async loadData () {
    try {
      const worldData = await this.getWorldData()
      const indonesiaData = await this.getIndonesiaData()
      setTimeout(() => {}, 100)
      const indonesiaProvinceData = await this.getIndonesiaProvinceData()
      const worldCountryData = await this.getWorldCountryData()

      this.worldData = worldData
      this.indonesiaData = indonesiaData
      this.indonesiaProvinceData = indonesiaProvinceData
      this.worldCountryData = worldCountryData

      return 'Sucess to get api data'
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

export default CoronaData
