
import express from 'express';
import * as User from '../controllers/user';

const app = express.Router();

app.get('/test', User.test)

export default app;