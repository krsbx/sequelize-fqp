import sequelizeFQP from '../src';
import { FILTERS, NESTED_FILTER, SINGLE_FILTER } from './constants';

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

  it.todo('It can parse multiple filter');

  it('It can parse nested filter', () => {
    const result = sequelizeFQP(FILTERS.NESTED);

    expect(result).toMatchObject<typeof NESTED_FILTER>(NESTED_FILTER);
  });
});
