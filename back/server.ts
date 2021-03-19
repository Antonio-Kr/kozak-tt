import bodyParser from 'body-parser';
import express, { Express, NextFunction, Request, Response } from 'express';

import config from './config';
import './db';
import employees from './routes/employees';
import users from './routes/users';

const { default: handlerError }: any = require('./utils/errorHandler');

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/employees', employees);
app.use('/users', users);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const errKey = error.name || 'Error';
  const status = errKey === 'Error' ? 500 : 400;
  res.status(status).json(handlerError[errKey](error));
});

app.listen(config.app.port, () =>
  console.log(`started on http://localhost:${config.app.port}/`)
);

export default app;