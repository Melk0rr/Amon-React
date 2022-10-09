import { limit } from "./math"
import { zeroPad } from "./strings"

import type { BaseUnit, Range } from "./math"


type WeekDayNumber = Range<0, 7>
type MonthNumber = BaseUnit|10|11|12
type DayNumber = Range<0, 32>
type Hour = Range<0, 24>
type MinutesSeconds = Range<0, 60>

type TimeElement = MonthNumber|DayNumber|Hour|MinutesSeconds

/**
 * Time object containing year, month, day, hour, min and sec values
 */
type TimeObj = {
  year: number,
  month: MonthNumber,
  day: DayNumber,
  hour: Hour,
  min: MinutesSeconds,
  sec: MinutesSeconds,
}

type YearMonthObj = {
  year: number,
  month: MonthNumber,
}

type YearMonthDayObj = {
  year: number,
  month: MonthNumber,
  day: DayNumber
}

/**
 * Time class providing various date / time utility functions
 */
class Time extends Date {


  // ----------------------------------------------------------------
  // ATTRIBUTES & UTILS ---------------------------------------------
  // ----------------------------------------------------------------

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
  } as const

  public static weekDays = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday"
  } as const

  private static calendarWeeks = 6

  /**
   * Class constructor
   * @param {Object} dateObj : object containing 
   */
  constructor(date: TimeObj | Date | string) {

    const newDate = Time.construct(date)

    // Converts the given string into date infos and pass them to parent constructor
    const { year, month, day, hour, min, sec } = newDate
    super(year, month - 1, day, hour, min, sec)
  }




  // ----------------------------------------------------------------
  // PRIVATE STATIC -------------------------------------------------
  // ----------------------------------------------------------------

  /**
   * Handles different argument type passed to constructor
   * @param {TimeObj | Date | string} date : initial date
   * @returns {TimeObj} : time object with year, month, day, hour, min, sec
   */
  private static construct = (date: TimeObj | Date | string): TimeObj => {
    let res

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

    return res
  }

  /**
   * Returns object containing time infos
   * @returns {Object} : time object
   */
  private static getDateObj = (date: Date | Time): TimeObj =>
    ({
      year: date.getFullYear(),
      month: Time.getRealMonth(date),
      day: date.getDate() as DayNumber,
      hour: date.getHours() as Hour,
      min: date.getMinutes() as MinutesSeconds,
      sec: date.getSeconds() as MinutesSeconds
    })

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
   * @returns {MonthNumber}         : month
   */
  private static getMonthFromDateString = (dateStr: string): MonthNumber =>
    Time.getElementFromDateString<MonthNumber>(dateStr, 1, [4, 5, 6])

  /**
   * Parse day from date string
   * @param   {string}      dateStr : date string to parse
   * @param   {number}      year    : year, used to check max day value
   * @param   {MonthNumber} month   : month, used to check max day value
   * @returns {DayNumber}           : day
   */
  private static getDayFromDateString = (dateStr: string, year: number, month: MonthNumber): DayNumber => {
    const maxDays = Time.getMonthDays(month, year),
          dayNumber = Time.getElementFromDateString<DayNumber>(dateStr, 1, [6, 7, 8])

    return limit(dayNumber, [0, maxDays]) as DayNumber
  }

  /**
   * Parse hours from date string
   * @param   {string} dateStr : date string to parse
   * @returns {Hour}           : hours
   */
  private static getHoursFromDateString = (dateStr: string): Hour =>
    Time.getElementFromDateString<Hour>(dateStr, 1, [8, 9, 10])

  /**
   * Parse minutes from date string
   * @param   {string}         dateStr : date string to parse
   * @returns {MinutesSeconds}         : minutes
   */
  private static getMinutesFromDateString = (dateStr: string): MinutesSeconds => 
    Time.getElementFromDateString<MinutesSeconds>(dateStr, 0, [10, 11, 12])


  /**
   * Parse seconds from date string
   * @param   {string}         dateStr : date string to parse
   * @returns {MinutesSeconds}         : seconds
   */
  private static getSecondsFromDateString = (dateStr: string): MinutesSeconds =>
    Time.getElementFromDateString<MinutesSeconds>(dateStr, 0, [12, 13, 14])


  /**
   * Parse element from date string based on multiple parameters
   * @param   {string}   dateStr      : date string to parse
   * @param   {Type}     defaultValue : default value for the element
   * @param   {number[]} slice        : slice indexes
   * @returns {TimeElement}           : date element
   */
  private static getElementFromDateString = <Type extends TimeElement>
  (dateStr: string, defaultValue: Type, slice: [number, number, number]): Type =>
  {
    const [ sMin, sMid, sMax ] = slice
    const el: Type = (dateStr.length > sMin
             ? dateStr.length === sMin  ? parseInt(dateStr.slice(sMin, sMid), 10)
                                        : parseInt(dateStr.slice(sMin, sMax), 10)
             : defaultValue) as Type

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

    const year  = Time.getYearFromDateString(filterStr),
          month = Time.getMonthFromDateString(filterStr),
          day   = Time.getDayFromDateString(filterStr, year, month),
          hour  = Time.getHoursFromDateString(filterStr),
          min   = Time.getMinutesFromDateString(filterStr),
          sec   = Time.getSecondsFromDateString(filterStr)

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  }

  /**
   * Returns today date string
   * @returns {TimeObj} : today date object
   */
  private static today = (): TimeObj => Time.getDateObj(new Date())

  /**
   * Generates an array of n number of days
   * @param   {Type} n : number of values to generate
   * @returns {DayNumber[]} : array of day number
   */
  private static getDayNumberArr = <Type extends number>(n: Type): DayNumber[] =>
    [...Array(limit(n, [0, 31])).keys()] as DayNumber[]

  /**
   * Converts a formated dateString to a dateObj
   * @param {string} dateStr 
   * @returns 
   */
  private static str2dateObj = (dateStr: string): TimeObj => {
    // Split date and time parts
    const [ ymd, hms ] = dateStr.split(' ')

    // Split year (y), month (m), day (d); and hour (h), min (m), seconds (s)
    const ymdArr = ymd.split('-'),
          hmsArr = hms.split(':')

    // Merging both arrays and casting to integers
    const timeArr = [...ymdArr, ...hmsArr].map(t => parseInt(t, 10))

    return {
      year: timeArr[0],
      month: timeArr[1] as MonthNumber,
      day: timeArr[2] as DayNumber,
      hour: timeArr[3] as Hour,
      min: timeArr[4] as MinutesSeconds,
      sec: timeArr[5] as MinutesSeconds
    }
  }


  
  // ----------------------------------------------------------------
  // PUBLIC STATIC---------------------------------------------------
  // ----------------------------------------------------------------



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
    * @returns {DayNumber}       : number of days
    */
  public static getMonthDays = (month: number, year: number): DayNumber => {
    if (month < 1 || month > 12)
      throw new Error(`Invalid month number ${month} provided, expected a number between 1 and 12 !`)

    return month === 2
      ? Time.isLapYear(year) ? 29 : 28
      : [4, 6, 9, 11].includes(month) ? 30 : 31
  }

  /**
   * Returns min and max time of a given array of times
   * @param   {Time[]} dates : array of time
   * @returns {Time[]}       : min, max time
   */
  public static getPeriod = (dates: Time[]): [Time, Time] => {
    dates.sort((a, b) => a.getTime() - b.getTime())
    return [dates[0], dates[-1]]
  }

  /**
   * Gets day of week number of the first day of the given month
   * @param   {number} month : month number
   * @param   {number} year  : year
   * @returns {WeekDayNumber}   : first day of month
   */
  public static getMonthFirstDay = (month: number, year: number): WeekDayNumber =>
    (new Time(`${year}-${zeroPad(month, 2)}-01`).getMonDay())

  /**
   * Returns real month of the year number (default Date first month is 0: January)
   * @param   {Date} date   : date object
   * @returns {MonthNumber} : real month number
   */
  public static getRealMonth = (date: Date): MonthNumber => date.getMonth() + 1 as MonthNumber

  /**
   * Returns week object with Monday as first day;
   * @returns {Object} : reordered week days
   */
  public static getRealWeek = () => {
    const { Sun, ...otherDays } = Time.weekDays
    return { ...otherDays, Sun }
  }

  /**
   * Gets the full month name based on the given month number
   * @param   {MonthNumber} month : month number
   * @returns {string}            : full month name
   */
  public static getFullMonth = (month: MonthNumber): string =>
    Object.values(Time.months)[month]

  /**
   * Gets the short month name based on the given month number
   * @param   {MonthNumber} month : month number
   * @returns {string}            : short month name
   */
  public static getShortMonth = (month: MonthNumber): string =>
    Object.keys(Time.months)[month]
 
  /**
   * Gets the full day name based on the given day number
   * @param   {WeekDayNumber} day : day number
   * @returns {string}        : full day name
   */
  public static getFullDay = (day: WeekDayNumber): string =>
    Object.values(Time.weekDays)[day]
 
  /**
   * Gets the full day name based on the given day number
   * @param   {WeekDayNumber} day : day number
   * @returns {string}        : short day name
   */
  public static getShortDay = (day: WeekDayNumber): string =>
    Object.keys(Time.weekDays)[day]

  /**
   * Gets the month and year before the given month and year
   * @param   {MonthNumber} month : month number
   * @param   {number}      year  : year
   * @returns {YearMonthObj}      : previous month and year couple
   */
  public static getPreviousMonth = (month: MonthNumber, year: number): YearMonthObj =>
    ({ month: (month > 1 ? month - 1 : 12) as MonthNumber, year: month > 1 ? year : year - 1 })

 /**
  * Gets the month and year after the given month and year
  * @param   {MonthNumber} month : month number
  * @param   {number}      year  : year
  * @returns {YearMonthObj}      : next month and year couple
  */
  public static getNextMonth = (month: MonthNumber, year: number): YearMonthObj =>
    ({ month: (month < 12 ? month + 1 : 1) as MonthNumber, year: month < 12 ? year : year + 1 })

  /**
   * Gets the month and year before the given date
   * @param   {Date}         date : date object
   * @returns {YearMonthObj}      : previous month and year couple
   */
  public static getDatePreviousMonth = (date: Date|Time): YearMonthObj =>
    Time.getPreviousMonth(Time.getRealMonth(date), date.getFullYear())

   /**
    * Gets the month and year after the given date
    * @param   {Date}         date : date object
    * @returns {YearMonthObj}      : next month and year couple
    */
  public static getDateNextMonth = (date: Date|Time): YearMonthObj =>
    Time.getNextMonth(Time.getRealMonth(date), date.getFullYear())

  /**
   * Checks if given date1 is before date2
   * @param   {Date|Time} date1 : first date
   * @param   {Date|Time} date2 : second date
   * @returns {boolean}         : whether first date is before second date or not
   */
  public static isBefore = (date1: Date|Time, date2: Date|Time): boolean => date1 < date2

  /**
   * Checks if given date1 is after date2
   * @param   {Date|Time} date1 : first date
   * @param   {Date|Time} date2 : second date
   * @returns {boolean}         : whether first date is after second date or not
   */
  public static isAfter = (date1: Date|Time, date2: Date|Time): boolean => date1 > date2

  /**
   * Checks if given date1 is between date2 and date3
   * @param   {Date|Time} date1 : first date
   * @param   {Date|Time} date2 : second date
   * @param   {Date|Time} date3 : third date
   * @returns {boolean}         : whether first date is between second and third date or not
   */
  public static isBetween = (date1: Date|Time, date2: Date|Time, date3: Date|Time): boolean =>
    (!date1 || !date2 || !date3) ? false : (date1 > date2 && date1 < date3)

  /**
   * Checks if two dates are the same month and year
   * @param   {Date|Time} date1 : date 1
   * @param   {Date|Time} date2 : date 2
   * @returns {boolean}         : whether the two dates are same month and year or not
   */
  public static isSameMonth = (date1: Date|Time, date2: Date|Time): boolean =>
    (!date1 || !date2)
    ? false
    : ((date1.getFullYear() === date2.getFullYear()) &&
      (Time.getRealMonth(date1) === Time.getRealMonth(date2)))

  /**
   * Checks if two dates are the same date, month and year
   * @param   {Date|Time} date1 : date 1
   * @param   {Date|Time} date2 : date 2
   * @returns {boolean}         : whether the two dates are same date, month and year or not
   */
  public static isSameDay = (date1: Date|Time, date2: Date|Time): boolean => {
    if (!date1 || !date2) return false
    return (Time.isSameMonth(date1, date2) && (date1.getDate() === date2.getDate()))
  }

  /**
   * Returns string based on given date
   * @param   {Date|Time} date   : date to use
   * @param   {string}    format : date format
   * @returns {string}           : date string 
   */
  public static toDateString = (date: Date|Time, format = "YYYY-MM-DD"): string => {
    const year = date.getFullYear(),
          month = zeroPad(date.getMonth() + 1, 2),
          day = zeroPad(date.getDate(), 2),
          hour = zeroPad(date.getHours(), 2),
          min = zeroPad(date.getMinutes(), 2),
          sec = zeroPad(date.getSeconds(), 2)
    
    let res
    switch (format) {
      case "YYYY":
        res = year.toString()
        break
      case "YYYY-MM":
        res = year + "-" + month
        break
      case "YYYY-MM-DD hh:mm":
        res = year + "-" + month + "-" + day + " " + hour + ":" + min
        break
      case "YYYY-MM-DD hh:mm:ss":
          res = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
          break
      default:
        res = year + "-" + month + "-" + day
        break
    }
    
    return res
  }

  /**
   * Returns calendar dates based on given month and year
   * @param   {MonthNumber} month : month number
   * @param   {number} year       : year
   * @returns {YearMonthDayObj[]} : calendar dates
   */
   static getCalendar = (month: MonthNumber, year: number): YearMonthDayObj[] => {
    const monthDays = Time.getMonthDays(month, year)
    const firstDay  = Time.getMonthFirstDay(month, year)

    const daysFromPrevMonth = firstDay,
          daysFromNextMonth = Time.calendarWeeks * 7 - (daysFromPrevMonth + monthDays)

    const { month: prevMonth, year: prevMonthYear } = Time.getPreviousMonth(month, year),
          { month: nextMonth, year: nextMonthYear } = Time.getNextMonth(month, year)

    const prevMonthDays = Time.getMonthDays(prevMonth, prevMonthYear)

    // Build dates from previous, current and next month
    const prevMonthDates = Time.getDayNumberArr(daysFromPrevMonth).map((n: DayNumber) =>
      ({ year: prevMonthYear, month: prevMonth, day: (n + (prevMonthDays - daysFromPrevMonth)) as DayNumber }))

    const thisMonthDates = Time.getDayNumberArr(monthDays).map((n: DayNumber) =>
      ({ year, month, day: n }))

    const nextMonthDates = Time.getDayNumberArr(daysFromNextMonth).map((n: DayNumber) =>
      ({ year: nextMonthYear, month: nextMonth, day: n }))

    return [ ...prevMonthDates, ...thisMonthDates, ...nextMonthDates ]
  }


  // ----------------------------------------------------------------
  // PUBLIC ---------------------------------------------------------
  // ----------------------------------------------------------------
  
  /**
   * Implementation of Date method getMonth
   * @returns {MonthNumber} : month number of the given instance of Time
   */
  public getMonth = (): MonthNumber => super.getMonth() as MonthNumber

  /**
   * Implementation of Date method getDay
   * @returns {DayNumber} : month number of the given instance of Time
   */
  public getDay = (): WeekDayNumber => super.getDay() as WeekDayNumber

  /**
   * Returns real month of the year number (default Date first month is 0: January)
   * @returns {MonthNumber} : month number
   */
  public getRealMonth = (): MonthNumber => Time.getRealMonth(this)

  /**
   * Gets the current time full month
   * @returns {string} : full month
   */
  public getFullMonth = (): string => Time.getFullMonth(this.getMonth())

   /**
    * Gets the current time short month
    * @returns {string} : short month
    */
  public getShortMonth = (): string => Time.getShortMonth(this.getMonth())
 
   /**
    * Gets the current time full month
    * @returns {string} : full month
    */
  public getFullDay = (): string => Time.getFullDay(this.getDay())
 
   /**
    * Gets the current time short month
    * @returns {string} : short month
    */
  public getShortDay = (): string => Time.getShortDay(this.getDay())

  /**
   * Returns object containing time infos
   * @returns {TimeObj} : time object
   */
  public getDateObj = (): TimeObj => Time.getDateObj(this)

  /**
   * Returns a string based on time infos
   * @param   {sttring} format : date format
   * @returns {string}         : time string
   */
  public toDateString = (format = "YYYY-MM-DD"): string => Time.toDateString(this, format);
 
  /**
   * Gets ISO formated date string
   * @returns {string} : ISO date string
   */
  public getISOString = (): string => this.toDateString().split(' ')[0]
 
  /**
   * Checks if year of current time is a lap year
   * @returns {boolean} : whether the given year is a lap year or not
   */
  public isLapYear = (): boolean => Time.isLapYear(this.getFullYear())
 
  /**
   * Returns a WeekDayNumber based on the the first day of the instance month
   * @returns {WeekDayNumber} : week day number
   */
  public getMonthFirstDay = (): WeekDayNumber => Time.getMonthFirstDay(this.getRealMonth(), this.getFullYear())

  /**
   * Gets the month and year before the current date
   * @returns {YearMonthObj} : previous month and year couple
   */
  public getPreviousMonth = (): YearMonthObj => Time.getDatePreviousMonth(this)

  /**
   * Gets the month and year after the current date
   * @returns {YearMonthObj} : next month and year couple
   */
  public getNextMonth = (): YearMonthObj => Time.getDateNextMonth(this)

  /**
   * Returns day of week index shifted, so that monday is 0 (first day of the week)
   * @returns {WeekDayNumber} : day index
   */
  public getMonDay = (): WeekDayNumber => this.getDay() === 0 ? 6 : this.getDay() - 1 as WeekDayNumber

  /**
   * Checks if two dates are the same date, month and year
   * @param   {Date|Time} date : date
   * @returns {boolean}        : whether the two dates are same date, month and year or not
   */
  public isSameDay = (date: Date|Time): boolean => Time.isSameDay(this, date)

   /**
    * Checks if current time is before given date
    * @param   {Date|Time} date : first date
    * @returns {boolean}        : whether current date is before second date or not
    */
  public isBefore = (date: Date|Time): boolean => Time.isBefore(this, date)
 
   /**
    * Checks if current time is after given date
    * @param   {Date|Time} date : first date
    * @returns {boolean}        : whether current date is after second date or not
    */
  public isAfter = (date: Date|Time): boolean => Time.isAfter(this, date)
 
   /**
    * Checks if current time is between date1 and date2
    * @param   {Date|Time} date1 : first date
    * @param   {Date|Time} date2 : second date
    * @returns {boolean}         : whether current date is between the two given dates or not
    */
  public isBetween = (date1: Date|Time, date2: Date|Time): boolean => Time.isBetween(this, date1, date2)

  
}

export default Time