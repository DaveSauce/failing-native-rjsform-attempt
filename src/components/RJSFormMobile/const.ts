import {Field, RegistryFieldsType, RegistryWidgetsType} from '@rjsf/utils';
import {CheckboxField, CheckboxWidget} from './fields/CheckboxField';
import {DateField, DateWidget} from './fields/DateField';
import {NumberField} from './fields/NumberField';
import {PhoneField} from './fields/PhoneField';
import {SelectField, SelectWidget} from './fields/SelectField';
import {TextField, TextWidget} from './fields/TextField';
import {RJSFormFields} from './types';

export const widgets: RegistryWidgetsType = {
  // CheckboxWidget,
  // DateWidget,
  // SelectWidget,
  TextWidget,
};

export const fields: RegistryFieldsType = {
  // Set fields by enum for defining with "ui:field"
  // [RJSFormFields.Checkbox as string]: CheckboxField as Field,
  // [RJSFormFields.Date as string]: DateField as Field,
  // [RJSFormFields.Number as string]: NumberField as Field,
  // [RJSFormFields.Phone as string]: PhoneField as Field,
  // [RJSFormFields.Select as string]: SelectField as Field,
  [RJSFormFields.Text as string]: TextField as Field,
  // Override default fields
  // NumberField: NumberField as Field,
};
