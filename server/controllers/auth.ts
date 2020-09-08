import { Request, Response, query } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt'
import { signToken } from '../helpers/jwt';
import bycrypt from 'bcrypt';
import { getMenu } from '../helpers/menu-options';

const loginUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email });
        if(user){
            if(await bcrypt.compare(password, user.get('password'))){
                const jwt = signToken(user._id);
                const menu = getMenu(user?.get('role'));
                res.status(200).json({ok: true, token: jwt, menu});
            }
            else
                res.status(400).json({ok: false, error: {message: 'email or password incorrect'}});
        }else
        res.status(400).json({ok: false, error: {message: 'email or password incorrect'}});
    }catch(error) {
        res.status(500).json({ok: false, error})
    }
}

const reEnvToken = async(req: Request, res: Response):  Promise<any> => {
    const currentUser = req.body.currentUser;
    const newToken = signToken(currentUser.id);
    const user = await User.findById(currentUser.id);
    const menu = getMenu(user?.get('role'));
    return res.status(200).json({ok: true, token: newToken, user, menu});
}

const loginByGoogle = async(req: Request, res: Response): Promise<any> => {
    const { id, ...object } = req.body;
    try{
        let user = await User.findOne({email: object.email});
        if(!!!user){
            const salts = await bycrypt.genSalt();
            object.password = await bycrypt.hash(id, salts);
            object.google = true;
            const newUser = new User(object);
            user = await newUser.save();
        }
        if(!!!user.get('google'))
            return res.status(400).json({ok: false, error: {message: 'login with your email and password'}});
        const jwt = signToken(user._id);
        const menu = getMenu(user?.get('role'));
        return res.status(200).json({ok: true, token: jwt, menu});
    }catch(error){
        return res.status(500).json({ok: false, error});
    }
}



export{
    loginUser,
    loginByGoogle,
    reEnvToken
}