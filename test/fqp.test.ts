import sequelizeFQP from '../src';
import {
  BETWEEN,
  FILTERS,
  MULTIPLE_FILTER,
  NESTED_FILTER,
  NOT_BETWEEN,
  NOT_NULL_FILTER,
  NULL_FILTER,
  SINGLE_FILTER,
} from './constants';

describe('Sequelize Filter Query Parser', () => {
  it('It can accept empty filter', () => {
    const filter = '';

    const result = sequelizeFQP(filter);

    expect(result).toEqual({});
  });

  it('It can parse single filter', () => {
    const result = sequelizeFQP(FILTERS.SINGLE);

    expect(result).toEqual(SINGLE_FILTER);
  });

  it('It can parse multiple filter', () => {
    const result = sequelizeFQP(FILTERS.MULTIPLE);

    expect(result).toEqual(MULTIPLE_FILTER);
  });

  it('It can parse nested filter', () => {
    const result = sequelizeFQP(FILTERS.NESTED);

    expect(result).toEqual(NESTED_FILTER);
  });

  it('It can parse null filter', () => {
    const result = sequelizeFQP(FILTERS.NULL);

    expect(result).toEqual(NULL_FILTER);
  });

  it('It can parse not null filter', () => {
    const result = sequelizeFQP(FILTERS.NOT_NULL);

    expect(result).toEqual(NOT_NULL_FILTER);
  });

  it('It can parse between filter', () => {
    const result = sequelizeFQP(FILTERS.BETWEEN);

    expect(result).toEqual(BETWEEN);
  });

  it('It can parse not between filter', () => {
    const result = sequelizeFQP(FILTERS.NOT_BETWEEN);

    expect(result).toEqual(NOT_BETWEEN);
  });
});
