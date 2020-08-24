import { Request, Response, NextFunction } from 'express';
import { HookNextFunction } from 'mongoose';
import { validationResult } from 'express-validator';


export const validateFields = (req: Request, res: Response, next: HookNextFunction): void =>{
    const result = validationResult(req)
    if(!!!result.isEmpty())
        res.status(400).json({ok: false, errors: result.mapped()});
    else
        next();
}