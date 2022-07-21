import type { Parser } from 'filter-query-parser';
import { extractFilters, parseFilterToRules } from './parser';
import { convertFilter, convertFilterCondition } from './converter';

const fqpSequelize = (fqp: Parser) => {
  const extractedFilter = extractFilters(fqp);
  const filter = parseFilterToRules(extractedFilter);
  const validFilter = convertFilter(filter);
  const validFilterCondition = convertFilterCondition(validFilter);

  return validFilterCondition;
};

export default fqpSequelize;
