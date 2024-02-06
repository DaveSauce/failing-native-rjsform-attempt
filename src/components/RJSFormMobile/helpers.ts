import { ErrorTransformer } from "@rjsf/utils";
import { OptionType } from "src/sharedTypes/types";

// Unfortunately, FormContextType is just [name: string]: any;, so we have to make some guesses about what the data will look like
export const stringEnumToFormOptions = (stringArray: (string | number)[]): OptionType[] => {
  return (
    stringArray?.map((option) => ({
			id: String(option),
			label: String(option),
		})) || []
  );
};

export const transformErrors: ErrorTransformer = (errors, uiSchemaErrors) => {
  return errors.map((error) => {
    const propertyKey = error.property?.split(".").pop();
    const customError = propertyKey && error?.name && uiSchemaErrors?.[propertyKey]?.["ui:errorMessages"]?.[error.name];
    if (customError) {
      error.message = customError;
    }
    return error;
  });
};
