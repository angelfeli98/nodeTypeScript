import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export const verifyRole = async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    const user = req.body.currentUser;
    const userInfo = await User.findById(user.id);
    const role = userInfo?.get('role');
    if(role !== 'ADMIN_ROLE')
        return res.status(403).json({ok: false, error: {message: 'not auth'}});
    return next();
}