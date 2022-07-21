import { CONDITION, OPERATOR } from '../src/utils/constants';

// Contains the result of the test.
// Expectation:
//   It can parse single filter
export const SINGLE_FILTER = {
  [CONDITION.OR]: [
    {
      firstname: {
        [OPERATOR.CONTAINS]: `%f%`,
      },
    },
    {
      middlename: {
        [OPERATOR.CONTAINS]: `%f%`,
      },
    },
    {
      surname: {
        [OPERATOR.CONTAINS]: `%f%`,
      },
    },
  ],
};

//   It can parse multiple filter
export const MULTIPLE_FILTER = {
  [CONDITION.AND]: [
    {
      status: {
        '!=': 'deleted',
      },
    },
    SINGLE_FILTER,
  ],
};

//   It can parse nested filter
export const NESTED_FILTER = {
  [CONDITION.AND]: [
    {
      status: {
        '!=': 'deleted',
      },
    },
    {
      createdAt: {
        attribute: {
          args: [
            {
              col: 'createdAt',
            },
          ],
          fn: 'Date',
        },
        comparator: OPERATOR['>'],
        logic: '2020-01-01',
      },
    },
    SINGLE_FILTER,
  ],
};
