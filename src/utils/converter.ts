import _ from 'lodash';
import { checkIsNested } from './common';
import { CONDITION } from './constants';

export const convertFilter = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let allRule: Record<string, any> = {};

  // Take the first key of the object => filter condition
  const condition = _.keys(filters)[0] as string;

  // isNested => true if it contains AND or OR more than 1
  const isNested = checkIsNested(_.keys(filters[condition]));

  _.forEach(filters, (filter, key) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rules: Record<string, any> = {};

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
