import type { Rule } from 'filter-query-parser';
import moment from 'moment';
import { OPERATOR } from './constants';
import { Options } from './interface';

export const convertFilter = (rule: Rule, options: Options = {}) => {
  const op = rule.operator.toUpperCase();
  let operation = OPERATOR[op] ?? op;
  let value = rule.value;

  const isDate = moment(String(rule.value), 'YYYY-MM-DD', true).isValid();

  switch (op) {
    case 'CONTAINS':
      if (!options.caseSensitive) {
        operation = OPERATOR['CONTAINS %'];
      }

      value = `%${String(value)}%` as never;
      break;
    case 'DOES NOT CONTAIN':
      if (!options.caseSensitive) {
        operation = OPERATOR['DOES NOT CONTAIN %'];
      }

      value = `%${String(value)}%` as never;
      break;
    case 'NULL':
    case 'NOT NULL':
      value = null;
      break;
  }

  return {
    operation,
    value,
    isDate,
  };
};
