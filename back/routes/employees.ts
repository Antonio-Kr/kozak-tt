import express, { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import Employee from '../schemas/employee';
import config from '../config';

const { default: handlerError }: any = require('../utils/errorHandler');

const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  try {
    const [_, token]: any = req.headers.authorization?.split('');
    jwt.verify(token, config.jwt.secret);
    next();
  } catch (error) {
    const errKey = error.name || 'DefaultError';
    const status = errKey === 'DefaultError' ? 500 : 400;
    res.status(status).json(handlerError[errKey](error));
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: _id, ...employee } = req.body;
    await Employee.updateOne({ _id }, { $set: employee });
    res.json({ status: 'OK' });
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:employeeId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId } = req.params;
      await Employee.deleteOne({ _id: employeeId });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
