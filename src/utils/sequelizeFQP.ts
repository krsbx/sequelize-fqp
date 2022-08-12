import type { Parser } from 'filter-query-parser';
import { CONDITION } from './constants';
import { Options } from './interface';
import { extractFilters } from './parser';

const sequelizeFQP = (filter: Parser, options: Options = {}) => {
  const dbCond = CONDITION[filter.condition];
  const parsedFilter = extractFilters(filter.rules, options);

  if (!dbCond) return {};

  const result = { [dbCond]: parsedFilter };

  return result;
};

export default sequelizeFQP;
