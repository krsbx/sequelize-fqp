import { POSSIBLE_DATE_FORMAT } from './constants';
import { isValid, parse } from 'date-fns';

export const isValidDate = (date: unknown) => {
  switch (true) {
    case typeof date === 'string':
      return POSSIBLE_DATE_FORMAT.some((format) =>
        isValid(parse(date, format, new Date()))
      );

    default:
      return false;
  }
};
