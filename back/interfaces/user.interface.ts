import { Document } from 'mongoose';

export interface IUser extends Document {
  login: string;
  email: string;
  password: string;
}
