
import { Router } from 'express';
import * as Hospital from '../controllers/hospital'
import { verifyToken } from '../middlewares/verifyToken';
import { validateFields } from '../middlewares/fields-validators';
import { check } from 'express-validator';

const api = Router();

api.get('/test', Hospital.test);

api.get('/getHospitals', verifyToken, Hospital.getHospitals);

api.post('/saveHospital', [
    verifyToken,
    check('name', 'name must be provided').notEmpty(),
    validateFields
], Hospital.saveHspital);

export = api;