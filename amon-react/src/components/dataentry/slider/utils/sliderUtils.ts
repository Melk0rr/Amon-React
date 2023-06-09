import { percent } from "utils/math"

/**
 * Returns a percentage based on a given position, and a minimum and maximum position
 * @param {number} value : position to convert into a percentage
 * @param {number} min : minimum position
 * @param {number} max : maximum position
 * @returns {number} : percentage base on the given position
 */
const posToPercentage = (value: number, min: number, max: number): number =>
  percent((value - min), (max - min))

export {
  posToPercentage
}