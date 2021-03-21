import userLogin from './user-login.test';
import userRegister from './user-register.test';
import emplyees from './employee.test';

describe('Begin of all tests', () => {
  userRegister();
  userLogin();
  emplyees();
});
