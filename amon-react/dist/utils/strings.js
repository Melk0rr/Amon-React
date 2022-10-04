/**
 * Transforms a regular string into a camelCase word
 * @param   {string} str : string to transform
 * @returns {string}     : camelCase word
 */
const camelize = (str) => str.split(" ").map(w => w.trim()).map(w => w[0].toUpperCase() + w.substring(1)).join("");
/**
 * Transforms a camelCase word into a regular string
 * @param   {string} cam : camelCase word to transform
 * @returns {string}     : regular string
 */
const unCamelize = (str) => (str.match(/[A-Za-z][a-z]*/g) || []).map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(" ");
/**
 * Capitalize the given string
 * @param   {string} str : string to capitalize
 * @returns {string}     : capitalized string
 */
const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
/**
 * Returns the substring between two given substring
 * @param   {string}  str : string to use
 * @param   {strin[]} sbs : substrings to use as delimiter
 * @returns {string}      : substring
 */
const sbstr = (str, sbs) => {
    const [first, second] = sbs;
    const i1 = str.indexOf(first), i2 = i1 + str.substring(i1).trim().indexOf(second);
    return str.substring(i1 + first.length, i2 + 1).trim();
};
/**
 * Pads a value with leading zeros until length is reached
 * @param   {any}    val : value to pad
 * @param   {number} len : length to reach
 * @returns {string}     : padded string
 */
const zeroPad = (val, len) => `${val}`.padStart(len, '0');
/**
 * Generates a unique random ID
 * @returns {string} : UEID
 */
const uuid = () => ("000" + (Math.random() * 46656 | 0).toString(36)).slice(-3) +
    ("000" + (Math.random() * 46656 | 0).toString(36)).slice(-3);
export { camelize, unCamelize, capitalize, sbstr, zeroPad, uuid };
