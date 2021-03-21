import { Button, DialogActions, DialogContent } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import * as Yup from 'yup';

function EmployeeDialog({
  open,
  handleClose,
  id,
  initialValues = {
    name: '',
    sex: '',
    contactInfo: '',
    salary: '',
    position: '',
    birthday: '',
  },
}) {
    
  const initialValues = {
    name: '',
    sex: '',
    contactInfo: '',
    salary: '',
    position: '',
    birthday: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    sex: Yup.string()
      .required('sex is required field')
      .oneOf(['male', 'female'], 'Should be male/female'),
    contactInfo: Yup.string().required('Contact info is required'),
    salary: Yup.number()
      .required('Salary is required')
      .min(100, 'Should be greater than 100'),
    position: Yup.string().required('Position is required'),
    birthday: Yup.date().required('Date is required'),
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className='form'>
              <label htmlFor='name'>name</label>
              <Field name='name' onChange={handleChange} value={values.name} />
              {touched.name && errors.name && (
                <div className='error'>{errors.name}</div>
              )}

              <label htmlFor='sex'></label>
              <Field name='sex' onChange={handleChange} value={values.sex} />
              {touched.sex && errors.sex && (
                <div className='error'>{errors.sex}</div>
              )}

              <label htmlFor='contactInfo'>contactInfo</label>
              <Field
                name='contactInfo'
                type='contactInfo'
                onChange={handleChange}
                value={values.contactInfo}
              />
              {touched.contactInfo && errors.contactInfo && (
                <div className='error'>{errors.contactInfo}</div>
              )}

              <label htmlFor='salary'>salary</label>
              <Field
                name='salary'
                onChange={handleChange}
                value={values.salary}
              />
              {touched.salary && errors.salary && (
                <div className='error'>{errors.salary}</div>
              )}

              <label htmlFor='position'>position</label>
              <Field
                name='position'
                onChange={handleChange}
                value={values.position}
              />
              {touched.position && errors.position && (
                <div className='error'>{errors.position}</div>
              )}

              <label htmlFor='position'>position</label>
              <Field
                name='position'
                onChange={handleChange}
                value={values.position}
              />
              {touched.position && errors.position && (
                <div className='error'>{errors.position}</div>
              )}

              <button type='submit'>Submit</button>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
