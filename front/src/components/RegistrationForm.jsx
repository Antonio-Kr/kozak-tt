import * as Yup from 'yup';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from "react-redux";

import { registrationUser } from '../redux/action';

const RegistrationForm = ({ registrationUser }) => {
  const initialValues = {
    login: '',
    email: '',
    password: '',
    consfirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Login is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required field'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Min length is 8 symbols')
      .max(16, 'Max length is 16 symbols'),
    consfirmPassword: Yup.string()
      .required('Consfirm password is required')
      .oneOf([Yup.ref('password'), null], 'Password must match'),
  });

  const onSubmit = (value) => {
    registrationUser(value)
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className='form'>
          <label htmlFor='login'>Login</label>
          <Field name='login' onChange={handleChange} value={values.login} />
          {touched.login && errors.login && (
            <div className='error'>{errors.login}</div>
          )}

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

          <label htmlFor='consfirmPassword'>Password Confirm</label>
          <Field
            name='consfirmPassword'
            type='password'
            onChange={handleChange}
            value={values.consfirmPassword}
          />
          {touched.consfirmPassword && errors.consfirmPassword && (
            <div className='error'>{errors.consfirmPassword}</div>
          )}

          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = {
  registrationUser,
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
