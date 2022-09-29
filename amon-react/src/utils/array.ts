import { BaseMap, BaseObject } from "./interfaces"

/**
 * Returns an array of objects based on a first array and a key filter
 * @param   {BaseObject[]} arr  : array of objects
 * @param   {string[]}     keys : properties of the first array to keep
 * @returns {BaseObject[]}      : array of objects containing only the given keys
 */
const mapByKey = (arr: BaseObject[], keys: string[]): BaseObject[] => 
  arr.map(obj => {
      let newObj: BaseObject = {}
      keys.forEach( k => newObj[k] = obj[k] )
      return newObj
  })

/**
 * Counts element based on an id in a given array
 * @param   {any[]}    arr : array to check
 * @param   {string}   id  : key to count
 * @returns {BaseMap}      : Map containing the counting results
 */
const countFrequencies = (arr: any[], id: string): BaseMap => arr.reduce((acc, obj) =>
  acc.set(obj[id], (acc.get(obj[id]) || 0) + 1), new Map())

/**
 * Returns a sorted map based on the given sorting function
 * @param   {BaseMap} map : Map to sort
 * @param   {Function} srt : sort function to apply
 * @returns {BaseMap}     : sorted Map
 */
const sortMap = (map: BaseMap, srt: Function): BaseMap =>
  new Map([...map.entries()].sort((a, b) => srt(a, b)))

/**
 * Checks if the given element passes at least some filter
 * @param   {any}        el  : element which is to pass the tests
 * @param   {Function[]} fil : filters to check
 * @returns {boolean}        : whether the element passed or not
 */
const checkSomeFilters = (el: any, fil: Function[]): boolean => fil.some(func => func(el))

/**
 * Checks if the given element passes all the filters
 * @param   {any}        el  : element which is to pass the tests
 * @param   {Function[]} fil : filters to check
 * @returns {boolean}        : whether the element passed or not
 */
const checkEveryFilters = (el: any, fil: Function[]): boolean => fil.every(func => func(el))

/**
 * Filters the elements in the given array for which at least one of the provided filters pass.
 * @param   {any[]}      arr : array to filter
 * @param   {Function[]} fil : array of filters
 * @param   {boolean}    neg : should the filters be true or not
 * @returns {any[]}          : resulting array
 */
const applySomeFilters = (arr: any[], fil: Function[], neg: boolean = false): any[] =>
  arr.filter(el => neg ? !fil.some(func => func(el)) : fil.some(func => func(el)))

/**
 * Filters the elements in the given array for which all the provided filters pass.
 * @param   {any[]}      arr : array to filter
 * @param   {Function[]} fil : array of filters
 * @param   {boolean}    neg : should the filters be true or not
 * @returns {any[]}          : resulting array
 */
const applyEveryFilters = (arr: any[], fil: Function[], neg: boolean = false): any[] =>
  arr.filter(el => neg ? !fil.every(func => func(el)) : fil.every(func => func(el)))

/**
 * Chunks given array into smaller ones
 * @param   {any[]}  arr  : array to chunk
 * @param   {number} size : size of the chunks
 * @returns {any[]}       : chunked array
 */
const chunkArray = (arr: any[], size: number): any[] => {
  if (size <= 0) return [arr]
  
  const res = []
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size))

  return res
}

/**
 * Flattens an array completely
 * @param   {any[]} arr : array to flat
 * @returns {any[]}     : flattened array
 */
const flatComplete = (arr: any[]): any[] =>
  arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? flatComplete(v) : v), [])

/**
 * Amongst the given values finds the one which is present in the array
 * @param   {any[]} arr : array to explore
 * @param   {any[]}   val : values to check
 * @returns {any}       : found value
 */
const findValueIn = (arr: any[], val: any[]): any => arr.find(e => val.some(v => e === v))

/**
 * Returns the intersection of two given arrays
 * @param   {Type[]} arr1 : first array 
 * @param   {Type[]} arr2 : second array
 * @returns {Type[]}      : intersection of the two given arrays
 */
const intersection = <Type>(arr1: Type[], arr2: Type[]): Type[] => arr1.filter(e => arr2.includes(e))

/**
 * Returns the difference between two given arrays
 * @param   {Type[]} arr1 : first array 
 * @param   {Type[]} arr2 : second array
 * @returns {Type[]}      : difference between the two given arrays
 */
const difference = <Type>(arr1: Type[], arr2: Type[]): Type[] => arr1.filter(e => !arr2.includes(e))

/**
 * Returns the symmetric difference between two given arrays
 * @param   {Type[]} arr1 : first array 
 * @param   {Type[]} arr2 : second array
 * @returns {Type[]}      : symmetric difference between the two given arrays
 */
const symDifference = <Type>(arr1: Type[], arr2: Type[]): Type[] =>
  arr1.filter(e => !arr2.includes(e)).concat(arr2.filter(e => !arr1.includes(e)))

/**
 * Filters the given array in order to remove duplicates based on the given keys to compare
 * @param   {BaseObject[]} arr  : array to filter
 * @param   {string[]}     keys : keys to compare
 * @returns {BaseObject[]}      : filtered array
 */
const unique = (arr: BaseObject[], keys: string[]): BaseObject[] =>
  arr.filter((el, i, arr) => arr.findIndex(v => (keys.every(k => v[k] === el[k]))) === i)

export {
  mapByKey,
  countFrequencies,
  sortMap,
  checkSomeFilters,
  checkEveryFilters,
  applySomeFilters,
  applyEveryFilters,
  chunkArray,
  flatComplete,
  findValueIn,
  intersection,
  difference,
  symDifference,
  unique
}