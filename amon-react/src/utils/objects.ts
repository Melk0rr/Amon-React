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

export {
  filterProperties
}