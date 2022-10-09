import * as Maths from "./math";
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
    // PRIVATE STATIC -------------------------------------------------
    // ----------------------------------------------------------------
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
    static getMonthFromDateString = (dateStr) => Time.getElementFromDateString(dateStr, 1, [4, 5, 6]);
    /**
     * Parse day from date string
     * @param   {string}      dateStr : date string to parse
     * @param   {number}      year    : year, used to check max day value
     * @param   {MonthNumber} month   : month, used to check max day value
     * @returns {DayNumber}           : day
     */
    static getDayFromDateString = (dateStr, year, month) => {
        const maxDays = Time.getMonthDays(month, year), dayNumber = Time.getElementFromDateString(dateStr, 1, [6, 7, 8]);
        return Maths.limit(dayNumber, [0, maxDays]);
    };
    /**
     * Parse hours from date string
     * @param   {string} dateStr : date string to parse
     * @returns {Hour}           : hours
     */
    static getHoursFromDateString = (dateStr) => Time.getElementFromDateString(dateStr, 1, [8, 9, 10]);
    /**
     * Parse minutes from date string
     * @param   {string}         dateStr : date string to parse
     * @returns {MinutesSeconds}         : minutes
     */
    static getMinutesFromDateString = (dateStr) => Time.getElementFromDateString(dateStr, 0, [10, 11, 12]);
    /**
     * Parse seconds from date string
     * @param   {string}         dateStr : date string to parse
     * @returns {MinutesSeconds}         : seconds
     */
    static getSecondsFromDateString = (dateStr) => Time.getElementFromDateString(dateStr, 0, [12, 13, 14]);
    /**
     * Parse element from date string based on multiple parameters
     * @param   {string}   dateStr      : date string to parse
     * @param   {Type}     defaultValue : default value for the element
     * @param   {number[]} slice        : slice indexes
     * @returns {TimeElement}           : date element
     */
    static getElementFromDateString = (dateStr, defaultValue, slice) => {
        const [sMin, sMid, sMax] = slice;
        const el = (dateStr.length > sMin
            ? dateStr.length === sMin ? parseInt(dateStr.slice(sMin, sMid), 10)
                : parseInt(dateStr.slice(sMin, sMax), 10)
            : defaultValue);
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
    // PUBLIC STATIC---------------------------------------------------
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
     * @returns {WeekDayNumber}   : first day of month
     */
    static getMonthFirstDay = (month, year) => (new Time(`${year}-${zeroPad(month, 2)}-01`).getMonDay());
    /**
     * Returns real month of the year number (default Date first month is 0: January)
     * @param   {Date} date   : date object
     * @returns {MonthNumber} : real month number
     */
    static getRealMonth = (date) => date.getMonth() + 1;
    /**
     * Returns week object with Monday as first day;
     * @returns {Object} : reordered week days
     */
    static getRealWeek = () => {
        const { Sun, ...otherDays } = Time.weekDays;
        return { ...otherDays, Sun };
    };
    /**
     * Gets the full month name based on the given month number
     * @param   {MonthNumber} month : month number
     * @returns {string}            : full month name
     */
    static getFullMonth = (month) => Object.values(Time.months)[Maths.limit(month, [0, 11])];
    /**
     * Gets the short month name based on the given month number
     * @param   {MonthNumber} month : month number
     * @returns {string}            : short month name
     */
    static getShortMonth = (month) => Object.keys(Time.months)[Maths.limit(month, [0, 11])];
    /**
     * Gets the full day name based on the given day number
     * @param   {WeekDayNumber} day : day number
     * @returns {string}        : full day name
     */
    static getFullDay = (day) => Object.values(Time.weekDays)[Maths.limit(day, [0, 6])];
    /**
     * Gets the full day name based on the given day number
     * @param   {WeekDayNumber} day : day number
     * @returns {string}        : short day name
     */
    static getShortDay = (day) => Object.keys(Time.weekDays)[Maths.limit(day, [0, 6])];
    /**
     * Gets the month and year before the given month and year
     * @param   {MonthNumber} month : month number
     * @param   {number}      year  : year
     * @returns {YearMonthObj}      : previous month and year couple
     */
    static getPreviousMonth = (month, year) => ({ month: (month > 1 ? month - 1 : 12), year: month > 1 ? year : year - 1 });
    /**
     * Gets the month and year after the given month and year
     * @param   {MonthNumber} month : month number
     * @param   {number}      year  : year
     * @returns {YearMonthObj}      : next month and year couple
     */
    static getNextMonth = (month, year) => ({ month: (month < 12 ? month + 1 : 1), year: month < 12 ? year : year + 1 });
    /**
     * Gets the month and year before the given date
     * @param   {Date}         date : date object
     * @returns {YearMonthObj}      : previous month and year couple
     */
    static getDatePreviousMonth = (date) => Time.getPreviousMonth(Time.getRealMonth(date), date.getFullYear());
    /**
     * Gets the month and year after the given date
     * @param   {Date}         date : date object
     * @returns {YearMonthObj}      : next month and year couple
     */
    static getDateNextMonth = (date) => Time.getNextMonth(Time.getRealMonth(date), date.getFullYear());
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
    /**
     * Returns string based on given date
     * @param   {Date|Time} date   : date to use
     * @param   {string}    format : date format
     * @returns {string}           : date string
     */
    static toDateString = (date, format = "YYYY-MM-DD") => {
        const year = date.getFullYear(), month = zeroPad(date.getMonth() + 1, 2), day = zeroPad(date.getDate(), 2), hour = zeroPad(date.getHours(), 2), min = zeroPad(date.getMinutes(), 2), sec = zeroPad(date.getSeconds(), 2);
        let res;
        switch (format) {
            case "YYYY":
                res = year.toString();
                break;
            case "YYYY-MM":
                res = year + "-" + month;
                break;
            case "YYYY-MM-DD hh:mm":
                res = year + "-" + month + "-" + day + " " + hour + ":" + min;
                break;
            case "YYYY-MM-DD hh:mm:ss":
                res = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
                break;
            default:
                res = year + "-" + month + "-" + day;
                break;
        }
        return res;
    };
    /**
     * Returns calendar dates based on given month and year
     * @param   {MonthNumber} month : month number
     * @param   {number} year       : year
     * @returns {YearMonthDayObj[]} : calendar dates
     */
    static getCalendar = (month, year) => {
        const monthDays = Time.getMonthDays(month, year);
        const firstDay = Time.getMonthFirstDay(month, year);
        const daysFromPrevMonth = firstDay, daysFromNextMonth = Time.calendarWeeks * 7 - (daysFromPrevMonth + monthDays);
        const { month: prevMonth, year: prevMonthYear } = Time.getPreviousMonth(month, year), { month: nextMonth, year: nextMonthYear } = Time.getNextMonth(month, year);
        const prevMonthDays = Time.getMonthDays(prevMonth, prevMonthYear);
        // Build dates from previous, current and next month
        const prevMonthDates = [...Array(daysFromPrevMonth).keys()].map((n) => ({ year: prevMonthYear, month: prevMonth, day: (n + (prevMonthDays - daysFromPrevMonth)) }));
        const thisMonthDates = [...Array(monthDays).keys()].map((n) => ({ year, month, day: n }));
        const nextMonthDates = [...Array(daysFromNextMonth).keys()].map((n) => ({ year: nextMonthYear, month: nextMonth, day: n }));
        return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
    };
    // ----------------------------------------------------------------
    // PUBLIC ---------------------------------------------------------
    // ----------------------------------------------------------------
    /**
     * Implementation of Date method getMonth
     * @returns {MonthNumber} : month number of the given instance of Time
     */
    getMonth = () => super.getMonth();
    /**
     * Implementation of Date method getDay
     * @returns {DayNumber} : month number of the given instance of Time
     */
    getDay = () => super.getDay();
    /**
     * Returns real month of the year number (default Date first month is 0: January)
     * @returns {MonthNumber} : month number
     */
    getRealMonth = () => Time.getRealMonth(this);
    /**
     * Gets the current time full month
     * @returns {string} : full month
     */
    getFullMonth = () => Time.getFullMonth(this.getMonth());
    /**
     * Gets the current time short month
     * @returns {string} : short month
     */
    getShortMonth = () => Time.getShortMonth(this.getMonth());
    /**
     * Gets the current time full month
     * @returns {string} : full month
     */
    getFullDay = () => Time.getFullDay(this.getDay());
    /**
     * Gets the current time short month
     * @returns {string} : short month
     */
    getShortDay = () => Time.getShortDay(this.getDay());
    /**
     * Returns object containing time infos
     * @returns {TimeObj} : time object
     */
    getDateObj = () => Time.getDateObj(this);
    /**
     * Returns a string based on time infos
     * @param   {sttring} format : date format
     * @returns {string}         : time string
     */
    toDateString = (format = "YYYY-MM-DD") => Time.toDateString(this, format);
    /**
     * Gets ISO formated date string
     * @returns {string} : ISO date string
     */
    getISOString = () => this.toDateString().split(' ')[0];
    /**
     * Checks if year of current time is a lap year
     * @returns {boolean} : whether the given year is a lap year or not
     */
    isLapYear = () => Time.isLapYear(this.getFullYear());
    /**
     * Returns a WeekDayNumber based on the the first day of the instance month
     * @returns {WeekDayNumber} : week day number
     */
    getMonthFirstDay = () => Time.getMonthFirstDay(this.getRealMonth(), this.getFullYear());
    /**
     * Gets the month and year before the current date
     * @returns {YearMonthObj} : previous month and year couple
     */
    getPreviousMonth = () => Time.getDatePreviousMonth(this);
    /**
     * Gets the month and year after the current date
     * @returns {YearMonthObj} : next month and year couple
     */
    getNextMonth = () => Time.getDateNextMonth(this);
    /**
     * Returns day of week index shifted, so that monday is 0 (first day of the week)
     * @returns {WeekDayNumber} : day index
     */
    getMonDay = () => this.getDay() === 0 ? 6 : this.getDay() - 1;
    /**
     * Checks if two dates are the same date, month and year
     * @param   {Date|Time} date : date
     * @returns {boolean}        : whether the two dates are same date, month and year or not
     */
    isSameDay = (date) => Time.isSameDay(this, date);
    /**
     * Checks if current time is before given date
     * @param   {Date|Time} date : first date
     * @returns {boolean}        : whether current date is before second date or not
     */
    isBefore = (date) => Time.isBefore(this, date);
    /**
     * Checks if current time is after given date
     * @param   {Date|Time} date : first date
     * @returns {boolean}        : whether current date is after second date or not
     */
    isAfter = (date) => Time.isAfter(this, date);
    /**
     * Checks if current time is between date1 and date2
     * @param   {Date|Time} date1 : first date
     * @param   {Date|Time} date2 : second date
     * @returns {boolean}         : whether current date is between the two given dates or not
     */
    isBetween = (date1, date2) => Time.isBetween(this, date1, date2);
}
export default Time;
