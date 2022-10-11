// Script imports
import * as Maths from "./math"

type RGBAObj = {
  r : number,
  g : number,
  b : number,
  a?: number
}

/**
 * Color class
 */
class Color {
  static #hexCheck = /^#([0-9A-F]{3}){1,2}$/i
  #r = 0
  #g = 0
  #b = 0
  #a = 1
  #hex

  /**
   * Color contructor
   * @param {RGBAObj|string} color : color initial value
   */
  constructor (color: RGBAObj|string) {    
    if (typeof color === "string") {

      if (!Color.#checkHexString(color))
        throw new Error(`${color} is not a valid hex color string !`)
      
      this.#hex = color
      this.#setRgbFromHex(color)

    } else if (typeof color === "object") {
      const { r, g, b, a = 1 } = color
      this.#r = r
      this.#g = g
      this.#b = b
      this.#a = a
      this.#hex = Color.rgb2Hex(r, g, b, a)
      
    } else {
      this.#hex = Color.randomColor()
      this.#setRgbFromHex()
    }
  }

  /**
   * Returns color hex value
   * @returns {string} : hex value
   */
  public getHex = (): string => this.#hex

  /**
   * Returns color rgb values
   * @returns {RGBAObj} : rgb values
   */
  public getRGB = (): RGBAObj =>
    ({
      r: this.#r,
      g: this.#g,
      b: this.#b,
      a: this.#a
    })

  /**
   * Sets rgb values based on hex
   * @param   {string} hex : hex string
   * @returns {number[]}   : instance rgb values
   */
  #setRgbFromHex = (hex: string = this.#hex): [number, number, number, number] => {
    const { r, g, b, a = 1 } = Color.hex2RGB(hex)
    return [this.#r, this.#g, this.#b, this.#a] = [r, g, b, a]
  }

  /**
   * Converts rgba values into hex color
   * @param   {Number} r : red value
   * @param   {Number} g : green value
   * @param   {Number} b : blue value
   * @param   {Number} a : alpha value
   * @returns {string}   : hex value
   */
  public static rgb2Hex = (r: number, g: number, b: number, a: number = 1): string =>
    "#" + [r, g, b, a].map((x, i) =>
      i === 3 ? a === 1 ? '' : parseInt((255 * x).toString()).toString(16)
              : x.toString(16).padStart(2, '0')).join('')

  /**
   * Converts a hex color string into rgb values
   * @param   {string} hex : hex color
   * @returns {RGBAObj}    : rgba object
   */
  public static hex2RGB = (hex: string): RGBAObj => {
    const hexMatch = hex.match(hex.length <= 4 ? /\w/g : /\w\w/g)

    if (!hexMatch)
      throw new Error("Invalid hex string !")

    const [r, g, b, a] = hexMatch.map(x => parseInt(x.length < 2 ? `${x}${x}` : x, 16))

    return { r, g, b, a: Maths.round(a / 255, 10) }
  }
   
  /**
  * Returns a random hex color string
  * @returns {string} : random hex color
  */
  public static randomColor = (): string =>
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')

  /**
   * Returns a range of color based on start and end color, as well as a step number
   * @param   {string} color1 : start color
   * @param   {string} color2 : end color
   * @param   {number} steps  : stape number
   * @param   {string} format : desired format
   * @returns {(string | number[])[]} : color steps
   */
  public static getColorRange = 
    (color1: string, color2: string, steps: number = 2, format: string = "hex"): (string | number[])[] =>
  {
    const stepFactor = 1 / (steps - 1)

    return [...Array(steps).keys()].map(i => {
      const color = Color.#interpolateColor(color1, color2, stepFactor * i)
      return format === "hex" ? Color.rgb2Hex(color[0], color[1], color[2]) : color
    })
  }

  /**
   * Interolate a color based on two given colors and a factor
   * @param   {string} color1 : first color
   * @param   {string} color2 : second color
   * @param   {number} factor : factor
   * @returns {number[]}      : interpolated color
   */
  static #interpolateColor = (color1: string, color2: string, factor: number = .5) => {
    const rgb1 = Object.values(Color.hex2RGB(color1)),
          rgb2 = Object.values(Color.hex2RGB(color2))
    
    return [...Array(3).keys()].map(i => Math.round(rgb1[i] + factor * (rgb2[i] - rgb1[i])))
  }

  /**
   * Checks if hex string is valid
   * @param   {string} str : str to check
   * @returns {boolean}    : whether the string is valid or not
   */
  static #checkHexString = (str: string): boolean => str.match(Color.#hexCheck) ? true : false
}

export default Color