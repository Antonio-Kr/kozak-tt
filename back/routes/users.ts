import express, { Request, Response, Router } from 'express'

import User from '../schemas/user'

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ emplyees: 'all' })
})

router.post('/', async (req: Request, res: Response) => {
  const user = new User(req.body)
  await user.save()
  res.json(user)
})

router.put('/', (req: Request, res: Response) => {
  res.json({ updated: true })
})

router.delete('/', (req: Request, res: Response) => {
  res.json({ deleted: true })
})

export default router
