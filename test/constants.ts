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
    { ...SINGLE_FILTER },
    {
      status: {
        [OPERATOR['!=']]: 'deleted',
      },
    },
  ],
};

//   It can parse nested filter
export const NESTED_FILTER = {
  [CONDITION.AND]: [
    { ...SINGLE_FILTER },
    {
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

//   It can parse null filter
export const NULL_FILTER = {
  [CONDITION.AND]: [
    {
      username: {
        [OPERATOR['NULL']]: null,
      },
    },
  ],
};

//   It can parse not null filter
export const NOT_NULL_FILTER = {
  [CONDITION.AND]: [
    {
      username: {
        [OPERATOR['NOT NULL']]: null,
      },
    },
  ],
};

//   It can parse between filter
export const BETWEEN = {
  [CONDITION.AND]: [
    {
      id: {
        [OPERATOR.BETWEEN]: [1, 10],
      },
    },
  ],
};

export const NOT_BETWEEN = {
  [CONDITION.AND]: [
    {
      id: {
        [OPERATOR['NOT BETWEEN']]: [1, 10],
      },
    },
  ],
};

export const FILTERS = {
  SINGLE:
    'firstname contains "name" or middlename contains "name" or surname contains "name"',
  MULTIPLE:
    '(firstname contains "name" or middlename contains "name" or surname contains "name") and status != "deleted"',
  NESTED:
    '(firstname contains "name" or middlename contains "name" or surname contains "name") and status != "deleted" and createdAt > "2020-01-01"',
  NULL: 'username null',
  NOT_NULL: 'username not null',
  BETWEEN: 'id between (1,10)',
  NOT_BETWEEN: 'id not between (1,10)',
};
