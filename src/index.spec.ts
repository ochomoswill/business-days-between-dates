import {countBusinessDaysBetweenDates} from './index';

describe('Business Days between', () => {
    test('is difference zero when startDate is the same as the endDate', () => {
        expect(countBusinessDaysBetweenDates('25-12-2022', '25-12-2022'))
            .toBe(0);
    });

    test('is difference valid for a valid date range', () => {
        expect(countBusinessDaysBetweenDates('11-12-2022', '25-12-2022'))
            .toBe(10);
    });

    test('is difference valid when startDate is excluded', () => {
        expect(countBusinessDaysBetweenDates('12-12-2022', '15-12-2022', {
            excludeStartDate: true
        }))
            .toBe(3);
    });

    test('is difference valid when endDate is excluded', () => {
        expect(countBusinessDaysBetweenDates('12-12-2022', '15-12-2022', {
            excludeEndDate: true
        }))
            .toBe(3);
    });

    test('is difference valid when start & endDate are excluded', () => {
        expect(countBusinessDaysBetweenDates('12-12-2022', '15-12-2022', {
            excludeStartDate: true,
            excludeEndDate: true
        }))
            .toBe(2);
    });

    test('is difference negative for a reversed date range', () => {
        expect(countBusinessDaysBetweenDates( '25-12-2022','11-12-2022', {
            businessDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        }))
            .toBe(-10);
    });

    test('is difference exclusive of the holiday if any', () => {
        expect(countBusinessDaysBetweenDates('11-12-2022', '25-12-2022', {
            businessDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            holidays: ['12-12-2022']
        }))
            .toBe(9);
    });

    test('is difference valid with custom business days', () => {
        expect(countBusinessDaysBetweenDates('11-12-2022', '25-12-2022', {
            businessDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }))
            .toBe(12);
    });
});

describe('Difference with Use Calendar Days option', () => {
    test('is difference valid for a valid date range', () => {
        expect(countBusinessDaysBetweenDates('12-12-2022', '25-12-2022', {
            useCalendarDays: true
        }))
            .toBe(14);
    });

    test('excludes holidays', () => {
        expect(countBusinessDaysBetweenDates('12-12-2022', '25-12-2022', {
            holidays: ['12-12-2022'],
            useCalendarDays: true
        }))
            .toBe(14);
    });
});
