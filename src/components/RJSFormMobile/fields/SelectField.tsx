// SelectWidget supports enum: String[]. oneOf: Object[] will be supported in a separate component

import React, { useEffect, useState } from "react";
import { ErrorSchema, FieldProps, IdSchema, RJSFSchema, Widget } from "@rjsf/utils";
import { DropdownInput, DropdownInputType } from "src/configuredComponents/DropdownInput";
import { FieldBox } from "../RJSFormStyles";
import { stringEnumToFormOptions } from "../helpers";
import { RJSFormFields, UIErrorMessages } from "../types";
import { OptionType } from "src/sharedTypes/types";

export type SelectOptions = Omit<
  DropdownInputType,
  | "autofocus"
  | "disabled"
  | "helperText"
  | "idField"
  | "inline"
  | "inputLabel"
  | "name"
  | "onInputBlur"
  | "onInputFocus"
  | "onSelect"
  | "options"
  | "placeholder"
  | "required"
  | "showValidationMessage"
  | "validationMessage"
  | "value"
>;
export type SelectFieldUiSchemaOptions = {
  "ui:options"?: SelectOptions;
  "ui:field": RJSFormFields.Select;
  "ui:errorMessages"?: UIErrorMessages;
};

// We need a combination type so we can support Field and Widget props
type SelectFieldProps =
  | FieldProps & {
      errorSchema?: ErrorSchema;
      formData?: any;
      idSchema: IdSchema;
      idSeparator?: string;
      uiSchema?: SelectFieldUiSchemaOptions;
    };

// This is a wrapper component to convert the types from the widget to be used with the field types
export const SelectWidget: Widget<any, RJSFSchema, any> = (props) => {
  const { id, value, disabled = false, readonly = false, uiSchema, ...rest } = props;

  const idSchema: IdSchema = { $id: id } as IdSchema;

  const checkboxFieldProps: SelectFieldProps = {
    idSchema,
    formData: value,
    disabled,
    readonly,
    uiSchema: uiSchema as SelectFieldUiSchemaOptions,
    ...rest,
  };

  return <SelectField {...checkboxFieldProps} />;
};

export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const {
    autofocus,
    disabled,
    // formContext,
    formData, // Specific to Field
    // hideError,
    hideLabel,
    idSchema, // Specific to Field
    label,
    // multiple, // Doesn't apply to Input
    name,
    onBlur,
    onChange,
    onFocus,
    // options,
    placeholder,
    rawErrors,
    // readonly, // Not supporting this for now. Need to add style updates to InputButton if we do.
    // registry,
    required,
    schema,
    uiSchema,
  } = props;
  const [formattedOptions, setFormattedOptions] = useState<OptionType[]>([]);
  const id = idSchema.$id;

  const ui = uiSchema?.["ui:options"] || {};

  useEffect(() => {
    // Filter only strings and numbers from the enum, and then pass to stringEnumToFormOptions
    const validEnumValues = (schema.enum || []).filter(
      (enumValue): enumValue is string | number => typeof enumValue === "string" || typeof enumValue === "number"
    );
    setFormattedOptions(stringEnumToFormOptions(validEnumValues));
  }, [schema, setFormattedOptions]);

  return (
    <FieldBox>
      <DropdownInput
        autofocus={autofocus}
        disabled={disabled}
        helperText={schema.description}
        idField={id}
        inline={hideLabel}
        inputLabel={label || schema.title || name}
        name={name}
        onInputBlur={(option) => onBlur(option?.[id], formData)}
        onInputFocus={() => onFocus(id, formData)}
        onSelect={(option) => onChange(option?.id)}
        options={formattedOptions}
        placeholder={placeholder}
        required={required}
        showValidationMessage={!!rawErrors?.[0]}
        validationMessage={rawErrors?.[0]}
        value={formData}
        // uiSchema options
        activeBorderColor={ui.activeBorderColor}
        activeColor={ui.activeColor}
        altSearchStyle={ui.altSearchStyle}
        asteriskColor={ui.asteriskColor}
        bottomButtonClick={ui.bottomButtonClick}
        BottomButtonIcon={ui.BottomButtonIcon}
        bottomButtonLabel={ui.bottomButtonLabel}
        defaultId={ui.defaultId}
        defaultOpen={ui.defaultOpen}
        disabledBorderColor={ui.disabledBorderColor}
        disabledColor={ui.disabledColor}
        failColor={ui.failColor}
        failColorSecondary={ui.failColorSecondary}
        focus={ui.focus}
        headerFunction={ui.headerFunction}
        headerFunctionLabel={ui.headerFunctionLabel}
        headerTitle={ui.headerTitle}
        helperTextColor={ui.helperTextColor}
        hideCaret={ui.hideCaret}
        hideSearch={ui.hideSearch}
        hoverBorderColor={ui.hoverBorderColor}
        inactiveBorderColor={ui.inactiveBorderColor}
        innerSearch={ui.innerSearch}
        inputBackgroundColor={ui.inputBackgroundColor}
        inputHeight={ui.inputHeight}
        inputWidth={ui.inputWidth}
        labelColor={ui.labelColor}
        labelField={ui.labelField}
        LeadingIcon={ui.LeadingIcon}
        leadingIconColor={ui.leadingIconColor}
        maxMenuHeight={ui.maxMenuHeight}
        menuVerticalPadding={ui.menuVerticalPadding}
        menuWidth={ui.menuWidth}
        observeScrollRef={ui.observeScrollRef}
        onAutofill={ui.onAutofill}
        onClick={ui.onClick}
        openUp={ui.openUp}
        placeholderColor={ui.placeholderColor}
        preventDeselect={ui.preventDeselect}
        renderOptionLabel={ui.renderOptionLabel}
        showSearchThreshold={ui.showSearchThreshold}
        sidePadding={ui.sidePadding}
        stayOpen={ui.stayOpen}
        textColor={ui.textColor}
        textFontSize={ui.textFontSize}
        theme={ui.theme}
        TrailingIcon={ui.TrailingIcon}
        trailingIconColor={ui.trailingIconColor}
        wrapText={ui.wrapText}
      />
    </FieldBox>
  );
};
