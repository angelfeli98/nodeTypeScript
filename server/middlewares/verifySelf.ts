import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export const verifySelf = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userM = await User.findById(req.body.currentUser.id);
    const id = req.params.id;
    if(userM?.get('role') !== 'ADMIN_ROLE' && id != req.body.currentUser.id)
        return res.status(403).json({ok: true, error: {message: 'Not auth'}});
    return next();
}