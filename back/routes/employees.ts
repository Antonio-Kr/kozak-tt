import express, { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import Employee from '../schemas/employee';
import config from '../config';

const router: Router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) throw new Error('Unauthorized');
    const [_, token]: any = req.headers.authorization?.split(' ');
    jwt.verify(token, config.jwt.secret);
    next();
  } catch (error) {
    next(error);
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

router.get('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params;
    const employee = await Employee.findOne({ _id });
    res.json(employee);
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
    res.json(employee);
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
