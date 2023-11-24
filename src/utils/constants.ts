import { Op } from 'sequelize';

export const OPERATOR: Record<string, symbol> = {
  '<': Op.lt,
  '<=': Op.lte,
  '>': Op.gt,
  '>=': Op.gte,
  '=': Op.eq,
  '!=': Op.ne,
  IN: Op.in,
  'NOT IN': Op.notIn,
  SW: Op.startsWith,
  'STARTS WITH': Op.startsWith,
  EW: Op.endsWith,
  'ENDS WITH': Op.endsWith,
  CONTAINS: Op.like,
  'CONTAINS %': Op.iLike,
  NULL: Op.is,
  'NOT NULL': Op.ne,
  'DOES NOT CONTAIN': Op.notLike,
  'DOES NOT CONTAIN %': Op.notILike,
  BETWEEN: Op.between,
  'NOT BETWEEN': Op.notBetween,
  'EXACTLY MATCHES': Op.eq,
};

export const CONDITION: Record<string, symbol> = {
  AND: Op.and,
  OR: Op.or,
};

export const POSSIBLE_DATE_FORMAT = [
  'yyyy-MM-dd',
  'yyyy-MM-ddTHH:mm:ss',
  'yyyy-MM-ddTHH:mm:ss.SSS',
  'yyyy-MM-ddTHH:mm:ss.SSSZ',
];
