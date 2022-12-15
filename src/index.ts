import moment from "moment";

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

type DaysOfWeekCountMap = Record<DayOfWeek, number>

interface CountDaysOfWeekBetweenDatesConfig {
    businessDays?: Array<DayOfWeek>
    holidays?: Array<string>
    dateFormat?: string
    isRelative?: boolean
    excludeStartDate?: boolean
    excludeEndDate?: boolean
    useCalendarDays?: boolean
}

const DEFAULT_CONFIG: CountDaysOfWeekBetweenDatesConfig = {
    businessDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    holidays: [],
    dateFormat: 'DD-MM-YYYY',
    isRelative: true,
    excludeStartDate: false,
    excludeEndDate: false,
    useCalendarDays: false
}


/*
*
* Returns count inclusive of the Start Date and End Date
*
* */

export const countBusinessDaysBetweenDates = (
    sDate: string,
    eDate: string,
    config?: CountDaysOfWeekBetweenDatesConfig
) => {

    const configs = config ? {...DEFAULT_CONFIG, ...config} : DEFAULT_CONFIG
    const businessDays = configs.businessDays;
    const holidays = configs.holidays;

    const theStartDate = moment(sDate, configs.dateFormat)
    const theEndDate = moment(eDate, configs.dateFormat);

    const positive = theEndDate >= theStartDate;
    const startDate = theEndDate < theStartDate ? theEndDate : theStartDate;
    const endDate = theStartDate > theEndDate ? theStartDate : theEndDate;

    if(configs?.excludeStartDate){
        startDate.add(1, "day")
    }

    if (!configs?.excludeEndDate) {
        endDate.add(1, "day");
    }

    const daysOfWeekCount: DaysOfWeekCountMap = {
        'Monday': 0,
        'Tuesday': 0,
        'Wednesday': 0,
        'Thursday': 0,
        'Friday': 0,
        'Saturday': 0,
        'Sunday': 0
    };

    while (startDate < endDate) {
        const startDateString = startDate.format(configs.dateFormat)
        const dayOfWeek = startDate.format('dddd') as DayOfWeek;

        if (!(holidays?.includes(startDateString)) || configs?.useCalendarDays) {
            daysOfWeekCount[dayOfWeek] = daysOfWeekCount[dayOfWeek] + 1;
        }

        startDate.add(1, "day");
    }

    const sumTotalDaysCount = (theDaysOfWeekCount: DaysOfWeekCountMap) => {
        return Object.entries(theDaysOfWeekCount).reduce((totalDays, [dayOfWeek, dayOfWeekCount]) => {
            if (businessDays?.includes(dayOfWeek as DayOfWeek) || configs?.useCalendarDays) {
                totalDays += dayOfWeekCount;
            }
            return totalDays;
        }, 0)
    }

    let daysBetween = sumTotalDaysCount(daysOfWeekCount);

    if (configs.isRelative) {
        return (positive ? daysBetween : -daysBetween);
    }

    return daysBetween;
};






