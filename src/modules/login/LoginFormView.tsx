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

export default (props: any) => {
  const { loginUser, invalid, handleSubmit, reset, submitting, pristine, values } = props;
  const submitLoginUser = (values:any):void =>  {
    loginUser(values.email,values.password);
  };
  return (
    <div>
      <Form
        onSubmit={submitLoginUser}
        render={({
          invalid,
          handleSubmit,
          reset,
          submitting,
          pristine,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>E-mail</label>
                  <input {...input} type="text" placeholder="Email" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Password</label>
                  <input {...input} type="text" placeholder="password" />
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
          </form>
        )}
      />
    </div>
  );
};
