
import { Router } from 'express';
import * as Auth from '../controllers/auth';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/fields-validators';
import { verifyGoogleToken } from '../middlewares/verifyGoogleToken';

const app = Router();

app.post('/login',[
    check('password', 'password must be provided').not().isEmpty(),
    check('email', 'email must be provided').not().isEmpty(),
    validateFields
] ,Auth.loginUser);

app.post('/loginGoogle', verifyGoogleToken, Auth.loginByGoogle);

export = app;