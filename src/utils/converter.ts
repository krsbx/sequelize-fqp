import _ from 'lodash';
import { checkIsNested } from './common';
import { CONDITION } from './constants';
import { AnyRecord } from './interface';

export const convertFilter = (filters: AnyRecord) => {
  let allRule: AnyRecord = {};

  // Take the first key of the object => filter condition
  const condition = _.keys(filters)[0] as string;

  // isNested => true if it contains AND or OR more than 1
  const isNested = checkIsNested(_.keys(filters[condition]));

  _.forEach(filters, (filter, key) => {
    const rules: AnyRecord = {};

    if (isNested) {
      if (!allRule[condition]) {
        allRule[condition] = {};
      }

      allRule[condition] = {
        ...allRule[condition],
        ...convertFilter(filter),
      };

      return;
    }

    if (_.includes(_.keys(CONDITION), key)) {
      rules[key] = _.values(convertFilter(filter));
      allRule = {
        ...allRule,
        ...rules,
      };

      return;
    }

    rules[key] = {
      [key]: filter,
    };

    allRule = {
      ...allRule,
      ...rules,
    };
  });

  return allRule;
};

export const convertFilterCondition = (filters: AnyRecord) => {
  // Take the first key of the object => filter condition
  const condition = _.keys(filters)[0] as string;

  // isNested => true if it contains AND or OR more than 1
  const isNested = checkIsNested(_.keys(filters[condition]));

  _.forEach(filters, (filter, key) => {
    if (isNested) {
      const filterCond = CONDITION[condition];

      Object.assign(filters, {
        [filterCond]: [{ ...convertFilterCondition(filter) }],
      });
      delete filters[condition];

      return;
    }

    if (_.includes(_.keys(CONDITION), key)) {
      const filterCond = CONDITION[key];

      Object.assign(filters, {
        [filterCond]: convertFilterCondition(filter),
      });
      delete filters[key];

      return;
    }
  });

  return filters;
};
