import { Query, Rule } from 'filter-query-parser';
import _ from 'lodash';
import { CONDITION, FILTER_TYPE, OPERATOR } from './constants';
import { Options } from './interface';

export const checkIsNested = (keys: string[], useValue = false) =>
  _.intersection(keys, (useValue ? _.values : _.keys)(CONDITION)).length > 1;

export const checkIsMultiple = (keys: string[], useValue = false) =>
  _.intersection(keys, (useValue ? _.values : _.keys)(CONDITION)).length === 1;

export const getFilterType = (keys: string[]) => {
  if (checkIsNested(keys)) {
    return FILTER_TYPE.NESTED;
  }

  if (checkIsMultiple(keys)) {
    return FILTER_TYPE.MULTIPLE;
  }

  return FILTER_TYPE.SINGLE;
};

export const getFilterTypeCondition = (keys: string[]) => {
  if (checkIsNested(keys, true)) {
    return FILTER_TYPE.NESTED;
  }

  if (checkIsMultiple(keys, true)) {
    return FILTER_TYPE.MULTIPLE;
  }

  return FILTER_TYPE.SINGLE;
};

export const convertFilterValue = (
  rule: Rule | Query,
  options: Options = {}
) => {
  const op = rule.operator.toUpperCase();
  let operation = OPERATOR[op] ?? op;
  let value = rule.value;

  switch (op) {
    case 'CONTAINS':
      if (!options.caseSensitive) {
        operation = OPERATOR['CONTAINS %'];
      }

      value = `%${String(value)}%`;
      break;
    case 'DOES NOT CONTAIN':
      if (!options.caseSensitive) {
        operation = OPERATOR['DOES NOT CONTAIN %'];
      }

      value = `%${String(value)}%`;
      break;
    case 'NULL':
    case 'NOT NULL':
      value = null;
      break;
  }

  return {
    operation,
    value,
  };
};
