import { MongoError } from 'mongodb';
import mongoose from 'mongoose';

import config from './config';

const { user, pass, host, port, db_name } = config.mongo;

mongoose.connect(
  `mongodb://${user}:${pass}@${host}:${port}/${db_name}?authSource=admin`,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  (err: MongoError) => {
    if (err) throw err;
    console.log('Connected to mongoDB');
  }
);

export default mongoose;
