import _ from 'lodash';
import { CONDITION } from './constants';

export const checkIsNested = (keys: string[]) =>
  _.intersection(keys, _.keys(CONDITION)).length > 1;
