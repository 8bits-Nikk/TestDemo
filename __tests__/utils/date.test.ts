import {DateFormats, formatDate} from '../../src/service/date/formatDate';

describe('Test date utils', () => {
  it('Should return day of date', () => {
    const date = new Date('Wed Sep 21 2022 12:47:09 GMT+0530');
    const day = formatDate(date, DateFormats.DayOnly);
    expect(day).toBe('21');
  });

  it('Should return date like DD/MM/YYYY', () => {
    const date = new Date('Wed Sep 21 2022 12:47:09 GMT+0530');
    const format = formatDate(date, DateFormats.DateOnly);
    expect(format).toBe('21/09/2022');
  });

  it('Should return day in words', () => {
    const date = new Date('Wed Sep 21 2022 12:47:09 GMT+0530');
    const day = formatDate(date, 'ddd');
    expect(day).toBe('Wed');
  });

  it('Should return default date with no given format', () => {
    const date = new Date('Wed Sep 21 2022 12:47:09 GMT+0530');
    const newDate = formatDate(date, '');
    expect(newDate).toBe('2022-09-21T12:47:09+05:30');
  });
});
