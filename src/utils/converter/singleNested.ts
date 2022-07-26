import _ from 'lodash';
import { CONDITION } from '../constants';
import { AnyRecord } from '../interface';

export const convertSingleNestedFilter = (
  filters: AnyRecord,
  isNested = false
) => {
  let allRule: AnyRecord = {};

  _.forEach(filters, (filter, key) => {
    const rules: AnyRecord = {};

    if (isNested) {
      if (!allRule[key]) {
        allRule[key] = {};
      }

      allRule[key] = {
        ...allRule[key],
        ...convertSingleNestedFilter(filter),
      };

      return;
    }

    if (_.includes(_.keys(CONDITION), key)) {
      rules[key] = _.values(convertSingleNestedFilter(filter));

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

export const convertSingleNestedFilterCondition = (
  filters: AnyRecord,
  isNested = false
) => {
  _.forEach(filters, (filter, key) => {
    if (isNested) {
      const filterCond = CONDITION[key];

      Object.assign(filters, {
        [filterCond]: [{ ...convertSingleNestedFilterCondition(filter) }],
      });

      delete filters[key];

      return;
    }

    if (_.includes(_.keys(CONDITION), key)) {
      const filterCond = CONDITION[key];

      Object.assign(filters, {
        [filterCond]: convertSingleNestedFilterCondition(filter),
      });

      delete filters[key];

      return;
    }
  });

  return filters;
};
