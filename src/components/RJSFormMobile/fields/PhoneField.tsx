import React from "react";
import { FieldProps, ErrorSchema } from "@rjsf/utils";
import { PhoneInput, PhoneInputType } from "src/components/PhoneInput";
import { FieldBox } from "./../RJSFormStyles";
import { RJSFormFields, UIErrorMessages } from "../types";

export type PhoneOptions = Omit<
  PhoneInputType,
  | "autofocus"
  | "disabled"
  | "helperText"
  | "id"
  | "inputLabel"
  | "name"
  | "onChange"
  | "onInputBlur"
  | "onInputFocus"
  | "onValueChange"
  | "required"
  | "showValidationMessage"
  | "validationMessage"
  | "value"
>;
export type PhoneFieldUiSchemaOptions = {
  "ui:options"?: PhoneOptions;
  "ui:field": RJSFormFields.Phone;
  "ui:errorMessages"?: UIErrorMessages;
};

export const PhoneField: React.FC<FieldProps & { uiSchema?: PhoneFieldUiSchemaOptions }> = (props) => {
  const {
    autofocus,
    disabled,
    fieldValue,
    // formContext,
    formData,
    // hideError,
    idSchema,
    name,
    onBlur,
    onChange,
    onFocus,
    rawErrors,
    // readonly, // Not supporting this for now. Need to add style updates to Input if we do.
    // registry,
    required,
    schema,
    uiSchema,
    // errorSchema,
    // idSeparator,
  } = props;
  const id = idSchema.$id;
  const ui = uiSchema?.["ui:options"] || {};

  const handleChange = (value: string) => {
    const errors: ErrorSchema<any> = {};
    onChange(value, errors, id);
  };

  return (
    <FieldBox>
      <PhoneInput
        autofocus={autofocus}
        disabled={disabled}
        helperText={schema.description}
        id={id}
        inputLabel={schema.title || name}
        name={name}
        onInputBlur={() => onBlur(id, fieldValue)}
        onInputFocus={() => onFocus(id, fieldValue)}
        onValueChange={handleChange}
        required={required}
        showValidationMessage={!!rawErrors?.[0]}
        validationMessage={rawErrors?.[0]}
        value={formData}
        // uiSchema features
        activeBackgroundColor={ui.activeBackgroundColor}
        activeBorderColor={ui.activeBorderColor}
        activeColor={ui.activeColor}
        asteriskColor={ui.asteriskColor}
        characterLimit={ui.characterLimit}
        clearButton={ui.clearButton}
        clearButtonOffset={ui.clearButtonOffset}
        clickable={ui.clickable}
        disabledBorderColor={ui.disabledBorderColor}
        disabledColor={ui.disabledColor}
        failColor={ui.failColor}
        failColorSecondary={ui.failColorSecondary}
        focus={ui.focus}
        helperTextColor={ui.helperTextColor}
        hoverBorderColor={ui.hoverBorderColor}
        iconColor={ui.iconColor}
        inactiveBorderColor={ui.inactiveBorderColor}
        innerRef={ui.innerRef}
        inputBackgroundColor={ui.inputBackgroundColor}
        inputBorderRadius={ui.inputBorderRadius}
        inputHeight={ui.inputHeight}
        inputMode={ui.inputMode}
        inputWidth={ui.inputWidth}
        labelColor={ui.labelColor}
        lookLikeAButton={ui.lookLikeAButton}
        maskOverride={ui.maskOverride}
        noAutocomplete={ui.noAutocomplete}
        noMinWidth={ui.noMinWidth}
        onEnter={ui.onEnter}
        placeholder={ui.placeholder}
        placeholderColor={ui.placeholderColor}
        region={ui.region}
        showIcon={ui.showIcon}
        sidePadding={ui.sidePadding}
        textColor={ui.textColor}
        textFontSize={ui.textFontSize}
        theme={ui.theme}
        trailingIconRight={ui.trailingIconRight}
      />
    </FieldBox>
  );
};
