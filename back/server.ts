import bodyParser from 'body-parser';
import express, { Express } from 'express'

import './db'
import employees from './routes/employees'
import users from './routes/users'

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use('/employees', employees)
app.use('/users', users)

app.listen(3001, () => console.log('started on http://localhost:3001/'))
