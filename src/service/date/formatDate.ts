import moment from 'moment';

export const formatDate = (date: Date, format: DateFormats | string) => {
  return moment(date.toISOString()).format(format);
};

export enum DateFormats {
  DateOnly = 'DD/MM/YYYY',
  TimeOnly = 'HH:mm:ss',
  MonthDayYear = 'MM/DD/YYYY',
  YearOnly = 'YYYY',
  DayOnly = 'DD',
  MonthOnly = 'MM',
  HourOnly = 'HH',
  MinutesOnly = 'mm',
  YYYY_MM_DD_T_HH_MM_SSS = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  DD_MM_YYYY_HH_MM = 'DD/MM/YYYY HH:mm',
  DD_MM_YYYY = 'DD/MM/YYYY',
}
