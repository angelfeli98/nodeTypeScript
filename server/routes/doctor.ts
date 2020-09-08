
import { Router } from 'express';
import * as Doctor from '../controllers/doctor';
import { verifyToken } from '../middlewares/verifyToken';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/fields-validators';

const api = Router();

api.get('/test', Doctor.test);

api.get('/getDoctors', verifyToken, Doctor.getDoctors);

api.get('/getById/:id', verifyToken, Doctor.getDoctorById);

api.post('/save', [
    verifyToken,
    check('hospital', 'hospital must be provided').notEmpty().isMongoId(),
    check('name', 'name must be provided').notEmpty(),
    validateFields
], Doctor.saveDoctor);

api.put('/update/:id', verifyToken, Doctor.updateDoctor);

api.delete('/delete/:id', verifyToken, Doctor.deleteDoctor);

export = api;