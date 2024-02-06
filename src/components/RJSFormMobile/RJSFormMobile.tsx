import React, {FC} from 'react';
import Form from 'react-native-web-jsonschema-form';

import {RJSFormType} from './types';
import {fields, widgets} from './const';
import {StyleHack} from './RJSFormStyles';
import {PrimaryButton} from '../Button';
import {noop} from 'src/helpers/utils';
import {transformErrors} from './helpers';
import {ArrayFieldTemplate} from './fields/ArrayField';

const DEFAULT_SUBMIT_BUTTON_TEXT = 'Submit';

export const RJSForm: FC<RJSFormType> = props => {
  const {
    children,
    schema,
    submitButtonText = DEFAULT_SUBMIT_BUTTON_TEXT,
    templates,
    transformErrors: parentTransformErrors,
    uiSchema,
  } = props;

  const uiSchemaWithDefaults = {
    'ui:rootFieldId': 'cerebellum_rjsform',
    ...uiSchema,
  };
  const templatesWithDefaults = {
    ArrayFieldTemplate: ArrayFieldTemplate,
    ...templates,
  };

  return schema ? (
    <Form
      {...props}
      templates={templatesWithDefaults}
      // NOTE: possibly needed for validateOnBlur. Allow extraErrors to be passed to RJSForm
      // extraErrors={customErrorSchema}
      // extraErrorsBlockSubmit // is this depricated?
      fields={fields}
      focusOnFirstError
      noHtml5Validate
      schema={schema}
      showErrorList={false}
      transformErrors={parentTransformErrors || transformErrors}
      uiSchema={uiSchemaWithDefaults}
      // validator={validator}
      widgets={widgets}>
      {children}
      {/* {children || <PrimaryButton buttonType="submit" onClick={noop} text={submitButtonText} />} */}
    </Form>
  ) : null;
};

RJSForm.defaultProps = {
  submitButtonText: DEFAULT_SUBMIT_BUTTON_TEXT,
};
