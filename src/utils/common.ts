import _ from 'lodash';
import { CONDITION, FILTER_TYPE } from './constants';

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
