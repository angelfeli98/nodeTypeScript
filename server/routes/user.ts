
import express from 'express';
import * as User from '../controllers/user';
import { validateFields } from '../middlewares/fields-validators';
import { check } from 'express-validator'
import { verifyToken } from '../middlewares/verifyToken';

const app = express.Router();

app.get('/getUsers', User.getUsers);

app.get('/getUser/:id', verifyToken ,User.getUserById);

app.post('/saveUser',[
    verifyToken,
    check('name', 'name must be porvided').notEmpty(),
    check('email', 'email must be porvided').not().notEmpty().isEmail(),
    check('password', 'password must be porvided').notEmpty(),
    validateFields
], User.saveUser);

app.put('/updateUser/:id', verifyToken, User.updateUser);

app.delete('/deleteUser/:id', verifyToken, User.deleteUser);

export default app;