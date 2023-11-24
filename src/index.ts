import isEmpty from 'lodash.isempty';
import { FQP } from 'filter-query-parser';
import { Options } from './utils/interface';
import parser from './utils/sequelizeFQP';

const sequelizeFQP = (filters: string, options: Options = {}) => {
  if (isEmpty(filters)) return {};

  const fqpParse = FQP.parser(filters);

  return parser(fqpParse, options);
};

export = sequelizeFQP;
