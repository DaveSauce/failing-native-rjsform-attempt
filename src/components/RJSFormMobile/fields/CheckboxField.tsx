import React from "react";
import { ErrorSchema, FieldProps, IdSchema, RJSFSchema, Widget } from "@rjsf/utils";
import { CheckboxItem, CheckboxItemType } from "src/components/CheckboxItem";
import { FieldBox } from "../RJSFormStyles";
import { RJSFormFields, UIErrorMessages } from "../types";

export type CheckboxOptions = Omit<
  CheckboxItemType,
  "active" | "autofocus" | "disabled" | "id" | "label" | "name" | "onClick" | "onBlur" | "onFocus" | "value"
>;
export type CheckboxFieldUiSchemaOptions = {
  "ui:options"?: CheckboxOptions;
  "ui:field": RJSFormFields.Checkbox;
  "ui:errorMessages"?: UIErrorMessages;
};

type CheckboxFieldProps =
  | FieldProps & {
      errorSchema?: ErrorSchema;
      formData?: any;
      idSchema: IdSchema;
      idSeparator?: string;
      uiSchema?: CheckboxFieldUiSchemaOptions;
    };

// This is a wrapper component to convert the types from the widget to be used with the field types
export const CheckboxWidget: Widget<any, RJSFSchema, any> = (props) => {
  const { id, value, disabled = false, readonly = false, uiSchema, ...rest } = props;

  const idSchema: IdSchema = { $id: id } as IdSchema;

  const checkboxFieldProps: CheckboxFieldProps = {
    idSchema,
    formData: value,
    disabled,
    readonly,
    uiSchema: uiSchema as CheckboxFieldUiSchemaOptions,
    ...rest,
  };

  return <CheckboxField {...checkboxFieldProps} />;
};

export const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
  const {
    autofocus,
    disabled,
    // formContext,
    formData, // Specific to Field
    // hideError,
    // hideLabel,
    idSchema, // Specific to Field
    label,
    // multiple, // Doesn't apply to CheckboxItem
    name,
    onBlur,
    onChange,
    onFocus,
    // options,
    // placeholder, // Doesn't apply to CheckboxItem
    // rawErrors,
    // readonly, // Not supporting this for now. Need to add style updates to CheckboxItem if we do.
    // registry,
    // required, // Doesn't apply to CheckboxItem
    schema,
    uiSchema,
  } = props;
  const id = idSchema.$id;

  const ui = uiSchema?.["ui:options"] || {};

  return (
    <FieldBox>
      <CheckboxItem
        active={!!formData}
        autofocus={autofocus}
        disabled={disabled}
        id={id}
        label={label || schema.title || name}
        name={name}
        onClick={(event) => onChange(event.target.checked)}
        onBlur={() => onBlur(id, formData)}
        onFocus={() => onFocus(id, formData)}
        value={formData}
        // uiSchema options
        checkColor={ui.checkColor}
        activeColor={ui.activeColor}
        center={ui.center}
        checkboxSize={ui.checkboxSize}
        disabledColor={ui.disabledColor}
        disabledColorLight={ui.disabledColorLight}
        disabledLabelColor={ui.disabledLabelColor}
        focusedColor={ui.focusedColor}
        inactiveColor={ui.inactiveColor}
        labelColor={ui.labelColor}
        maxLabelWidth={ui.maxLabelWidth}
        wrapText={ui.wrapText}
        breakText={ui.breakText}
      />
    </FieldBox>
  );
};
