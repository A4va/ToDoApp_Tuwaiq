import Router from 'express'
import task from '../controller/task';
import auth from '../middleware/auth';


const router = Router();

router.post('/', task.add)
router.get('/', auth, task.getAll)
router.get('/:id', task.byId)
router.put('/:id', auth, task.update)
router.delete('/:id', auth, task.remove)

export default router;
