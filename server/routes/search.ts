
import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import * as Search from '../controllers/search';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/fields-validators';

const api = Router();

api.get('/test/:field', verifyToken, Search.test);

api.get('/inAll/:field', [
    verifyToken,
    check('field', 'field must be provided').notEmpty(),
    validateFields
], Search.searchInAll);

api.get('/inCollection/:collection/:field', [
    verifyToken,
    check('collection', 'collection must be provided').notEmpty(),
    check('field', 'field must be probided').notEmpty(),
    validateFields
], Search.searchByCollection)

export = api;