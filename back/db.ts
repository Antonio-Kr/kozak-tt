import { MongoError } from 'mongodb'
import mongoose from 'mongoose'

import config from './config'

const { user, pass, host, port, db_name } = config.mongo

mongoose.connect(
  `mongodb://${user}:${pass}@${host}:${port}/${db_name}?authSource=admin`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err: MongoError) => {
    if (err) throw err
  }
)

export default mongoose
