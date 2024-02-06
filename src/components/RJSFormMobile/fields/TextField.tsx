import React from 'react';
import {
  ErrorSchema,
  FieldProps,
  IdSchema,
  RJSFSchema,
  Widget,
} from '@rjsf/utils';
import {Input} from './../../Input';
// import {InlineInput} from 'src/components/InlineInput';
import {FieldBox} from '../RJSFormStyles';
import {RJSFormFields, UIErrorMessages} from '../types';

export type TextOptions = Omit<
  InputType,
  | 'autofocus'
  | 'disabled'
  | 'helperText'
  | 'id'
  | 'inputLabel'
  | 'name'
  | 'onChange'
  | 'onInputBlur'
  | 'onInputFocus'
  | 'onValueChange'
  | 'placeholder'
  | 'required'
  | 'showValidationMessage'
  | 'validationMessage'
  | 'value'
>;
export type TextFieldUiSchemaOptions = {
  'ui:options'?: TextOptions;
  'ui:field': RJSFormFields.Text;
  'ui:errorMessages'?: UIErrorMessages;
};

// We need a combination type so we can support Field and Widget props
type TextFieldProps =
  | FieldProps & {
      errorSchema?: ErrorSchema;
      formData?: any;
      idSchema: IdSchema;
      idSeparator?: string;
      uiSchema?: TextFieldUiSchemaOptions;
    };

// This is a wrapper component to convert the types from the widget to be used with the field types
export const TextWidget: Widget<any, RJSFSchema, any> = props => {
  const {
    id,
    value,
    disabled = false,
    readonly = false,
    uiSchema,
    ...rest
  } = props;

  const idSchema: IdSchema = {$id: id} as IdSchema;

  const checkboxFieldProps: TextFieldProps = {
    idSchema,
    formData: value,
    disabled,
    readonly,
    uiSchema: uiSchema as TextFieldUiSchemaOptions,
    ...rest,
  };

  return <TextField {...checkboxFieldProps} />;
};

export const TextField: React.FC<TextFieldProps> = props => {
  const {
    autofocus,
    disabled,
    // formContext,
    formData, // Specific to Field
    // hideError,
    hideLabel,
    idSchema, // Specific to Field
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    // options,
    placeholder,
    rawErrors,
    // readonly, // Not supporting this for now. Need to add style updates to Input if we do.
    // registry,
    required,
    schema,
    uiSchema,
  } = props;
  const id = idSchema.$id;

  // const InputComponent = hideLabel ? InlineInput : Input;
  const ui = uiSchema?.['ui:options'] || {};

  return (
    <FieldBox>
      <Input onChange={onChange} placeholder={placeholder} value={formData} />
      {/* <InputComponent
        autofocus={autofocus}
        disabled={disabled}
        {...(hideLabel ? {} : {helperText: schema.description})}
        id={id}
        inputLabel={label || schema.title || name}
        name={name}
        onInputBlur={() => onBlur(id, formData)}
        onInputFocus={() => onFocus(id, formData)}
        onValueChange={onChange}
        placeholder={placeholder}
        required={required}
        showValidationMessage={!!rawErrors?.[0]}
        {...(hideLabel ? {} : {validationMessage: rawErrors?.[0]})}
        value={formData}
        // uiSchema features
        activeBackgroundColor={ui.activeBackgroundColor}
        activeBorderColor={ui.activeBorderColor}
        activeColor={ui.activeColor}
        {...(hideLabel ? {} : {asteriskColor: ui.asteriskColor})}
        characterLimit={ui.characterLimit}
        clearButton={ui.clearButton}
        clearButtonOffset={ui.clearButtonOffset}
        clickable={ui.clickable}
        disabledBorderColor={ui.disabledBorderColor}
        disabledColor={ui.disabledColor}
        failColor={ui.failColor}
        failColorSecondary={ui.failColorSecondary}
        focus={ui.focus}
        {...(hideLabel ? {} : {helperTextColor: ui.helperTextColor})}
        hoverBorderColor={ui.hoverBorderColor}
        inactiveBorderColor={ui.inactiveBorderColor}
        innerRef={ui.innerRef}
        inputBackgroundColor={ui.inputBackgroundColor}
        inputBorderRadius={ui.inputBorderRadius}
        inputHeight={ui.inputHeight}
        inputMode={ui.inputMode}
        inputWidth={ui.inputWidth}
        {...(hideLabel ? {} : {labelColor: ui.labelColor})}
        LeadingIcon={ui.LeadingIcon}
        leadingIconColor={ui.leadingIconColor}
        lookLikeAButton={ui.lookLikeAButton}
        noAutocomplete={ui.noAutocomplete}
        noMinWidth={ui.noMinWidth}
        numberArrows={ui.numberArrows}
        onClick={ui.onClick}
        onEnter={ui.onEnter}
        placeholderColor={ui.placeholderColor}
        sidePadding={ui.sidePadding}
        step={ui.step}
        textColor={ui.textColor}
        textFontSize={ui.textFontSize}
        theme={ui.theme}
        TrailingIcon={ui.TrailingIcon}
        trailingIconColor={ui.trailingIconColor}
        trailingIconFunction={ui.trailingIconFunction}
        trailingIconRight={ui.trailingIconRight}
        trailingText={ui.trailingText}
        trailingTextColor={ui.trailingTextColor}
        type={ui.type}
      /> */}
    </FieldBox>
  );
};
