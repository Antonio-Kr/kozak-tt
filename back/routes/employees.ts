import express, { Request, Response, Router } from 'express'

const router: Router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.json({ emplyees: 'all' })
})

router.post('/', (req: Request, res: Response) => {
  res.json({ added: true })
})

router.put('/', (req: Request, res: Response) => {
  res.json({ updated: true })
})

router.delete('/', (req: Request, res: Response) => {
  res.json({ deleted: true })
})

export default router
