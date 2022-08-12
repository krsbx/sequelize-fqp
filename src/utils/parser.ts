import _ from 'lodash';
import { Sequelize } from 'sequelize';
import type { Parser, Rule } from 'filter-query-parser';
import { convertFilter } from './converter';
import { CONDITION } from './constants';
import { Options } from './interface';

export const extractFilters = (
  rules: Rule[] | Parser[],
  options: Options = {}
) => {
  const validRules: { [x: string | symbol | number]: Rule['value'] }[] = [];

  _.forEach(rules, (rule) => {
    if ((rule as Parser)?.condition) {
      const condition = CONDITION[(rule as Parser).condition];

      validRules.push({
        [condition]: extractFilters((rule as Parser).rules, options),
      });
    } else {
      const field = (rule as Rule).field;
      const { operation, value, isDate } = convertFilter(rule as Rule, options);

      validRules.push({
        [field]: isDate
          ? Sequelize.where(
              Sequelize.fn('Date', Sequelize.col(field)),
              operation as unknown as string,
              value
            )
          : {
              [operation]: value,
            },
      });
    }
  });

  return validRules;
};
