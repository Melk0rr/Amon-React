import { BaseObject } from "./interfaces";

/**
 * Filter properties of a given object based on a list of keys to keep
 * @param {BaseObject}   base : object to filter
 * @param {string[]}     keys : list of keys to keep
 * @returns {BaseObject}      : final object to return
 */
const filterProperties = (base: BaseObject, keys: string[]): BaseObject => 
  Object.keys(base)
  .filter((key) => keys.includes(key))
  .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: base[key]
      });
  }, {})

/**
 * Checks if the given object contains all specified keys
 * @param {BaseObject} obj  : object to check
 * @param {string[]}   keys : keys to find in the object
 */
const checkKeys = (obj: BaseObject, keys: string[]): void => {
  for (const key of keys)
    if (!(key in obj)) throw new Error("The given object does not contain the key " + key + " !")
}

export {
  filterProperties,
  checkKeys,
}