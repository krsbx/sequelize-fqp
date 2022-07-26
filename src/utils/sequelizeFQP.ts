import type { Parser } from 'filter-query-parser';
import { extractFilters, parseFilterToRules } from './parser';
import { convertFilter, convertFilterCondition } from './converter';
import { Options } from './interface';

const fqpSequelize = (fqp: Parser, options: Options = {}) => {
  const extractedFilter = extractFilters(fqp, options);
  const filter = parseFilterToRules(extractedFilter);
  const validFilter = convertFilter(filter);
  const validFilterCondition = convertFilterCondition(validFilter);

  return validFilterCondition;
};

export default fqpSequelize;
