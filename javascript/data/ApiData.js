import ApiBaseUrl from '../constant/api-base-url.js'

class CoronaData {
  /**
   * Fetch all data from api
   * @async
   * @returns {String}
   */
  async loadData () {
    this.baseurl = ApiBaseUrl

    try {
      const worldData = await this.getWorldData()
      const indonesiaData = await this.getIndonesiaData()
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
    const positif = await fetch(`${this.baseurl}/positif`)
    const sembuh = await fetch(`${this.baseurl}/sembuh`)
    const meninggal = await fetch(`${this.baseurl}/meninggal`)

    return [await positif.json(), await sembuh.json(), await meninggal.json()]
  }

  /**
   * Fetch summary Indonesia Coronavirus data (positive, recovered, death)
   * @async
   * @returns {Object}
   */
  async getIndonesiaData () {
    const response = await fetch(`${this.baseurl}/indonesia`)
    return response.json()
  }

  /**
   * Fetch Indonesia province Coronavirus data
   * @async
   * @returns {Object}
   */
  async getIndonesiaProvinceData () {
    const response = await fetch(`${this.baseurl}/indonesia/provinsi`)
    return response.json()
  }

  /**
   * Fetch World Coronavirus data
   * @async
   * @returns {Object}
   */
  async getWorldCountryData () {
    const response = await fetch(`${this.baseurl}`)
    return response.json()
  }
}

export default CoronaData
