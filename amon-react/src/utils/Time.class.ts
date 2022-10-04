import * as Maths from "./math"
import * as Strings from "./strings"
import { BaseObject } from "./interfaces"

const { zeroPad } = Strings

interface TimeObj {
  year: number,
  month: number,
  day: number,
  hour: number,
  min: number,
  sec: number,
  [key: string]: any
}

class Time extends Date {
  public static months = {
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December"
  }

  public static weekDays = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday"
  }

  private static calendarWeeks = 6

  /**
   * Class constructor
   * @param {Object} dateObj : object containing 
   */
  constructor(date: TimeObj) {

    const newDate = Time.construct(date)

    // Converts the given string into date infos and pass them to parent constructor
    const { year, month, day, hour, min, sec } = newDate
    super(year, month - 1, day, hour, min, sec)
  }

  /**
   * Returns real month of the year number (default Date first month is 0: January)
   * @param   {Date} date : date object
   * @returns {number}    : real month number
   */
  public static getRealMonth = (date: Date): number => date.getMonth() + 1

  /**
   * Returns object containing time infos
   * @returns {Object} : time object
   */
  private static getDateObj = (date: Date | Time): BaseObject =>
    ({ year: date.getFullYear(), month: Time.getRealMonth(date), day: date.getDate(), hour: date.getHours(), min: date.getMinutes(), sec: date.getSeconds() })
 
  /**
   * Checks if the given year is a lap year
   * @param   {number}  year : year to check
   * @returns {boolean}      : whether the given year is a lap year or not
   */
  public static isLapYear = (year: number): boolean => year % 4 === 0

  /**
   * Gets given month number of days based on given year and month number
   * @param   {number} month : month number
   * @param   {number} year  : year
   * @returns {number}       : number of days
   */
  public static getMonthDays = (month: number, year: number) => {
    if (month < 1 || month > 12)
      throw new Error(`Invalid month number ${month} provided, expected a number between 1 and 12 !`)

    return month === 2
      ? Time.isLapYear(year) ? 29 : 28
      : [4, 6, 9, 11].includes(month) ? 30 : 31
  }

  /**
   * Parse year from date string
   * @param   {string} dateStr : date string to parse
   * @returns {number}         : year
   */
  private static getYearFromDateString = (dateStr: string): number => {
    if (dateStr.length < 4)
      throw new Error(`${dateStr} is too short to be a valid time string !`)

    return parseInt(dateStr.slice(0, 4), 10)
  }

  /**
   * Parse month from date string
   * @param   {string} dateStr : date string to parse
   * @returns {number}         : month
   */
  private static getMonthFromDateString = (dateStr: string): number => {
    const month = dateStr.length > 4
                ? dateStr.length === 5 ? parseInt(dateStr.slice(4, 5), 10) : parseInt(dateStr.slice(4, 6), 10)
                : 1

    if (month < 1 || month > 13)
      throw new Error(`Invalid month, expected a value between 1 and 12!`)
    
    return month
  }

  /**
   * Parse day from date string
   * @param   {string} dateStr : date string to parse
   * @param   {number} year    : year, used to check max day value
   * @param   {number} month   : month, used to check max day value
   * @returns {number}         : day
   */
  private static getDayFromDateString = (dateStr: string, year: number, month: number): number => {
    const maxDays = Time.getMonthDays(month, year)

    return Time.getElementFromDateString(dateStr, [1, maxDays], 1, [6, 7, 8],
      `Invalid day, expected a value between 1 and ${maxDays}!`)
  }

  /**
   * Parse hours from date string
   * @param   {string} dateStr : date string to parse
   * @returns {number}         : hours
   */
  private static getHoursFromDateString = (dateStr: string): number =>
    Time.getElementFromDateString(dateStr, [0, 23], 1, [8, 9, 10],
      "Invalid hour, expected a value between 0 and 23!")

  /**
   * Parse minutes from date string
   * @param   {string} dateStr : date string to parse
   * @returns {number}         : minutes
   */
  private static getMinutesFromDateString = (dateStr: string): number => 
    Time.getElementFromDateString(dateStr, [0, 59], 0, [10, 11, 12],
      "Invalid minutes, expected a value between 0 and 59!")


  /**
   * Parse seconds from date string
   * @param   {string} dateStr : date string to parse
   * @returns {number}         : seconds
   */
  private static getSecondsFromDateString = (dateStr: string): number =>
    Time.getElementFromDateString(dateStr, [0, 59], 0, [12, 13, 14],
      "Invalid seconds, expected a value between 0 and 59!")


  private static getElementFromDateString = (
    dateStr: string,
    boundaries: [number, number],
    defaultValue: number,
    slice: [number, number, number],
    error: string): number =>
  {
    const [ sMin, sMid, sMax ] = slice
    const [ bMin, bMax ] = boundaries
    const el = dateStr.length > sMin
             ? dateStr.length === sMin ? parseInt(dateStr.slice(sMin, sMid), 10) : parseInt(dateStr.slice(sMin, sMax), 10)
             : defaultValue
    
    if (el < bMin || el > bMax)
      throw new Error(error)

    return el
  }

  /**
   * Converts date string into object containing time infos
   * @param   {String} str : time string
   * @returns {Object}     : time infos
   */
  private static formatDateString = (str: string): string => {
    const filter  = /[/\D/g]/g
    let filterStr = str.replace(filter, '')

    const year = Time.getYearFromDateString(filterStr),
          month = Time.getMonthFromDateString(filterStr),
          day = Time.getDayFromDateString(filterStr, year, month),
          hour = Time.getHoursFromDateString(filterStr),
          min = Time.getMinutesFromDateString(filterStr),
          sec = Time.getSecondsFromDateString(filterStr)

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  }


  /**
   * Handles different argument type passed to constructor
   * @param {Date | Time | string | BaseObject} date 
   * @returns 
   */
  private static construct = (date: Date | Time | string | BaseObject) => {
    let res;

    if (date instanceof Date) {
      res = Time.getDateObj(date)
    } else if (typeof date === "string") {
      res = Time.str2dateObj(Time.formatDateString(date))
    } else if (typeof date === "object") {
      const { year, month = 1, day = 1, hour = 1, min = 0, sec = 0 } = date
      res = year ? { year, month, day, hour, min, sec } : Time.today()
    } else {
      res = Time.today()
    }

    return res;
  }

  /**
   * Returns today date string
   * @returns {string} : today string
   */
  private static today = () => Time.getDateObj(new Date())

  /**
   * Converts a formated dateString to a dateObj
   * @param {string} dateStr 
   * @returns 
   */
  private static str2dateObj = (dateStr: string): TimeObj => {
    const [ ymd, hms ] = dateStr.split(' ');
    const ymdArr = ymd.split('-'),
          hmsArr = hms.split(':');
    const timeArr = [...ymdArr, ...hmsArr].map(t => parseInt(t, 10));
    return { year: timeArr[0], month: timeArr[1], day: timeArr[2], hour: timeArr[3], min: timeArr[4], sec: timeArr[5] };
  }
}

export default Time