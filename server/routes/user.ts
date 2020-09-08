
import express from 'express';
import * as User from '../controllers/user';
import { validateFields } from '../middlewares/fields-validators';
import { check } from 'express-validator'
import { verifyToken } from '../middlewares/verifyToken';
import { verifyRole } from '../middlewares/verifyRole';
import { verifySelf } from '../middlewares/verifySelf';

const app = express.Router();

app.get('/getUsers',[verifyToken, verifyRole], User.getUsers);

app.get('/getUser/:id', [verifyToken, verifyRole] ,User.getUserById);

app.post('/saveUser',[
    check('name', 'name must be porvided').notEmpty(),
    check('email', 'email must be porvided').not().notEmpty().isEmail(),
    check('password', 'password must be porvided').notEmpty(),
    validateFields
], User.saveUser);

app.put('/updateUser/:id', [verifyToken, verifySelf], User.updateUser);

app.delete('/deleteUser/:id', [verifyToken, verifyRole], User.deleteUser);

export default app;