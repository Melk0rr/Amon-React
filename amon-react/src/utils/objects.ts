import { BaseObject } from "./interfaces";

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