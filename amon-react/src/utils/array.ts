interface BasicMap {
  [key: string | number]: any
}

/**
 * Counts element based on an id in a given array
 * @param   {any[]}    arr : array to check
 * @param   {string}   id  : key to count
 * @returns {BasicMap}     : Map containing the counting results
 */
const countFrequencies = (arr: any[], id: string): BasicMap => arr.reduce((acc, obj) =>
  acc.set(obj[id], (acc.get(obj[id]) || 0) + 1), new Map())

/**
 * Returns a sorted map based on the given sorting function
 * @param   {BasicMap} map : Map to sort
 * @param   {Function} srt : sort function to apply
 * @returns {BasicMap}     : sorted Map
 */
const sortMap = (map: BasicMap, srt: Function): BasicMap =>
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

export {
  countFrequencies,
  sortMap,
  checkSomeFilters,
  checkEveryFilters,
}