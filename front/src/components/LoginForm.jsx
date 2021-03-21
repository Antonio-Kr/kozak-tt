import * as Yup from 'yup';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';

import { loginUser } from '../redux/action';

function LoginForm({ loginUser }) {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required field'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (value) => {
    loginUser(value);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className='form'>
          <label htmlFor='email'>Email Address</label>
          <Field
            name='email'
            type='email'
            onChange={handleChange}
            value={values.email}
          />
          {touched.email && errors.email && (
            <div className='error'>{errors.email}</div>
          )}

          <label htmlFor='password'>Password</label>
          <Field
            name='password'
            type='password'
            onChange={handleChange}
            value={values.password}
          />
          {touched.password && errors.password && (
            <div className='error'>{errors.password}</div>
          )}

          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default connect(null, { loginUser })(LoginForm);
