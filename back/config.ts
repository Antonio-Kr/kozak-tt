import dotenv from 'dotenv';
dotenv.config();

export default {
  mongo: {
    user: process.env.MONGO_USER || 'root',
    pass: process.env.MONGO_PASS || '1234',
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || '27018',
    db_name: process.env.MONGO_DB_NAME || 'kozak',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'hello',
  },
  app: {
    port: process.env.APP_PORT || 3001,
  },
};
