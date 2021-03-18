import mongoose, { Schema } from 'mongoose'

const employeeSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 100,
    },
    position: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee