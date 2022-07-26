import _ from 'lodash';
import { getFilterType } from './common';
import { CONDITION, FILTER_TYPE } from './constants';
import {
  convertMultipleFilter,
  convertMultipleFilterCondition,
} from './converter/multiple';
import {
  convertSingleNestedFilter,
  convertSingleNestedFilterCondition,
} from './converter/singleNested';
import { AnyRecord } from './interface';

export const convertFilter = (filters: AnyRecord) => {
  const condition = Object.keys(filters)[0];

  const filterType = getFilterType(_.keys(filters[condition]));

  const isNested = filterType === FILTER_TYPE.NESTED;

  if (filterType !== FILTER_TYPE.MULTIPLE) {
    return convertSingleNestedFilter(filters, isNested);
  }

  return {
    [condition]: convertMultipleFilter(filters[condition]),
  };
};

export const convertFilterCondition = (filters: AnyRecord) => {
  const condition = Object.keys(filters)[0];

  const filterType = getFilterType(_.keys(filters[condition]));

  const isNested = filterType === FILTER_TYPE.NESTED;

  if (filterType !== FILTER_TYPE.MULTIPLE) {
    return convertSingleNestedFilterCondition(filters, isNested);
  }

  const filterCond = CONDITION[condition];

  return {
    [filterCond]: [{ ...convertMultipleFilterCondition(filters[condition]) }],
  };
};
