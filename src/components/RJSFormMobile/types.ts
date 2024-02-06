import {FormProps} from '@rjsf/core';
import {UiSchema} from '@rjsf/utils';
import {KeyboardEvent, MouseEvent} from 'react';
import {
  CheckboxFieldUiSchemaOptions,
  DateFieldUiSchemaOptions,
  NumberFieldUiSchemaOptions,
  PhoneFieldUiSchemaOptions,
  SelectFieldUiSchemaOptions,
  TextFieldUiSchemaOptions,
} from './fields';

export interface RJSFormType extends Omit<FormProps, 'schema' | 'validator'> {
  /** The JSON schema object for the form. While not required, this component is useless without it */
  schema?: FormProps['schema'];
  /** The submit button text. This will be overridden if you provide children */
  submitButtonText?: string;
  /** The uiSchema that describes how the schema should be viewed. Each field requires a "ui:field" value, which accepts a value from RJSFormFields */
  uiSchema?: RJSFormUiSchema;
  /** An optional implementation of the `ValidatorType` interface. RJSForm uses a custom yup validator by default */
  validator?: FormProps['validator'];
  // TODO: install this
  // /** Runs the validation each time a field is blurred */
  // valiateOnBlur?: boolean;
}

export enum RJSFormFields {
  Array = 'Array',
  Checkbox = 'Checkbox',
  Date = 'Date',
  Number = 'Number',
  Phone = 'Phone',
  Select = 'Select',
  Text = 'Text',
}

export interface UIErrorMessages {
  pattern?: string;
  required?: string;
}

export type RJSFormUiSchemaField =
  | TextFieldUiSchemaOptions
  | SelectFieldUiSchemaOptions
  | DateFieldUiSchemaOptions
  | CheckboxFieldUiSchemaOptions
  | NumberFieldUiSchemaOptions
  | PhoneFieldUiSchemaOptions;

export type RJSFormUiSchema = Pick<
  UiSchema,
  'ui:globalOptions' | 'ui:rootFieldId' | 'ui:fieldReplacesAnyOrOneOf'
> & {
  [k: string]: RJSFormUiSchemaField | string[] | undefined;
  'ui:order'?: string[];
};

export interface HandleRemoveProps {
  event: KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>;
  index: number;
}
