import _ from 'lodash';
import { FQP } from 'filter-query-parser';
import parser from './utils/sequelizeFQP';
import { Options } from './utils/interface';

const sequelizeFQP = (filters: string, options: Options = {}) => {
  if (_.isEmpty(filters)) return {};

  const fqpParse = FQP.parser(filters);

  return parser(fqpParse, options);
};

export = sequelizeFQP;
