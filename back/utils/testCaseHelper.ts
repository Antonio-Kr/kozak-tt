import Employee from '../schemas/employee';
import User from '../schemas/user';

async function deleteUserByEmail(email: string) {
  await User.deleteOne({ email });
}

export { deleteUserByEmail };
