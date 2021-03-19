import { IValidationError } from '../interfaces/validation-error.interface';

function ValidationError(error: any): Array<IValidationError> {
  let errors: Array<IValidationError> = [];

  Object.keys(error.errors).forEach((field) => {
    errors.push({
      field,
      message: error.errors[field].message,
      type: error.errors[field].properties.type,
    });
  });
  return errors;
}

function MongoError(error: any) {
  const key = Object.keys(error.keyPattern)[0];
  switch (error.code) {
    case 11000:
      return { message: `This ${key} "${error.keyValue[key]}" already taken` };
  }
}

function Error(error: any) {
  return error;
}

export default { ValidationError, MongoError, Error };
