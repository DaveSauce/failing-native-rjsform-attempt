import React from "react";
import { ErrorSchema, FieldProps, IdSchema, RJSFSchema, Widget } from "@rjsf/utils";
import { DatePicker, DatePickerType, InlineDatePicker } from "src/components/DatePicker";
import { FieldBox } from "../RJSFormStyles";
import dayjs from "dayjs";
import { RJSFormFields, UIErrorMessages } from "../types";

export type DateOptions = Omit<
  DatePickerType,
  | "helperText"
  | "inputLabel"
  | "required"
  | "validationMessage"
  | "disabled"
  | "id"
  | "name"
  | "onBlur"
  | "onChange"
  | "onFocus"
  | "placeholderText"
  | "showValidationMessage"
  | "selectedDate"
  | "validationMessage"
>;
export type DateFieldUiSchemaOptions = {
  "ui:options"?: DateOptions;
  "ui:field": RJSFormFields.Date;
  "ui:errorMessages"?: UIErrorMessages;
};

// We need a combination type so we can support Field and Widget props
type DateFieldProps =
  | FieldProps & {
      errorSchema?: ErrorSchema;
      formData?: any;
      idSchema: IdSchema;
      idSeparator?: string;
      uiSchema?: DateFieldUiSchemaOptions;
    };

// This is a wrapper component to convert the types from the widget to be used with the field types
export const DateWidget: Widget<any, RJSFSchema, any> = (props) => {
  const { id, value, disabled = false, readonly = false, uiSchema, ...rest } = props;

  const idSchema: IdSchema = { $id: id } as IdSchema;

  const dateFieldProps: DateFieldProps = {
    idSchema,
    formData: value,
    disabled,
    readonly,
    uiSchema: uiSchema as DateFieldUiSchemaOptions,
    ...rest,
  };

  return <DateField {...dateFieldProps} />;
};

export const DateField: React.FC<DateFieldProps> = (props) => {
  const {
    // autofocus,
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
    // readonly, // Not supporting this for now. Need to add style updates to Input if we do.
    // registry,
    required,
    schema,
    uiSchema,
  } = props;
  const id = idSchema.$id;

  const DatePickerComponent = hideLabel ? InlineDatePicker : DatePicker;
  const ui = uiSchema?.["ui:options"] || {};

  const handleDateChange: (date: number | null, event?: React.SyntheticEvent<any>) => void = (date) => {
    // TODO: populate this with the appropriate ErrorSchema if required
    const errors: ErrorSchema<any> = {};

    if (date !== null) {
      const stringDate = dayjs.unix(date).format(ui.dateFormat || "MM/DD/YYYY");
      onChange(stringDate, errors, id);
    } else {
      onChange(null, errors, id);
    }
  };

  return (
    <FieldBox>
      <DatePickerComponent
        // autoFocus={autofocus}
        disabled={disabled}
        {...(hideLabel ? {} : { helperText: schema.description })}
        id={id}
        {...(hideLabel ? {} : { inputLabel: label || schema.title || name })}
        name={name}
        onChange={handleDateChange}
        onBlur={() => onBlur(id, formData)}
        onFocus={() => onFocus(id, formData)}
        placeholderText={placeholder}
        {...(hideLabel ? {} : { required: required })}
        selectedDate={formData}
        showValidationMessage={!!rawErrors?.[0]}
        {...(hideLabel ? {} : { validationMessage: rawErrors?.[0] })}
        // uiSchema options
        activeBorderColor={ui.activeBorderColor}
        activeIconColor={ui.activeIconColor}
        {...(hideLabel ? {} : { asteriskColor: ui.asteriskColor })}
        calendarHeaderColor={ui.calendarHeaderColor}
        clearButton={ui.clearButton}
        dateFormat={ui.dateFormat}
        disabledColor={ui.disabledColor}
        failColor={ui.failColor}
        focus={ui.focus}
        {...(hideLabel ? {} : { helperTextColor: ui.helperTextColor })}
        hideIcon={ui.hideIcon}
        inactiveBorderColor={ui.inactiveBorderColor}
        inactiveIconColor={ui.inactiveIconColor}
        inputHeight={ui.inputHeight}
        inputWidth={ui.inputWidth}
        {...(hideLabel ? {} : { labelColor: ui.labelColor })}
        maxDateUnix={ui.maxDateUnix}
        minDateUnix={ui.minDateUnix}
        placeholderColor={ui.placeholderColor}
        selectedDateColor={ui.selectedDateColor}
        textColor={ui.textColor}
        textFontSize={ui.textFontSize}
        theme={ui.theme}
        yearOptionBegin={ui.yearOptionBegin}
        yearOptionEnd={ui.yearOptionEnd}
      />
    </FieldBox>
  );
};
