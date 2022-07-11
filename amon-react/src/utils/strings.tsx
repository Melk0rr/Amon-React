/**
 * Transforms a regular string into a camelCase word
 * @param   {string} str : string to transform
 * @returns {string}     : camelCase word
 */
const camelize = (str: string) : string =>
  str.split(" ").map(w => w.trim()).map(w => w[0].toUpperCase() + w.substring(1)).join("")

/**
 * Transforms a camelCase word into a regular string
 * @param   {string} cam : camelCase word to transform
 * @returns {string}     : regular string
 */
const unCamelize = (str: string) : string =>
  (str.match(/[A-Za-z][a-z]*/g) || []).map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(" ")

/**
 * Capitalize the given string
 * @param   {string} str : string to capitalize
 * @returns {string}     : capitalized string
 */
const capitalize = (str: string): string => str[0].toUpperCase() + str.slice(1)

/**
 * Returns the substring between the two given substring
 * @param   {string}  str : string to use
 * @param   {strin[]} sbs : substrings to use as delimiter
 * @returns {string}      : substring
 */
const sbstr = (str: string, sbs: [string, string]) : string => {
  const [first, second] = sbs
  const i1 = str.indexOf(first),
        i2 = i1 + str.substring(i1).trim().indexOf(second)

  return str.substring(i1 + first.length, i2 + 1).trim()
}

export {
  camelize,
  unCamelize,
  capitalize,
  sbstr,
}