
import User = require('../controllers/user');
import { Router } from 'express';

const router = Router();

router.get('/test', User.test);
router.post('/saveUser', User.saveUser);

export{
    router
}