import { Sequelize } from 'sequelize';
import { CONDITION, OPERATOR } from '../src/utils/constants';

// Contains the result of the test.
// Expectation:
//   It can parse single filter
export const SINGLE_FILTER = {
  [CONDITION.OR]: [
    {
      firstname: {
        [OPERATOR['CONTAINS %']]: `%name%`,
      },
    },
    {
      middlename: {
        [OPERATOR['CONTAINS %']]: `%name%`,
      },
    },
    {
      surname: {
        [OPERATOR['CONTAINS %']]: `%name%`,
      },
    },
  ],
};

//   It can parse multiple filter
export const MULTIPLE_FILTER = {
  [CONDITION.AND]: [
    {
      status: {
        [OPERATOR['!=']]: 'deleted',
      },
      ...SINGLE_FILTER,
    },
  ],
};

//   It can parse nested filter
export const NESTED_FILTER = {
  [CONDITION.AND]: [
    {
      ...SINGLE_FILTER,
      [CONDITION.AND]: [
        {
          status: {
            [OPERATOR['!=']]: 'deleted',
          },
        },
        {
          createdAt: Sequelize.where(
            Sequelize.fn('Date', Sequelize.col('createdAt')),
            OPERATOR['>'] as unknown as string,
            '2020-01-01'
          ),
        },
      ],
    },
  ],
};

export const FILTERS = {
  SINGLE:
    'firstname contains "name" or middlename contains "name" or surname contains "name"',
  MULTIPLE:
    '(firstname contains "name" OR middlename contains "name" OR surname contains "name") AND status != "deleted"',
  NESTED:
    '(firstname contains "name" OR middlename contains "name" OR surname contains "name") AND status != "deleted" AND createdAt > "2020-01-01"',
};
