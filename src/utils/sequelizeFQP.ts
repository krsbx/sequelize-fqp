import type { Parser } from 'filter-query-parser';
import { extractFilters, parseFilterToRules } from './parser';
import { convertFilter } from './converter';

const fqpSequelize = (fqp: Parser) => {
  const extractedFilter = extractFilters(fqp);
  const filter = parseFilterToRules(extractedFilter);
  const validFilter = convertFilter(filter);

  return validFilter;
};

export default fqpSequelize;
