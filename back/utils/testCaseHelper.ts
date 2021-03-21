import Employee from '../schemas/employee';
import User from '../schemas/user';

async function deleteUserByEmail(email: string) {
  await User.deleteOne({ email });
}

async function deleteEmployeeByName(name: string) {
  await Employee.deleteMany({ name });
}

export { deleteUserByEmail, deleteEmployeeByName };
