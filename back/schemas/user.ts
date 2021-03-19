import { IUser } from './../interfaces/user.interface';
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  login: {
    type: String,
    required: [true, 'Login is a required field'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is a required field'],
  },
});

userSchema.pre<IUser>('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
