import * as React from 'react';
import { render } from 'react-dom';
import { Form, Field } from 'react-final-form';

const number300 = 300;
const number0 = 0;
const number2 = 2;
const number18 = 18;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values: any) => {
  await sleep(number300);
  window.alert(JSON.stringify(values));
};

const required = (value: any) => (value ? undefined : 'Required');
const mustBeNumber = (value: any) =>
  isNaN(value) ? 'Must be a number' : undefined;
const minValue = (min: any) => (value: any) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators = (...validators: Array<any>) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

/* export default (props: any)  => (
  <div>
    <h2>Login Form</h2>
    <Form
      onSubmit={onSubmit}
      render={({
        invalid,
        handleSubmit,
        reset,
        submitting,
        pristine,
        values,
      }) => (*/
export default (props: any) => {
  const { invalid, handleSubmit, reset, submitting, pristine, values } = props;
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({
          invalid,
          handleSubmit,
          reset,
          submitting,
          pristine,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="lastName" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Last Name</label>
                  <input {...input} type="text" placeholder="Last Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="age"
              validate={composeValidators(
                required,
                mustBeNumber,
                minValue(number18),
              )}
            >
              {({ input, meta }) => (
                <div>
                  <label>Age</label>
                  <input {...input} type="text" placeholder="Age" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit" disabled={invalid || submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values)}</pre>
          </form>
        )}
      />
    </div>
  );
};
