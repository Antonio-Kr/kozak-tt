import { MongoError } from 'mongodb'
import mongoose from 'mongoose'

mongoose.connect(
  'mongodb://root:1234@127.0.0.1:27018/',
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  (err: MongoError) => {
    if (err) throw err
    console.log('Connected to mongoDB')
  }
)

export default mongoose
