import express, { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../schemas/user';
import config from '../config';
import { IUser } from '../interfaces/user.interface';

const router: Router = express.Router();

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }, { _id: false, __v: false });
      if (!user) throw new Error("This email doesn't exist");
      if (!(await bcrypt.compare(password, user.password)))
        throw new Error('Wrong password');
      const { password: p, ...payload } = user.toObject();
      const token = jwt.sign(payload, config.jwt.secret, { expiresIn: '1d' });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
