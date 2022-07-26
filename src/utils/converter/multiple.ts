import _ from 'lodash';
import { CONDITION } from '../constants';
import { AnyRecord } from '../interface';

export const convertMultipleFilter = (filters: AnyRecord) => {
  let allRule: AnyRecord = {};

  _.forEach(filters, (filter, key) => {
    const rules: AnyRecord = {};

    if (_.includes(_.keys(CONDITION), key)) {
      rules[key] = {
        [key]: _.values(convertMultipleFilter(filter)),
      };

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

export const convertMultipleFilterCondition = (filters: AnyRecord) => {
  _.forEach(filters, (filter, key) => {
    if (_.includes(_.keys(CONDITION), key)) {
      const filterCond = CONDITION[key];

      Object.assign(filters, {
        [filterCond]: filter[key],
      });

      delete filters[key];

      return;
    }

    filters[key] = filter[key];
  });

  return filters;
};
