
import { Router } from 'express';
import * as Hospital from '../controllers/hospital'
import { verifyToken } from '../middlewares/verifyToken';
import { validateFields } from '../middlewares/fields-validators';
import { check } from 'express-validator';

const api = Router();

api.get('/test', Hospital.test);

api.get('/getHospitals', verifyToken, Hospital.getHospitals);

api.get('/getById/:id', verifyToken, Hospital.getHospitalById);

api.post('/saveHospital', [
    verifyToken,
    check('name', 'name must be provided').notEmpty(),
    validateFields
], Hospital.saveHspital);

api.put('/update/:id', verifyToken, Hospital.updateHospital);

api.delete('/delete/:id', verifyToken, Hospital.deleteHospital);

export = api;