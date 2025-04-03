import { Temporal } from '@js-temporal/polyfill';

export const getDaysInMonthForYear = (month: number, year: number): number => {
  const yearMonth = Temporal.PlainYearMonth.from({ year, month });
  return yearMonth.daysInMonth;
};
