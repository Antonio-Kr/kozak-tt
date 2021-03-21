import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

function AddEditFromEmployees() {
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
}
