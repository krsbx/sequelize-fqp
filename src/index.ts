import _ from 'lodash';
import { FQP } from 'filter-query-parser';
import parser from './utils/sequelizeFQP';

const sequelizeFQP = (filters: string) => {
  if (_.isEmpty(filters)) return {};

  const fqpParse = FQP.parser(filters);

  return parser(fqpParse);
};

export = sequelizeFQP;
