
import { Router } from 'express';
import * as File from '../controllers/file';
import { verifyToken } from '../middlewares/verifyToken';

const api = Router();

api.get('/test', File.test)

api.get('/load/:type/:name', File.getImage);

api.post('/upload/:type/:id', verifyToken, File.uploadFile);

export = api;