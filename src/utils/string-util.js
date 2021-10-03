/**
 * Generate random alphabet string
 * @generator
 * @param {Number} length
 * @yields {String} random string
 */
function randomString (length) {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

/**
   * Generate random number with string output
   * @generator
   * @param {Number} length
   * @yields {String} random string number
   */
function randomStringNumber (length) {
  const result = []
  const characters = '0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

/**
   * Generate random string with alpabet and number combination
   * @generator
   * @param {Number} length
   * @yields {String} random string alpha number
   */
function randomStringAlphaNumber (length) {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

/**
   * Foreach looping for string
   * @param {String} string
   * @param {Function} callback
   */
function forEachString (string, callback) {
  const loopString = (string, callback, index = 0) => {
    const character = string.charAt(index)
    if (!character) {
      return
    }
    callback(character)
    return loopString(string, callback, index + 1)
  }

  return loopString(string, callback)
}

/**
   * Reverse string function
   * @param {String} string
   * @return {String}
   */
function reverseString (string) {
  const splitString = string.split('')
  const reverseArray = splitString.reverse()
  const joinArray = reverseArray.join('')
  return joinArray
}

/**
   * Split string with array output
   * @param {String} string
   * @returns {Array} splited string
   */
function splitHalfString (string) {
  return [
    string.slice(0, Math.ceil(string.length / 2)),
    string.slice(Math.ceil(string.length / 2), string.length)
  ]
}

/**
   * Convert string to title case type
   * @param {String} text
   * @return {String}
   */
function convertTitleCase (text) {
  if (typeof text === 'string' && text.length > 0) {
    return text.split(' ').map((ele) => {
      return ele[0].toUpperCase() + ele.slice(1).toLowerCase()
    }).join(' ')
  }

  return ''
}

/**
   * Extracting number from the string
   * @param {String} string
   * @return {String} number of string
   */
function extractNumber (string) {
  return string.replace(/[^0-9]/g, '')
}

export {
  randomString,
  randomStringNumber,
  randomStringAlphaNumber,
  forEachString,
  reverseString,
  splitHalfString,
  convertTitleCase,
  extractNumber
}
