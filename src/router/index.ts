import userRouter from '../router/user.router'
import taskRouter from '../router/task.router'
import Router from 'express'

const router = Router();
router.use('/user', userRouter)
router.use('/task', taskRouter)

export default router;