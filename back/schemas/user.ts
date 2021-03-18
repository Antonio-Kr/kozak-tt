import { IUser } from './../interfaces/user.interface'
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { Document } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.pre<IUser>('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10)
  }
  next()
})

const User = mongoose.model('User', userSchema)

export default User
