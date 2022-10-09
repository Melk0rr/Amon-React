import type { BaseObject } from "./types"

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
 * @returns {boolean}       : true if the object contains all the specified keys
 */
const checkKeys = (obj: BaseObject, keys: string[]): boolean =>
  keys.every(k => Object.keys(obj).includes(k))

export {
  filterProperties,
  checkKeys,
}