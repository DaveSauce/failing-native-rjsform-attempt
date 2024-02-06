import {RJSFSchema} from '@rjsf/utils';

export const helloWorldSchema: RJSFSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Hello World',
  type: 'object',
  properties: {
    foo: {
      type: 'string',
    },
    bar: {
      type: 'string',
    },
  },
};
