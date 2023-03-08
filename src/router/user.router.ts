import Router from 'express'
import user from '../controller/user';
import auth from '../middleware/auth';

const router = Router();


router.post('/', user.add)
router.get('/', user.getAll)
router.post('/login', user.login)
router.put('/', auth, user.update)
router.delete('/', auth, user.remove)

export default router;
