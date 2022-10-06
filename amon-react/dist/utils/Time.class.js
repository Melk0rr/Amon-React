import * as Strings from "./strings";
const { zeroPad } = Strings;
/**
 * Time class providing various date / time utility functions
 */
class Time extends Date {
    // ----------------------------------------------------------------
    // ATTRIBUTES & UTILS ---------------------------------------------
    // ----------------------------------------------------------------
    static months = {
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
    };
    static weekDays = {
        Sun: "Sunday",
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday"
    };
    static calendarWeeks = 6;
    /**
     * Class constructor
     * @param {Object} dateObj : object containing
     */
    constructor(date) {
        const newDate = Time.construct(date);
        // Converts the given string into date infos and pass them to parent constructor
        const { year, month, day, hour, min, sec } = newDate;
        super(year, month - 1, day, hour, min, sec);
    }
    // ----------------------------------------------------------------
    // PRIVATE --------------------------------------------------------
    // ----------------------------------------------------------------
    /**
     * Returns object containing time infos
     * @returns {Object} : time object
     */
    static getDateObj = (date) => ({
        year: date.getFullYear(),
        month: Time.getRealMonth(date),
        day: date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds()
    });
    /**
     * Parse year from date string
     * @param   {string} dateStr : date string to parse
     * @returns {number}         : year
     */
    static getYearFromDateString = (dateStr) => {
        if (dateStr.length < 4)
            throw new Error(`${dateStr} is too short to be a valid time string !`);
        return parseInt(dateStr.slice(0, 4), 10);
    };
    /**
     * Parse month from date string
     * @param   {string} dateStr : date string to parse
     * @returns {MonthNumber}         : month
     */
    static getMonthFromDateString = (dateStr) => Time.getElementFromDateString(dateStr, [1, 13], 1, [4, 5, 6], `Invalid month, expected a value between 1 and 12!`);
    /**
     * Parse day from date string
     * @param   {string}      dateStr : date string to parse
     * @param   {number}      year    : year, used to check max day value
     * @param   {MonthNumber} month   : month, used to check max day value
     * @returns {DayNumber}           : day
     */
    static getDayFromDateString = (dateStr, year, month) => {
        const maxDays = Time.getMonthDays(month, year);
        return Time.getElementFromDateString(dateStr, [1, maxDays], 1, [6, 7, 8], `Invalid day, expected a value between 1 and ${maxDays}!`);
    };
    /**
     * Parse hours from date string
     * @param   {string} dateStr : date string to parse
     * @returns {Hour}           : hours
     */
    static getHoursFromDateString = (dateStr) => Time.getElementFromDateString(dateStr, [0, 23], 1, [8, 9, 10], "Invalid hour, expected a value between 0 and 23!");
    /**
     * Parse minutes from date string
     * @param   {string}         dateStr : date string to parse
     * @returns {MinutesSeconds}         : minutes
     */
    static getMinutesFromDateString = (dateStr) => Time.getElementFromDateString(dateStr, [0, 59], 0, [10, 11, 12], "Invalid minutes, expected a value between 0 and 59!");
    /**
     * Parse seconds from date string
     * @param   {string}         dateStr : date string to parse
     * @returns {MinutesSeconds}         : seconds
     */
    static getSecondsFromDateString = (dateStr) => Time.getElementFromDateString(dateStr, [0, 59], 0, [12, 13, 14], "Invalid seconds, expected a value between 0 and 59!");
    /**
     * Parse element from date string based on multiple parameters
     * @param   {string}   dateStr      : date string to parse
     * @param   {number[]} boundaries   : boundaries to limit the value of the element
     * @param   {number}   defaultValue : default value for the element
     * @param   {number[]} slice        : slice indexes
     * @param   {string}   error        : error message
     * @returns {number}                : date element
     */
    static getElementFromDateString = (dateStr, boundaries, defaultValue, slice, error) => {
        const [sMin, sMid, sMax] = slice;
        const [bMin, bMax] = boundaries;
        const el = dateStr.length > sMin
            ? dateStr.length === sMin ? parseInt(dateStr.slice(sMin, sMid), 10)
                : parseInt(dateStr.slice(sMin, sMax), 10)
            : defaultValue;
        if (el < bMin || el > bMax)
            throw new Error(error);
        return el;
    };
    /**
     * Converts date string into object containing time infos
     * @param   {String} str : time string
     * @returns {Object}     : time infos
     */
    static formatDateString = (str) => {
        const filter = /[/\D/g]/g;
        let filterStr = str.replace(filter, '');
        const year = Time.getYearFromDateString(filterStr), month = Time.getMonthFromDateString(filterStr), day = Time.getDayFromDateString(filterStr, year, month), hour = Time.getHoursFromDateString(filterStr), min = Time.getMinutesFromDateString(filterStr), sec = Time.getSecondsFromDateString(filterStr);
        return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    };
    /**
     * Handles different argument type passed to constructor
     * @param {TimeObj | Date | string} date : initial date
     * @returns {TimeObj} : time object with year, month, day, hour, min, sec
     */
    static construct = (date) => {
        let res;
        if (date instanceof Date) {
            res = Time.getDateObj(date);
        }
        else if (typeof date === "string") {
            res = Time.str2dateObj(Time.formatDateString(date));
        }
        else if (typeof date === "object") {
            const { year, month = 1, day = 1, hour = 1, min = 0, sec = 0 } = date;
            res = year ? { year, month, day, hour, min, sec } : Time.today();
        }
        else {
            res = Time.today();
        }
        return res;
    };
    /**
     * Returns today date string
     * @returns {TimeObj} : today date object
     */
    static today = () => Time.getDateObj(new Date());
    /**
     * Converts a formated dateString to a dateObj
     * @param {string} dateStr
     * @returns
     */
    static str2dateObj = (dateStr) => {
        // Split date and time parts
        const [ymd, hms] = dateStr.split(' ');
        // Split year (y), month (m), day (d); and hour (h), min (m), seconds (s)
        const ymdArr = ymd.split('-'), hmsArr = hms.split(':');
        // Merging both arrays and casting to integers
        const timeArr = [...ymdArr, ...hmsArr].map(t => parseInt(t, 10));
        return {
            year: timeArr[0],
            month: timeArr[1],
            day: timeArr[2],
            hour: timeArr[3],
            min: timeArr[4],
            sec: timeArr[5]
        };
    };
    // ----------------------------------------------------------------
    // PUBLIC ---------------------------------------------------------
    // ----------------------------------------------------------------
    /**
     * Checks if the given year is a lap year
     * @param   {number}  year : year to check
     * @returns {boolean}      : whether the given year is a lap year or not
     */
    static isLapYear = (year) => year % 4 === 0;
    /**
     * Gets given month number of days based on given year and month number
     * @param   {number} month : month number
     * @param   {number} year  : year
     * @returns {DayNumber}       : number of days
     */
    static getMonthDays = (month, year) => {
        if (month < 1 || month > 12)
            throw new Error(`Invalid month number ${month} provided, expected a number between 1 and 12 !`);
        return month === 2
            ? Time.isLapYear(year) ? 29 : 28
            : [4, 6, 9, 11].includes(month) ? 30 : 31;
    };
    /**
     * Returns min and max time of a given array of times
     * @param   {Time[]} dates : array of time
     * @returns {Time[]}       : min, max time
     */
    static getPeriod = (dates) => {
        dates.sort((a, b) => a.getTime() - b.getTime());
        return [dates[0], dates[-1]];
    };
    /**
     * Gets day of week number of the first day of the given month
     * @param   {number} month : month number
     * @param   {number} year  : year
     * @returns {DayIndex}   : first day of month
     */
    static getMonthFirstDay = (month, year) => (new Time(`${year}-${zeroPad(month, 2)}-01`).getMonDay());
    /**
     * Returns real month of the year number (default Date first month is 0: January)
     * @param   {Date} date   : date object
     * @returns {MonthNumber} : real month number
     */
    static getRealMonth = (date) => date.getMonth() + 1;
    /**
     * Returns day of week index shifted, so that monday is 0 (first day of the week)
     * @returns {DayIndex} : day index
     */
    getMonDay = () => this.getDay() === 0 ? 6 : this.getDay() - 1;
    /**
     * Gets the month and year before the given month and year
     * @param   {MonthNumber} month : month number
     * @param   {number}      year  : year
     * @returns {BaseObject}        : previous month and year couple
     */
    static getPreviousMonth = (month, year) => ({ month: month > 1 ? month - 1 : 12, year: month > 1 ? year : year - 1 });
    /**
     * Gets the month and year after the given month and year
     * @param   {MonthNumber} month : month number
     * @param   {number}      year  : year
     * @returns {BaseObject}        : next month and year couple
     */
    static getNextMonth = (month, year) => ({ month: month < 12 ? month + 1 : 1, year: month < 12 ? year : year + 1 });
    /**
     * Checks if given date1 is before date2
     * @param   {Date|Time} date1 : first date
     * @param   {Date|Time} date2 : second date
     * @returns {boolean}         : whether first date is before second date or not
     */
    static isBefore = (date1, date2) => date1 < date2;
    /**
     * Checks if given date1 is after date2
     * @param   {Date|Time} date1 : first date
     * @param   {Date|Time} date2 : second date
     * @returns {boolean}         : whether first date is after second date or not
     */
    static isAfter = (date1, date2) => date1 > date2;
    /**
     * Checks if given date1 is between date2 and date3
     * @param   {Date|Time} date1 : first date
     * @param   {Date|Time} date2 : second date
     * @param   {Date|Time} date3 : third date
     * @returns {boolean}         : whether first date is between second and third date or not
     */
    static isBetween = (date1, date2, date3) => (!date1 || !date2 || !date3) ? false : (date1 > date2 && date1 < date3);
    /**
     * Checks if two dates are the same month and year
     * @param   {Date|Time} date1 : date 1
     * @param   {Date|Time} date2 : date 2
     * @returns {boolean}         : whether the two dates are same month and year or not
     */
    static isSameMonth = (date1, date2) => (!date1 || !date2)
        ? false
        : ((date1.getFullYear() === date2.getFullYear()) &&
            (Time.getRealMonth(date1) === Time.getRealMonth(date2)));
    /**
     * Checks if two dates are the same date, month and year
     * @param   {Date|Time} date1 : date 1
     * @param   {Date|Time} date2 : date 2
     * @returns {boolean}         : whether the two dates are same date, month and year or not
     */
    static isSameDay = (date1, date2) => {
        if (!date1 || !date2)
            return false;
        return (Time.isSameMonth(date1, date2) && (date1.getDate() === date2.getDate()));
    };
}
export default Time;
