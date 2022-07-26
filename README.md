# Sequelize Filter Query Parser

Filter Query Parser for Sequelize ORM

Using [filter-query-parser](https://github.com/VJD7/filter-query-parser/) as the base

# How To Use

1. Create a new Middleware that can be use for all routes e.g. `parserMw`

- Javascript

```js
// Files :  parser.js

const sequelizeFQP = require('sequelize-filter-query-parser');

exports.queryParserMw = (req, res, next) => {
  req.filterQueryParams = req.query.filters
    ? sequelizeFQP(req.query.filters)
    : {};
  next();
};
```

- Typescript

```ts
// Files :  parser.js

import sequelizeFQP from 'sequelize-filter-query-parser';

export const queryParserMw = (req, res, next) => {
  req.filterQueryParams = req.query.filters
    ? sequelizeFQP(req.query.filters)
    : {};
  next();
};
```

2. Use FQP Results in baseRepository

- Javascript

```js
// Files : baseRepository.js

exports.findAll =
  (model) =>
  (conditions, filterQueryParams = {}, options = {}) => {
    /* {...} */

    const rules = [{ ...filterQueryParams }];

    /* {...} */

    const where = { ...conditions };

    if (where[Op.and]) {
      where[Op.and] = [...where[Op.and], ...rules];
    } else {
      where[Op.and] = rules;
    }

    /* {...} */
  };
```

- Typescript

```ts
// Files : baseRepository.ts

export const findAll =
  (model) =>
  (conditions, filterQueryParams = {}, options = {}) => {
    /* {...} */

    const rules = [{ ...filterQueryParams }];

    /* {...} */

    const where = { ...conditions };

    if (where[Op.and]) {
      where[Op.and] = [...where[Op.and], ...rules];
    } else {
      where[Op.and] = rules;
    }

    /* {...} */
  };
```
