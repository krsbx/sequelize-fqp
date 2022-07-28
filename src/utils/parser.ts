import _ from 'lodash';
import moment from 'moment';
import { Sequelize } from 'sequelize';
import type { Parser } from 'filter-query-parser';
import { CONDITION } from './constants';
import { checkIsNested, convertFilterValue } from './common';
import { AnyRecord, Options } from './interface';

export const extractFilters = (fqp: Parser, options: Options = {}) => {
  const result: AnyRecord = {};
  const { condition, rules } = fqp;

  rules.forEach((rule) => {
    // If its a new Parser fields
    if (!rule.field) {
      return (result[condition] = {
        ...result[condition],
        ...extractFilters(rule as unknown as Parser, options),
      });
    }

    const { field } = rule;
    const isDate = moment(String(rule.value), 'YYYY-MM-DD', true).isValid();

    const { operation, value } = convertFilterValue(rule, options);

    result[condition] = {
      ...result[condition],
      [field]: {
        ...result[condition]?.[field],
        field,
        value,
        operation,
        isDate,
      },
    };
  });

  return result;
};

export const parseFilterToRules = (filters: AnyRecord) => {
  let allRule: AnyRecord = {};

  // Take the first key of the object => filter condition
  const condition = _.keys(filters)[0] as string;

  // isNested => true if it contains AND or OR more than 1
  const isNested = checkIsNested(_.keys(filters[condition]));

  _.forEach(filters, (filter, key) => {
    if (isNested) {
      if (!allRule[condition]) {
        allRule[condition] = {};
      }

      allRule[condition] = parseFilterToRules(filter);
      return;
    }

    if (_.includes(_.keys(CONDITION), key)) {
      allRule[key] = parseFilterToRules(filter);
      return;
    }

    const validOp = filter.operation;
    const value = filter.value;

    allRule = {
      ...allRule,
      [key]: filter.isDate
        ? Sequelize.where(
            Sequelize.fn('Date', Sequelize.col(key)),
            validOp,
            value
          )
        : {
            [validOp]: value,
          },
    };
  });

  return allRule;
};
