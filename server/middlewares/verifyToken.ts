import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { json } from 'body-parser';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const seed = process.env.SEED || 'test';
    const token: string = req.get('x-token') || '';
    if(!!!token)
        res.status(403).json({ok: false, error: { message: 'Token not provided' }});
    else
        try{
            const data = jsonwebtoken.verify(token, seed);
            req.body.currentUser = data;
            next();
        }catch(error){
            res.status(403).json({ok: false, error: {message: 'Corrupt token'}})
        }
}

