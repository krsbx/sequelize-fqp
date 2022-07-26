import sequelizeFQP from '../src';
import {
  FILTERS,
  MULTIPLE_FILTER,
  NESTED_FILTER,
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
});
