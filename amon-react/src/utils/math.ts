/**
 * Number related types
 */
type PrependNextNum<A extends Array<unknown>> =
  A['length'] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never

type EnumerateInternal<A extends Array<unknown>, N extends number> =
  { 0: A, 1: EnumerateInternal<PrependNextNum<A>, N> }[N extends A['length'] ? 0 : 1]

type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never
type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>

type BaseUnit = Range<1, 10>
type Unit = 0|BaseUnit

/**
 * Returns the round version of a given number based on a round value
 * @param   {number} n : number to round
 * @param   {number} p : round precision
 * @returns {number}   : rounded number
 */
const round = (n: number, p: number): number => Math.round(n * p) / p

/**
 * Returns the percentage based on a given numerator and total
 * @param   {number} n : numerator
 * @param   {number} t : total
 * @returns {number}   : percentage
 */
const percent = (n: number, t: number): number => n / t * 100 || 0

/**
 * Apply a given percentage on a given total
 * @param   {number} t : total on which apply the percentage
 * @param   {number} p : percentage to apply
 * @returns {number}   : number
 */
const appPercent = (t: number, p: number): number => t * p * 0.01

/**
 * Returns the circumference of a circle based on its radius
 * @param   {number} r : radius
 * @returns {number}   : circumference
 */
const circ = (r: number): number => 2 * Math.PI * r

/**
 * Returns full circle rotation based on a percentage
 * @param   {number} per : percentage
 * @param   {number} max : max rotation (e.g. 360, 180, etc.)
 * @returns {number}     : rotation
 */
const perRotation = (per: number, max: number = 360 | 180): number => per * 0.01 * max

/**
 * Returns a circle stroke offset based on its perimeter and a percentage
 * @param   {number} peri : circle perimeter
 * @param   {number} perc : percent to use
 * @returns {number}      : stroke offset
 */
const strokeOffset = (peri: number, perc: number): number => peri - peri * perc * 0.01

/**
 * Returns the radians correspunding to the given angle
 * @param   {number} a : angle 
 * @returns {number}   : radians
 */
const angRad = (a: number): number => a * (Math.PI / 180)

/**
 * Returns cartesian coordinates based on a radius, an angle and offset coordinates
 * Cartesian coordinates can be used to place element around a circle
 * @param   {number}   r      : circle radius
 * @param   {number}   a      : angle
 * @param   {number[]} offset : offset coordinates
 * @returns {number[]}        : coordinates
 */
const cartesXY = (r: number, a: number, offset: [number, number]): [number, number] => {
  const angleRad = angRad(a)
  return [r * Math.cos(angleRad) + offset[0], r * Math.sin(angleRad) + offset[1]]
}

/**
 * Keeps a given value inside the given interval based on a min and max value.
 * @param   {number}   n : number to limit
 * @param   {number[]} i : interval
 * @returns {number}     : limited value
 */
const limit = (n: number, [min, max]: [number, number]): number => {
  const nmax = (n < min) ? min : n
  return (nmax > max) ? max : nmax
}

/**
 * Checks whether the given number is inside the given interval
 * @param   {number}   n   : number to check
 * @param   {number[]} i   : interval
 * @param   {boolean}  inc : should the interval be inclusive or not
 * @returns {boolean}      : whether the number is inside the interval or not
 */
const between = (n: number, [min, max]: [number, number], inc: boolean = false): boolean =>
  inc ? (n >= min && n <= max) : (n > min && n < max)

/**
 * Generates a random number between min and max value
 * @param   {number} min : min value
 * @param   {number} max : max value
 * @returns {number}     : random number
 */
const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)

/**
 * Returns the angle between x axis and a point based on its coordinates
 * @param   {number[]} origin : origin coordinates
 * @param   {number[]} target : target coordinates
 * @returns {number}          : resulting theta angle
 */
const arctangent = ([ox, oy]: [number, number], [tx, ty]: [number, number]): number => {
  const dx = ox - tx,
        dy = oy - ty

  let theta = Math.atan2(-dy, -dx)
  theta *= 180 / Math.PI

  if (theta < 0)
    theta += 360

  return theta
}

/**
 * Drifts aside cartesian coords based on base coords and vBox size in order to prevent 
 * @param   {number[]} coords : base coords
 * @param   {number}   vbSize : vBox size
 * @returns {number[]}        : drifted coords
 */
const driftCoords = ([x, y]: [number, number], vbSize: number): [number, number] => {
  const
    middle: number = vbSize / 2,
    xMin: number = vbSize * .15,
    xMax: number = vbSize * .85,
    vShift: number = vbSize * .08
  const xAroundMiddle: boolean = between(x, [xMin, xMax])

  let drftX: number;
  if (xAroundMiddle) {
    if (x < middle)
      drftX = x - (xMin * .65)
    else
      drftX = x + (xMax * .65)

  } else drftX = x

  return [drftX, limit(y, [vShift, vbSize - vShift])]
}

export {
  round,
  randomInt,
  percent,
  appPercent,
  circ,
  perRotation,
  strokeOffset,
  angRad,
  cartesXY,
  limit,
  between,
  arctangent,
  driftCoords
}

export type {
  BaseUnit,
  Unit,
  Range,
}