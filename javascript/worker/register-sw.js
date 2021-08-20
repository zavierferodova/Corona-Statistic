import { openDB } from 'idb'
import CryptoJS from 'crypto-js'

/**
 * Exported function to dispatch register service worker
 * @function
 */
function registerServiceWorker () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', performRegister)
  } else {
    console.log("This browser doesn't support service worker")
  }
}

/**
 * Perform register service worker to browser
 * @async
 */
async function performRegister () {
  try {
    const serviceWorkerURL = '/service-worker.js'
    const serviceWorkerIntegrity = new ServiceWorkerIntegrity()
    const isIntegritySame = await serviceWorkerIntegrity.checkIntegrity(serviceWorkerURL)

    if (!isIntegritySame) { // If integrity not same service worker was updated
      alert('New update is available. Click OK to apply !')
      await serviceWorkerIntegrity.update(serviceWorkerURL)
      window.location.reload()
    } else {
      await navigator.serviceWorker.register(serviceWorkerURL)
      await serviceWorkerIntegrity.update(serviceWorkerURL)
      console.log('Service Worker sucessfuly registered')
    }
  } catch (error) {
    console.log('Failed to register service worker')
  }
}

/**
 * Class for save service worker registration hash in Indexed DB
 * This class also used for check integrity between new and old service worker
 * @class
 */
class ServiceWorkerIntegrity {
  /**
   * Set attributes value
   * @constructor
   */
  constructor () {
    this._config = {
      DB_NAME: 'service-worker-idb',
      DB_VERSION: 1,
      OBJECT_STORE_NAME: 'service-worker'
    }
    this._itemData = {
      id: 'app-sw',
      hash: null
    }
  }

  /**
   * Open service worker indexed db connection
   * @return {Promise}
   */
  open () {
    const { DB_NAME, DB_VERSION, OBJECT_STORE_NAME } = this._config
    return openDB(DB_NAME, DB_VERSION, {
      upgrade (database) {
        database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' })
      }
    })
  }

  /**
   * Put or update value on service-worker idb
   * @param {String} swUrl service-worker url
   */
  async update (swUrl) {
    try {
      const { OBJECT_STORE_NAME } = this._config
      const data = Object.assign({}, this._itemData)
      const connection = await this.open()
      const blobResponse = await fetchBlob(swUrl)
      data.hash = await calculateBlobMD5(blobResponse)
      return connection.put(OBJECT_STORE_NAME, data)
    } catch (error) {}
  }

  /**
   * Get service worker md5 hash from indexed db
   * @return {String} old registered service worker hash
   */
  async getRegistrationHash () {
    const { OBJECT_STORE_NAME } = this._config
    const { id } = this._itemData
    const connection = await this.open()
    const data = await connection.get(OBJECT_STORE_NAME, id)
    if (data) {
      return String(data.hash)
    }

    return ''
  }

  /**
   * Check old and new service worker integrity
   * @param {String} swUrl service-worker url
   * @return {Boolean} isSameIntegrity
   */
  async checkIntegrity (swUrl) {
    const blobResponse = await fetchBlob(swUrl)
    const newServiceWorkerMD5 = await calculateBlobMD5(blobResponse)
    const oldServiceWorkerMD5 = await this.getRegistrationHash()
    return (newServiceWorkerMD5 === oldServiceWorkerMD5)
  }
}

/**
 * Fetching blob file
 * @param {String} url
 * @param {RequestInit} options
 * @return {Blob}
 */
async function fetchBlob (url, options) {
  const response = await fetch(url, options)
  const blobResponse = await response.blob()
  return blobResponse
}

/**
 * Calculate blob md5
 * @async
 * @param {Blob} blob
 * @return {Promise}
 */
function calculateBlobMD5 (blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(blob)
    fileReader.onloadend = () => {
      const wordArray = CryptoJS.lib.WordArray.create(fileReader.result)
      const hash = CryptoJS.MD5(wordArray).toString().toUpperCase()
      resolve(hash)
    }
  })
}

export default registerServiceWorker
