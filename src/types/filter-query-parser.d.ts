declare module 'filter-query-parser' {
  export type Rule = {
    field: string;
    operator: string;
    value: string | number | symbol | boolean | null;
  };

  export type Query = Rule & {
    condition: string;
    not: boolean;
  };

  export type Parser = {
    condition: string;
    rules: (Rule | Query)[];
    not: false;
  };

  export const FQP = {
    parse: () => any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    stringify: (obj: Parser, customField: string) => string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parser: (query: string) => Parser,
  };
}