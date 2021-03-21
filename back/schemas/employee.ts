import mongoose, { Schema } from 'mongoose';

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required field'],
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Sex is required field'],
    },
    contactInfo: {
      type: String,
      required: [true, 'Contact info is required field'],
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required field'],
      min: [100, 'Salary should be at least 100 points'],
    },
    position: {
      type: String,
      required: [true, 'Job position is required field'],
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
