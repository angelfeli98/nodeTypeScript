
import { Request, Response } from 'express';
import User from '../models/user';
import { signToken } from '../helpers/jwt';
import bycrypt from 'bcrypt';

const getUsers = async(req: Request, res: Response):Promise<void> => {
    const limit = +(req.query.limit || 5);
    const skip = +(req.query.page || 1);
    try {
        const usersP = User.find({}, '-password')
                                .limit(limit)
                                .skip(limit * (skip - 1));
        const resultsP = User.countDocuments();
        const [users, results] = await Promise.all([usersP, resultsP]);
        res.status(200).json({ok: true, users, results})
    }catch(error){
        res.status(401).json({ok:  false, error});
    }
}

const saveUser = async(req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body;
        const salt = await bycrypt.genSalt();
        body.password = await bycrypt.hash(body.password, salt);
        const prevUser = await User.findOne({email: req.body.email});
        if(prevUser){
            if(prevUser.get('google'))
                return res.status(400).json({ok: false, error: {message: 'login with your google account please'}});
            return res.status(400).json({ok: false, error: {message: 'user already exits'}});
        }

        const newUser = new User(body);
        const savedUser = await newUser.save();
        const token = signToken(savedUser._id);
        return res.status(200).json({ ok: true, message: 'User saved', token})
    }catch(error){
        res.status(400).json({ ok: false, error })
    }
}

const updateUser = async(req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;
        const { password, email, google, ...fields } = req.body;
        if(!!!google)
            fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(id, fields, { runValidators: true, new: true, context: 'query'});
        if(updatedUser)
            return res.status(200).json({ok: true, message: 'User updated', updatedUser});

        return res.status(404).json({ok: true, error: { message: 'not user' }});
    }catch(error){
        return res.status(500).json({ok: false, error})
    }
}

const deleteUser = async(req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndRemove(id);
        if(deletedUser)
            return res.status(200).json({ok: true, deletedUser, message: 'User deleted'});

        return res.status(404).json({ok: false, error: { message: 'Not user' }});
    }catch(error){
        return res.status(500).json({ok: true, error});
    }
}

const getUserById = async(req: Request, res: Response): Promise<any> => {
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(user)
            return res.status(200).json({ok: true, user});

        return res.status(404).json({ok: false, error: { message: 'not user' }});
    }catch(error){
        return res.status(500).json({ok: false, error})
    }
}

export{
    getUsers,
    saveUser,
    updateUser,
    deleteUser,
    getUserById
}